import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public myClasses;
  public user;
  public userName;

  constructor(
    private classService: ClassService,
    private afAuth: AngularFireAuth,
    private auth: AuthService
    ) { }

  ngOnInit() {
    this.myClasses = this.classService.classes;
    this.auth.user.subscribe( data => {
      this.user = data;
      this.userName = this.user.displayName.split(' ');
    });
  }

}
