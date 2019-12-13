import * as vscode from 'vscode'

export function deactivate() {}
export function activate(context: vscode.ExtensionContext) {
	// Define some movement commands, registered with the implicit-indent prefix.
	const moveCommands = ['cursorUp', 'cursorDown', 'cursorLeft', 'cursorRight']
	moveCommands.forEach((moveCommand) => {
		const name = `implicit-indent.${moveCommand}`
		const disposable = vscode.commands.registerCommand(name, async () => {
			// Execute the underlying movement command associated with this command.
			await vscode.commands.executeCommand(moveCommand)

			// If the line we moved onto is empty, use the `tab` command to indent it.
			const editor = vscode.window.activeTextEditor!
			const cursorLine = editor.selection.start.line
			const cursorLineText = editor.document.lineAt(cursorLine).text
			if (cursorLineText == '') {
				await vscode.commands.executeCommand('tab')
			}
		})
		context.subscriptions.push(disposable)
	})
}
