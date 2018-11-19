import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewreleaseInfoComponent } from './newrelease-info.component';

describe('NewreleaseInfoComponent', () => {
  let component: NewreleaseInfoComponent;
  let fixture: ComponentFixture<NewreleaseInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewreleaseInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewreleaseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
