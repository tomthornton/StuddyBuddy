import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradedialogComponent } from './gradedialog.component';

describe('GradedialogComponent', () => {
  let component: GradedialogComponent;
  let fixture: ComponentFixture<GradedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
