# vscode-implicit-indent README

When the cursor moves to an empty line, automatically indent to the correct level.

That is, moving the cursor onto an empty line with the up/down/left/right arrows will act just like it did when the line was created, jumping to the level of indentation implied by the indentation settings for the language you're working in.

## Configuration

This plugin adds the following movement commands and binds them to the arrow keys by default, overriding the corresponding builtin movement commands:

- `implicit-indent.cursorUp`
- `implicit-indent.cursorDown`
- `implicit-indent.cursorLeft`
- `implicit-indent.cursorRight`

If you wish to use different keys for these (such as vim-style keys), you can rebind those commands to different keys in your personal keyboard settings.
