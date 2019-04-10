import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from './class.service';
import { DateAdapter, MatDialog } from '@angular/material';
import { ClassDialogComponent } from './classdialog/classdialog.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  public classData;
  public classID;
  public userID;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe( data => {
        this.classID = data.id;
        this.classService.getClass(data.id)
        .subscribe( classData => {
          classData.grades.forEach(gradeType => {
            gradeType.assignments.obs.subscribe( assignment => {
              gradeType.assignments['data'] = [];
              assignment.subscribe( val => {
                const assignmentData = val.payload.doc.data();
                assignmentData['dbID'] = val.payload.doc.id;
                assignmentData['timestamp'] = assignmentData.date.toDate();
                const dateArray = assignmentData.timestamp.toString().split(' ');
                assignmentData.date = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];
                gradeType.assignments.data.push(assignmentData);
              });
            });
          });
          this.classData = classData;
        });
      });
  }
  editClass() {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      width: '600px',
      data: {
        classData: this.classData
      }
    });
    console.log(this.classData);
  }

  changeView(button) {
  }

}
