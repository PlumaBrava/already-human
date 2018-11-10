import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishAlbumComponent } from './publish-album.component';

describe('PublishAlbumComponent', () => {
  let component: PublishAlbumComponent;
  let fixture: ComponentFixture<PublishAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
