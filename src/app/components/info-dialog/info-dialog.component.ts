import { Component, OnInit, Inject } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA, MdSnackBar } from '@angular/material';

@Component({
	selector: 'app-info-dialog',
	templateUrl: './info-dialog.component.html',
	styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

	constructor(
		private dialogRef: MdDialogRef<InfoDialogComponent>,
		@Inject(MD_DIALOG_DATA) public options: InfoDialogOptions) {
		if (!options) {
			options = {
				dialogType: InfoDialogType.Alert,
				title: 'Title',
				message: 'Message'
			}
		}

		switch (options.dialogType) {
			case InfoDialogType.Confirm:
				{
					this.primaryButtonText = "OK";
					this.secondaryButtonText = "Cancel";
				}
				break;
			case InfoDialogType.Prompt:
				{
					this.inputText = options.defaultInputText;
					this.primaryButtonText = "Done";
					this.secondaryButtonText = "Cancel";
				}
				break;
			case InfoDialogType.Alert:
			default:
				{
					this.secondaryButtonText = "Close";
				}
				break;
		}
	}

	ngOnInit() {
	}

	inputKeypress(event: KeyboardEvent) {
		if (event.keyCode == 13) {
			this.primaryClick();
		}
	}

	primaryClick() {
		switch (this.options.dialogType) {
			case InfoDialogType.Confirm:
				this.dialogRef.close(true);
				break;
			case InfoDialogType.Prompt:
				this.dialogRef.close(this.inputText);
				break;
			case InfoDialogType.Alert:
			default:
				this.dialogRef.close();
				break;
		}
	}
	inputText: string;
	primaryButtonText: string;
	secondaryButtonText: string;

	InfoDialogType = InfoDialogType;
}

export interface InfoDialogOptions {
	dialogType: InfoDialogType,
	title: string,
	message: string,
	defaultInputText?: string,
}

export enum InfoDialogType {
	Prompt,
	Alert,
	Confirm
}