import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes: Observable<any[]>;


  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth ) {
    this.classes = db.collection('classes').valueChanges();
  }

  getClass(id) {
    return this.db.collection('classes').doc(id).snapshotChanges();
  }

  getGrades(id) {
    return this.db.collection('classes').doc(id).collection('assignments').snapshotChanges();
  }

  getUser() {
    return this.afAuth.user;
  }
}
