"use strict";
import * as vscode from "vscode";
import { Config } from "./lib/config";
import * as ChildProcess from "child_process";

let appName       = "SfOnSave";
let outputChannel = vscode.window.createOutputChannel(appName);

export function activate(context: vscode.ExtensionContext) {
  var sfdxOnSave = new SfOnSaveExtension(context);

  vscode.workspace.onDidSaveTextDocument(textDocument => {
    sfdxOnSave.run(textDocument);
  });
}

class SfOnSaveExtension {
  private _config = this.checkConfig();

  constructor(context: vscode.ExtensionContext) {
    this.checkConfig();
  }

  public checkConfig(): Config {
    let config = new Config();

    if (!config.sfdxCommand) {
      config.sfdxCommand = "sfdx force:source:deploy --sourcepath ";
    }

    if (!config.sfdxProjectRoot) {
      config.sfdxProjectRoot = "/force-app";
    }
    return config;
  }

  public run(textDocument: vscode.TextDocument): void {
    console.log(textDocument.fileName);
    if (textDocument.fileName.startsWith(this._config.sfdxProjectRoot)) {
      ChildProcess.exec(
        `cd "${vscode.workspace.rootPath}" && ${this._config.sfdxCommand} "${
          textDocument.fileName
        }"`,
        (err, stdout, stderr) => {
          if (err) {
            outputChannel.append(stderr);
          } else {
            outputChannel.append(stdout);
          }
        }
      );
    } else {
      outputChannel.append(
        `Changed file is outside of SFDX Project Root (${
          this._config.sfdxProjectRoot
        }), and was not deployed`
      );
    }
    outputChannel.show(true);
  }
}

// this method is called when your extension is deactivated
export function deactivate() {}
