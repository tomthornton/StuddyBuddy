import { Component, OnInit, Input } from '@angular/core';
import { GradeService } from './grade.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})



export class GradesComponent implements OnInit {
  @Input()classData;
  @Input()classID;
  @Input()userID;
  public classGrades;
  constructor(private grades: GradeService, public dialog: MatDialog) { }

  ngOnInit() {
    console.log(this.classData);
  }

  openDialog(assignment): void {
    console.log(assignment);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: assignment.name,
        type: assignment.type,
        fields: [
          {
            name: 'Grade',
            value: '100'
          }
        ]
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addAssignment(gradeType) {
    this.classData.ref.collection('assignments').add({
      'type': gradeType,
      'name' : 'New Assignment'
    });
  }

}
