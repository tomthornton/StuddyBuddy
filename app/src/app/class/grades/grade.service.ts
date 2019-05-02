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

  updateGrade(data, refString) {
    this.db.collection(refString).get().subscribe(studentGrades => {
      if (studentGrades.size === 0) {
        this.db.collection(refString).add(data);
      } else {
          let found = false;
          studentGrades.docs.forEach(grade => {
            if (grade.data().studentID === data.studentID) {
              grade.ref.update(data);
              found = true;
            }
          });
          if (!found) {
            this.db.collection(refString).add(data);
          }
      }
    });
  }
}
