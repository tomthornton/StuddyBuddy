import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-classdialog',
  templateUrl: './classdialog.component.html',
  styleUrls: ['./classdialog.component.scss']
})
export class ClassDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
