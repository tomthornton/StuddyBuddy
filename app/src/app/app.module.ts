import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';

import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter } from '@angular/material';

import { AuthGuard } from './core/auth.guard';


import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClassComponent } from './class/class.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { GradesComponent } from './class/grades/grades.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashDialogComponent } from './dashboard/dashdialog/dashdialog.component';
import { ClassDialogComponent } from './class/classdialog/classdialog.component';
import { GradeDialogComponent } from './class/grades/gradedialog/gradedialog.component';
import { MatNativeDateModule } from '@angular/material';
import { ChatComponent } from './class/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClassComponent,
    NavbarComponent,
    LoginComponent,
    GradesComponent,
    DashDialogComponent,
    ClassDialogComponent,
    GradeDialogComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSelectModule
  ],
  providers: [AngularFireAuth, AuthGuard, MatDatepickerModule],
  entryComponents: [DashDialogComponent, ClassDialogComponent, GradeDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
