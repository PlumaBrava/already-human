import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumCrearComponent } from './album-crear.component';

describe('AlbumCrearComponent', () => {
  let component: AlbumCrearComponent;
  let fixture: ComponentFixture<AlbumCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
