import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackObjectComponent } from './track-object.component';

describe('TrackObjectComponent', () => {
  let component: TrackObjectComponent;
  let fixture: ComponentFixture<TrackObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
