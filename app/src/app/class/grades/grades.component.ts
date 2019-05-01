import { Component, OnInit, Input } from '@angular/core';
import { GradeService } from './grade.service';
import { MatDialog } from '@angular/material';
import { GradeDialogComponent } from './gradedialog/gradedialog.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})



export class GradesComponent implements OnInit {
  @Input()classData;
  @Input()classID;
  @Input()userID;
  public classGrades;

  constructor(private grades: GradeService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  getOptions(data, method) {
    let options = [];
    switch (data.type) {
      case('assignment'):
        options = [
          {
          'type': 'input',
          'name': 'name',
          'value': method !== 'create' ? data.data.name : ''
          },
          {
          'type': 'date',
          'name': 'date',
          'value': method !== 'create' ? data.data.timestamp : ''
          },
          {
          'type': 'input',
          'name': 'time',
          'value': method !== 'create' ? data.data.time : '',
          'AMPM' : method !== 'create' ? data.data.AMPM : 'AM'
          },
          {
          'type': 'input',
          'name': 'grade',
          'value': '',
          'suffix' : '%'
          }
        ];
        break;
      case('grade type'):
        options = [
          {
          'type': 'input',
          'name': 'name',
          'value': method !== 'create' ? data.data.name : '',
          },
          {
          'type': 'input',
          'name': 'Weight (%)',
          'value': method !== 'create' ? data.data.percentage : '',
          },
          {
          'type': 'select',
          'name': 'color',
          'value' : method !== 'create' ? data.data.color : '',
          'options' : ['gray', 'blue', 'red', 'green', 'orange', 'yellow', 'purple', 'teal']
          }
        ];
        break;
      }
    return options;
  }

  dataActions(data, refString) {
    const optionConfig = data.data ? {type: data.type, data: data.data} : {type: data.type};
    const buttons = data.action === 'create' ? [{
      text: 'Save New ' + data.type,
      method: 'create'
    }] : [
      {
        text: 'Save ' + data.type,
        method: 'update'
      },
      {
        text: 'Delete ' + data.type
      },
    ];
    let ref = '';
    console.log(data);
    if (data.action === 'create' && data.type === 'assignment') {
      ref = refString + '/assignments';
    } else if (data.action === 'update' && data.type === 'assignment') {
      ref = refString + '/assignments/' + data.data.dbID;
    } else if (data.action === 'create' && data.type === 'grade type') {
      ref = '/classes/' + this.classData.dbID + '/grades';
    } else if (data.action === 'update' && data.type === 'grade type') {
      ref = refString;
    }
    console.log(ref);

    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: '600px',
      data: {
        title: data.action === 'create' ? 'New ' + data.type : 'Edit ' + data.type,
        refString: ref,
        type: data.type,
        options: this.getOptions(optionConfig, data.action),
        buttons: buttons
    }});
  }
}
