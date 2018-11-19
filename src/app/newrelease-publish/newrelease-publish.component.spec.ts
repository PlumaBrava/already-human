import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreleasePublishComponent } from './newrelease-publish.component';

describe('NewreleasePublishComponent', () => {
  let component: NewreleasePublishComponent;
  let fixture: ComponentFixture<NewreleasePublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreleasePublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreleasePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
