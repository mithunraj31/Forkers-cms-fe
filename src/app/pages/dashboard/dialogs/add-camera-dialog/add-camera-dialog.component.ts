import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl } from '@angular/forms';

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
      "no": new FormControl(this.no, [
      ]),
      "rotation": new FormControl(this.rot?this.rot:"", [
      ]),
      "channel": new FormControl(this.ch?this.ch:"", [
      ]),
     

    });
    this.cameraForm.get("no").disable();
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSave() {
    this.dialogRef.close(this.cameraForm.value); 
  }


}
