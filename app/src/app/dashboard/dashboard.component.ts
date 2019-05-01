import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';

import { ActivatedRoute } from '@angular/router';
import { DateAdapter, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { DashDialogComponent } from './dashdialog/dashdialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public myClasses: Observable<any>;
  public user;
  public userName;

  constructor(
    private afAuth: AngularFireAuth,
    private auth: AuthService,
    private route: ActivatedRoute,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.myClasses = data.dashboard.classes;

    });
    this.auth.user.subscribe( data => {
      this.user = data;
      this.userName = this.user.displayName.split(' ');
    });
  }

  editCourses() {
    const dialogRef = this.dialog.open(DashDialogComponent, {
      width: '700px',
      data: {
        title: 'Edit Courses',
        optionList: this.myClasses,
        optionActions: [
          {
            icon: 'delete'
          }
        ],
        buttons: [
          {
            name: 'Add Course',
            function: 'addCourseView()'
          },
          {
            name: 'New Course',
          }
        ],
        closeButton: true
      }
    });
  }

}
