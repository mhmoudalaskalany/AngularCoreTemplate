import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-delete-dialog',
    templateUrl: 'delete-modal.component.html',
    styleUrls: [],
})
export class DeleteDialog implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DeleteDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    ngOnInit(): void {
        console.log(this.data);
    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick(): void {
        this.dialogRef.close({ data: this.data });
    }


}

export interface DialogData {
    id: string
}






