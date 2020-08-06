import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'frk-add-camera-dialog',
  templateUrl: './add-camera-dialog.component.html',
  styleUrls: ['./add-camera-dialog.component.scss']
})
export class AddCameraDialogComponent implements OnInit {

  constructor(
    public dialogRef: NbDialogRef<AddCameraDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close(null);
  }
  onSave() {

    //send the data to parent component and call service to save
  }


}
