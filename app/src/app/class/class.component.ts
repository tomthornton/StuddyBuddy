import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from './class.service';
import { DateAdapter, MatDialog } from '@angular/material';
import { ClassDialogComponent } from './classdialog/classdialog.component';
import { ChatComponent } from './chat/chat.component';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  public classData;
  public classID;
  public classView = true;
  public gradesView = true;
  public userID;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) {
    }

  ngOnInit() {
    this.route.params
      .subscribe( data => {
        this.classID = data.id;
        console.log(data);
        this.classService.getClass(data.id)
        .subscribe( classData => {
          classData.grades.forEach(gradeType => {
            gradeType.assignments.obs.subscribe( assignment => {
              gradeType.assignments['data'] = [];
              assignment.subscribe( val => {

                const assignmentData = val.payload.doc.data();
                assignmentData['dbID'] = val.payload.doc.id;
                assignmentData['timestamp'] = assignmentData.date.toDate();
                assignmentData['hours'] = this.formatHour(assignmentData.timestamp.getHours());
                assignmentData['minutes'] = this.formatMinutes(assignmentData.timestamp.getMinutes());
                const dateArray = assignmentData.timestamp.toString().split(' ');
                assignmentData.date = dateArray[0] + ' ' + dateArray[1] + ' ' + dateArray[2];

                this.classService.getAssignments(val.payload.doc.ref.path)
                  .subscribe((assignmentGrades => {
                    this.classService.getUserID().subscribe(id => {
                      let found = false;
                      assignmentGrades.forEach( studentGrade => {
                        if (studentGrade.studentID === id && !found) {
                          assignmentData['grade'] = studentGrade.grade;
                          found = true;
                        }
                      });
                    });
                  }));
                gradeType.assignments.data.push(assignmentData);
              });
            });
          });
          this.classData = classData;
          console.log(classData);
        });
      });
    this.classService.getUserID()
      .subscribe(val => this.userID = val);
  }
  editClass() {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      width: '600px',
      data: {
        classData: this.classData
      }
    });
  }

  changeView(button) {
    if(button === 'Chat'){
      this.classView = false;
    } else if (button === 'Grades'){
      this.classView = true;
    }
  }

  formatHour(num) {
    if (num === 0) {
      return 12;
    } else if (num <= 12) {
      return num;
    } else {
      return num - 12;
    }
  }
  formatMinutes(num) {
    return num <= 9 ? '0' + num : num;
  }
}
