import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public user;
  @Input()classID;
  public chats;
  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { }

  sendChat(val) {
    const message = {
      content: val,
      id: this.user.uid,
      name: this.user.displayName,
      time: new Date()
    };
    this.db.collection('classes/' + this.classID + '/chat').add(message);
  }

  ngOnInit() {
    this.auth.user.subscribe((val) => {
      this.user = val;
      console.log(val);
      this.db.collection('classes/' + this.classID + '/chat').valueChanges()
        .subscribe( messages => {
          this.chats = messages;
          console.log(messages.sort((a: any, b: any) => {
            return b.time._compareTo(a.time);
          }))
        });
      });
  }
}
