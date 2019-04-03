import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  class;
  userOptionsVisible = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.router.events.subscribe(val=> {

      /* the router will fire multiple events */
      /* we only want to react if it's the final active route */
      if (val instanceof NavigationEnd) {
       /* the variable curUrlTree holds all params, queryParams, segments and fragments from the current (active) route */
        const params = val.url.split('/');
        this.class = params;
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
