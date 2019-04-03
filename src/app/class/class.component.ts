import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from '../class.service';


@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {
  public classData;
  public classID;
  public userID;
  constructor(private classService: ClassService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe( data => {
        this.classID = data.id;
      });
    this.classService.getUser()
      .subscribe( data => this.userID = data.uid);
    this.classService.getClass(this.classID)
      .subscribe( data => {
      this.classData = data.payload.data();
      this.classData.ref = data.payload.ref;
      this.classService.getGrades(this.classID)
        .subscribe( assignments => {
          this.classData.grades = [];
          this.classData.grade_criteria.forEach( gradeType => delete gradeType.assignments);
          assignments.forEach( assignmentRef => {
            const assignment = assignmentRef.payload.doc.data();
            assignment.id = assignmentRef.payload.doc.id;
            this.classData.grade_criteria.forEach( gradeType => {
              if (gradeType.type === assignment.type) {
                if (gradeType.assignments) {
                  gradeType.assignments.push(assignment);
                } else {
                  gradeType.assignments = [assignment];
                }
              }
            });
          });
        });
    });
  }

  changeView(button) {
  }

}
