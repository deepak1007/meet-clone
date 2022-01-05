import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  email: string;
  name: string;
}

@Component({
  selector: 'app-creator-details',
  templateUrl: './creator-details.component.html',
  styleUrls: ['./creator-details.component.css']
})
export class CreatorDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<CreatorDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  submitDetails(data : DialogData) {
    this.dialogRef.close({...data})
  }
}
