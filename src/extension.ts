import * as vscode from 'vscode'
import {Mutex, MutexInterface} from 'async-mutex'

export function deactivate() {}
export function activate(context: vscode.ExtensionContext) {
	// Because we use await in our async functions, we need a mutex/lock to
	// prevent concurrent executions of any of our movement commands.
	// If we did not do so, then any fast key repeats cause bugs due to some
	// executions of our function invalidating the working assumptions of others
	// that are executing concurrently. Using a lock lets us not worry about that.
	const lock = new Mutex()

	// Define some movement commands, registered with the implicit-indent prefix.
	const moveCommands = ['cursorUp', 'cursorDown', 'cursorLeft', 'cursorRight']
	moveCommands.forEach((moveCommand) => {
		const name = `implicit-indent.${moveCommand}`
		const disposable = vscode.commands.registerCommand(name, async () => {
			// First, wait to acquire the lock before doing anything.
			const releaseLock = await lock.acquire()
			try {
				// Execute the underlying movement command associated with this command.
				await vscode.commands.executeCommand(moveCommand)

				// Get the cursor's current line and check if it is empty.
				const editor = vscode.window.activeTextEditor!
				const cursorPos = editor.selection.start
				const cursorLine = cursorPos.line
				let cursorLineText = editor.document.lineAt(cursorLine).text
				if (cursorLineText === '') {
					// Find the next line that is not empty or whitespace-only.
					let nextLine = cursorLine
					var nextLineText
					try {
						nextLineText = editor.document.lineAt(nextLine).text
						while (/\S/.test(nextLineText) === false) {
							nextLine = nextLine + 1
							nextLineText = editor.document.lineAt(nextLine).text
						}
					} catch(e) {
						nextLineText = ""
					}

					// Figure out the indentation level of that next line,
					// and copy it here to the cursor line.
					const nextLineIndent = nextLineText.match(/^\s*/)![0]!
					editor.edit((edit) => {
						edit.insert(cursorPos, nextLineIndent)
					})
				}
			} finally {
				// Always release the lock at the end of this block.
				releaseLock()
			}
		})
		context.subscriptions.push(disposable)
	})
}
