"use strict";
import * as vscode from "vscode";
import { Config } from "./lib/config";
import * as ChildProcess from "child_process";

let appName       = "SfOnSave";
let outputChannel = vscode.window.createOutputChannel(appName);

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  let config = new Config();

  if (!config.sfdxCommand) {
    config.sfdxCommand = "sfdx force:source:deploy --sourcepath ";
  }

  vscode.workspace.onDidSaveTextDocument(textDocument => {
    ChildProcess.exec(
      `cd "${vscode.workspace.rootPath}" && ${config.sfdxCommand} "${
        textDocument.fileName
      }"`,
      (err, stdout, stderr) => {
        if (err) {
          outputChannel.append(stderr);
        } else {
          outputChannel.append(stdout);
        }
        outputChannel.show(true);
      }
    );
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
