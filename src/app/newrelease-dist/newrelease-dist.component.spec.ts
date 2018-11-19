import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreleaseDistComponent } from './newrelease-dist.component';

describe('NewreleaseDistComponent', () => {
  let component: NewreleaseDistComponent;
  let fixture: ComponentFixture<NewreleaseDistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreleaseDistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreleaseDistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
