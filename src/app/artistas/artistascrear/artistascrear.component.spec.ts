import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistascrearComponent } from './artistascrear.component';

describe('ArtistascrearComponent', () => {
  let component: ArtistascrearComponent;
  let fixture: ComponentFixture<ArtistascrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistascrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistascrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
