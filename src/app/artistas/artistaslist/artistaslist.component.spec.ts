import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistaslistComponent } from './artistaslist.component';

describe('ArtistaslistComponent', () => {
  let component: ArtistaslistComponent;
  let fixture: ComponentFixture<ArtistaslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistaslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
