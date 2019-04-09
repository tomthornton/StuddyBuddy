import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  constructor(private db: AngularFirestore) { }

  addAssignment(type, ref) {

  }
  updateData(data, refString) {
    this.db.doc(refString).update(data);
  }

  addData(data, refString) {
    this.db.collection(refString).add(data);
  }
  deleteData(data, refString) {
    this.db.doc(refString).delete();
  }
}
