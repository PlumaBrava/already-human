import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreleaseTracksComponent } from './newrelease-tracks.component';

describe('NewreleaseTracksComponent', () => {
  let component: NewreleaseTracksComponent;
  let fixture: ComponentFixture<NewreleaseTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreleaseTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreleaseTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
