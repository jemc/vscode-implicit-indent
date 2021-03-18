# vscode-indent-on-empty-line README

Fork from [jemc/vscode-implicit-indent](https://github.com/jemc/vscode-implicit-indent)

When the cursor moves to an empty line, automatically indent to the correct level.

That is, moving the cursor onto an empty line with the up/down/left/right arrows will cause the cursor to also jump to an appropriate level of indentation. This is influenced by the indentation settings for the language you're working in, but falls back to using the indentation level of the next non-empty line.

## Configuration

This plugin adds the following movement commands and binds them to the arrow keys by default, overriding the corresponding builtin movement commands:

- `onStartupFinished`
- `implicit-indent.cursorUp`
- `implicit-indent.cursorDown`
- `implicit-indent.cursorLeft`
- `implicit-indent.cursorRight`

If you wish to use different keys for these (such as vim-style keys), you can rebind those commands to different keys in your personal keyboard settings.
