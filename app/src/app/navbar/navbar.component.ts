import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userOptionsVisible = false;
  public route;
  public classMenu;

  constructor(private router: Router, private auth: AuthService, private db: AngularFirestore) { }

  ngOnInit() {
    this.router.events.subscribe(val=> {

      /* the router will fire multiple events */
      /* we only want to react if it's the final active route */
      if (val instanceof NavigationEnd) {
       /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
        const params = val.url.split('/');
        console.log(params.length);
        console.log(params);
        this.route = params.length === 3 ? params[2] : params[1];
        if (params.length === 3){
            this.auth.user.subscribe( data => {
              this.db.collection('users/' + data.uid + '/classes').valueChanges()
              .subscribe( classes => {
                this.classMenu = classes;
              })
            });
        }
      }
    });
  }

  signOut(){
    this.auth.signOut();
  }

  showuserOptions() {
    this.userOptionsVisible ? this.userOptionsVisible = false : this.userOptionsVisible = true;
  }
}
