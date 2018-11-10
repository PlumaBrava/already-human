import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelCrearComponent } from './label-crear.component';

describe('LabelCrearComponent', () => {
  let component: LabelCrearComponent;
  let fixture: ComponentFixture<LabelCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
