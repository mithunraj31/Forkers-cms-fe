import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'frk-add-camera-dialog',
  templateUrl: './add-camera-dialog.component.html',
  styleUrls: ['./add-camera-dialog.component.scss']
})
export class AddCameraDialogComponent implements OnInit {

  cameraForm: FormGroup;

  title:string;

  no:number;

  rot:number;

  ch:number;

  constructor(
    public dialogRef: NbDialogRef<AddCameraDialogComponent>,
  ) { }

  ngOnInit() {
    this.cameraForm = new FormGroup({
      "no": new FormControl(this.no?this.no:"", [
      ]),
      "rotation": new FormControl(this.rot?this.rot:"", [
      ]),
      "channel": new FormControl(this.ch?this.ch:"", [
      ]),
     

    });
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSave() {
    this.dialogRef.close(null);
    //send the data to parent component and call service to save
  }


}
