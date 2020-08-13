import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'frk-add-camera-dialog',
  templateUrl: './add-camera-dialog.component.html',
  styleUrls: ['./add-camera-dialog.component.scss']
})
export class AddCameraDialogComponent implements OnInit {

  //form in dialog to add and edit camera 
  cameraForm: FormGroup;

  title:string;

  no:number;

  rot:number;

  ch:number;

  id:number;

  deviceId:string;

  constructor(
    public dialogRef: NbDialogRef<AddCameraDialogComponent>,
  ) { }

  ngOnInit() {
    this.cameraForm = new FormGroup({
      "no": new FormControl(this.no, [
        Validators.required,
      ]),
      "rotation": new FormControl(this.rot?this.rot:"", [
        Validators.required,
        Validators.min(1),
      ]),
      "ch": new FormControl(this.ch?this.ch:"", [
        Validators.required,
        Validators.min(1),
      ]),
      "deviceId":new FormControl(this.deviceId, [
      ]),
      "id":new FormControl(this.id, [
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
