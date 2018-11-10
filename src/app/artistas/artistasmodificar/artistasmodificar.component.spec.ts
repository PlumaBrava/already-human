import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasmodificarComponent } from './artistasmodificar.component';

describe('ArtistasmodificarComponent', () => {
  let component: ArtistasmodificarComponent;
  let fixture: ComponentFixture<ArtistasmodificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistasmodificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistasmodificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
