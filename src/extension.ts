// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {window, commands, FileSystemWatcher} from 'vscode';
import createFile from './createFile';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "miniHelper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showWarningMessage('Hello VS Code1!');
	});


	let showTime = vscode.commands.registerCommand('extension.showTime', () => {
		let d: Date = new Date();
		let time: string = d.getTime().toString();
		vscode.window.showInformationMessage(new Date().getTime().toString());
	});

	vscode.commands.registerCommand('extension.createMiniPage', (fileUrl: vscode.Uri) => {
		// vscode.window.showInformationMessage(fileUrl.path);
		createFile(fileUrl.path, 'page');
	});
	vscode.commands.registerCommand('extension.createMiniComp', (fileUrl: vscode.Uri) => {
		// vscode.window.showInformationMessage(fileUrl.path);
		createFile(fileUrl.path, 'comp');
	});

	context.subscriptions.push(showTime);
}

// this method is called when your extension is deactivated
export function deactivate() { }
