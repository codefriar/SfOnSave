"use strict";
import * as vscode from "vscode";

export class Config {
  public sfdxCommand    : string;
  public sfdxProjectRoot: string;

  public constructor() {
    let config               = vscode.workspace.getConfiguration("SfOnSave");
        this.sfdxCommand     = config.get("sfdxCommand") as string;
        this.sfdxProjectRoot = config.get("sfdxProjectRoot") as string;
  }
}
