import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClassService } from '../../class/class.service';
import { tap, mergeMap, map } from 'rxjs/operators';
import { of, from } from 'rxjs';

@Component({
  selector: 'app-dashdialog',
  templateUrl: './dashdialog.component.html',
  styleUrls: ['./dashdialog.component.scss']
})
export class DashDialogComponent implements OnInit {
  public addCourse = false;
  public newCourse = true;
  public addCourseButtonHide = false;
  public editCourseButtonHide = true;

  constructor(
    public dialogRef: MatDialogRef<DashDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private classService: ClassService
    ) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  newCourseView() {
    this.editCourseButtonHide = false;
  }

  addCourseView() {
    this.editCourseButtonHide = false;
    this.addCourse = true;
    this.data.title = 'Add Courses';
    this.data.optionList.subscribe(
      data => {
        const userClasses = data;
        this.classService.allClasses().subscribe( allClasses => {
          const courseArray = [];
          allClasses.forEach( (course: any) => {
            let found = false;
            userClasses.forEach( myCourse => {
              if (course.id === myCourse.id) {
                found = true;
              }
            });
            if (!found) {
              courseArray.push(course);
            }
          });
          this.data.allClasses = of(courseArray);
        });
      }
    );
    setTimeout( () => {
      this.editCourseButtonHide = false;
      this.addCourseButtonHide = true;
    }, 400);
  }
  editCourseView() {
    this.addCourseButtonHide = false;
    this.addCourse = false;
    this.data.title = 'Edit Courses';
    setTimeout( () => {
      this.editCourseButtonHide = true;
      this.addCourseButtonHide = false;
    }, 400);
  }
  removeCourse(ID) {
    this.classService.removeCourse(ID);
  }
  addClass(id) {
    this.classService.addCourse(id);
  }

}
