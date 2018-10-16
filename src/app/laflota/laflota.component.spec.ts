import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaflotaComponent } from './laflota.component';

describe('LaflotaComponent', () => {
  let component: LaflotaComponent;
  let fixture: ComponentFixture<LaflotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaflotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaflotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
