import { ITranslateRegistry } from 'comment-translate-manager';
import * as vscode from 'vscode';
import { FindMyIPTranslate } from './FindMyIPTranslate';

export function activate(context: vscode.ExtensionContext) {
	return {
        extendTranslate: function (registry: ITranslateRegistry) {
            registry('findmyip', FindMyIPTranslate);
        }
    };
}

// this method is called when your extension is deactivated
export function deactivate() {}