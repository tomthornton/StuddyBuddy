import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from, merge } from 'rxjs';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { defineBase } from '@angular/core/src/render3';
import { mergeMap, map, filter, scan, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classes = [];
  userID;
  userData;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth ) { }

  getClassList() {
    return this.getUserID().pipe(
      switchMap( userID => {
        return this.db.collection('users/' + userID + '/classes').valueChanges();
      })
    );
  }

  allClasses() {
    return this.db.collection('classes').valueChanges();
  }

  getClass(id) {
    let courseData: any = {};
    return this.db.collection('classes', ref => ref.where('id', '==', id)).snapshotChanges().pipe(
      map( courseRef => courseRef[0].payload.doc),
      mergeMap( (course: any) => {
        courseData = course.data();
        courseData.dbID = course.id;
        return this.db.collection('classes/' + course.id + '/grades').snapshotChanges();
      }),
      mergeMap( (grades: any) => {
        courseData.grades = [];
        return from(grades);
      }),
      map( (grade: any) => {
        const gradeType = grade.payload.doc.data();
        gradeType.dbID = grade.payload.doc.id;
        gradeType.refString = 'classes/' + courseData.dbID + '/grades/' + gradeType.dbID;
        // tslint:disable-next-line:max-line-length
        gradeType.assignments = { obs: this.db.collection('classes/' + courseData.dbID + '/grades/' + gradeType.dbID + '/assignments')
        .snapshotChanges().pipe(map(val => from(val)))};
        courseData.grades.push(gradeType);
        return courseData;
      }));
  }

  getGrades(id) {
    return this.db.collection('classes').doc(id).collection('assignments').snapshotChanges();
  }

  getUserID() {
    return this.afAuth.user.pipe(
      map(user => user.uid)
    );
  }

  addCourse(course) {
    this.getUserID()
    .subscribe( userID => {
      this.db.collection('users/' + userID + '/classes').add(course);
    });
  }

  removeCourse(courseID) {
    this.getUserID()
    .subscribe( userID => {
      this.db.collection('users/' + userID + '/classes', ref => ref.where( 'id', '==', courseID)).get().subscribe( ref =>{
        ref.docs[0].ref.delete();
      });
    });
  }

  getAssignments(ref) {
    return this.db.doc(ref).collection('student_grades').valueChanges();
  }

  newClass(classData){
    this.db.collection('classes').add(classData);
  }
}
