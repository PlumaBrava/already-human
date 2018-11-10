import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackCrearComponent } from './track-crear.component';

describe('TrackCrearComponent', () => {
  let component: TrackCrearComponent;
  let fixture: ComponentFixture<TrackCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
