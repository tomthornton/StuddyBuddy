import { Injectable } from '@angular/core';
import { ClassService } from '../class/class.service';
import { AuthService } from '../core/auth.service';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolverService {
  user;

  constructor(
    private auth: AuthService,
    private router: Router,
    private classes: ClassService
  ) {
    this.auth.user.subscribe( userData => {
      this.user = userData;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of({
      'classes': this.classes.getClassList()
    });
  }
}
