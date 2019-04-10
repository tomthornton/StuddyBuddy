import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GradeService } from '../grade.service';

@Component({
  selector: 'app-gradedialog',
  templateUrl: './gradedialog.component.html',
  styleUrls: ['./gradedialog.component.scss']
})
export class GradeDialogComponent implements OnInit {
  public currentColor;
  public alertMessage;
  constructor(
    private gradeService: GradeService,
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
  }

  timeSelect(event) {
    event.stopPropagation();
  }
  updateDate() {
    let date = new Date();
    let time = '';
    let AMPM = '';
    this.data.options.forEach( option => {
      switch (option.name) {
        case 'timestamp':
          date = new Date(option.value);
          break;
        case 'time':
          time = option.value.split(':');
          AMPM = option.AMPM;
          break;
      }
    });
    // tslint:disable-next-line:radix
    date.setHours(AMPM === 'PM' ? parseInt(time[0]) * 2 : parseInt(time[0]));
    // tslint:disable-next-line:radix
    date.setMinutes(parseInt(time[1]));
    this.data.options.forEach( option => {
      if (option.name === 'timestamp') {
        option.value = date;
      }
    });
  }

  updateData(name, value) {
    this.data.options.forEach(option => {
      if (option.name === name) {
        option.value = value;
      }
      if (name === 'AMPM' && option.name === 'time') {
        option.AMPM = value;
      }
    });
    switch (name) {
      case 'date':
        this.updateDate();
        break;
      case 'time':
        const timeRegEx = new RegExp(/^(0?[1-9]|1[0-2]):[0-5][0-9]$/);
        if (timeRegEx.test(value)) {
          this.updateDate();
        }
        break;
      case 'AMPM':
        this.updateDate();
        break;
    }
  }

  gradeActions(method) {
    if (method === 'create' || method === 'update') {
        const data = this.updateValues();
        if (method === 'create') {
          this.gradeService.addData(data, this.data.refString);
        } else {
          this.gradeService.updateData(data, this.data.refString);
        }
        this.dialogRef.close();
    } else {
        this.gradeService.deleteData(this.data.dbID, this.data.refString);
    }
  }

  updateValues() {
    const data = {};
    this.data.options.forEach( option => {
      switch (option.name) {
        case('time'):
          data['AMPM'] = option.AMPM;
          break;
        case('Weight (%)'):
          data['percentage'] = option.value;
          break;
        default:
          data[option.name] = option.value;
      }
    });
    return data;
  }
  closeDialog(){
    this.dialogRef.close();
  }

}
