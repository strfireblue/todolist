// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { DecorationOptions } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "todolist" is now active!');

	
	// Add a Note (comment)
	// Add tag
	// Add priority

	// Mark as done
	let markAsDone = vscode.commands.registerCommand('todolist.markasdone', () => {

		const doneTaskDecorationType = vscode.window.createTextEditorDecorationType({
			opacity: "0.2",
		  });

		var editor = vscode.window.activeTextEditor;

		var position: vscode.Position = new vscode.Position(0, 0);

		if (!editor) {
			return;
		}

		if (editor.selection.isEmpty) {
			// the Position object gives you the line and character where the cursor is
			position = editor?.selection.active;
		}

		// Find the @ position in the line

		var rngCurrentLine = new vscode.Range(new vscode.Position(position.line, 0), new vscode.Position(position.line, 200));

		var currentLine = editor?.document.getText(rngCurrentLine);

		var atIndexnumber = currentLine?.indexOf('@');

		if (atIndexnumber == -1) {
			atIndexnumber = currentLine?.indexOf('-');
		}

		vscode.window.activeTextEditor?.edit(c => {
			var rngToDelete = new vscode.Range(new vscode.Position(position.line, atIndexnumber), new vscode.Position(position.line, atIndexnumber + 1));
			c.delete(rngToDelete);
			
			c.replace(new vscode.Position(position.line, atIndexnumber + 1), '[DONE]');
		});

		const doneTaskDecorations: DecorationOptions[] = [];

		const decoration = { range: rngCurrentLine, hoverMessage: "done task" };
		doneTaskDecorations.push(decoration);

		editor.setDecorations(doneTaskDecorationType, doneTaskDecorations);

	});


	context.subscriptions.push(markAsDone);
}

// this method is called when your extension is deactivated
export function deactivate() { }
