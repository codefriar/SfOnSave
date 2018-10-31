"use strict";
import * as vscode from "vscode";

export class Config {
  public sfdxCommand: string;

  public constructor() {
    let config           = vscode.workspace.getConfiguration("SfOnSave");
        this.sfdxCommand = config.get("sfdxCommand") as string;
  }
}
