import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackListAddComponent } from './track-list-add.component';

describe('TrackListAddComponent', () => {
  let component: TrackListAddComponent;
  let fixture: ComponentFixture<TrackListAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackListAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackListAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
