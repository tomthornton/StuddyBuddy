import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassComponent } from './class/class.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './core/auth.guard';
import { DashboardResolverService } from './dashboard/dashboard-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    resolve: {
      dashboard: DashboardResolverService
    }
  },
  { path: 'classes/:id', component: ClassComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes/* , {enableTracing: true} */)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
