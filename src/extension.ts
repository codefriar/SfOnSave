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
      `${config.sfdxCommand} "${textDocument.fileName}"`,
      (err, stdout, stderr) => {
        console.log("stdout: " + stdout);
        outputChannel.append(stdout);
        console.log("stderr: " + stderr);
        outputChannel.append(stderr);
        if (err) {
          console.log("error: " + err);
          outputChannel.append(stderr);
        }
      }
    );
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
