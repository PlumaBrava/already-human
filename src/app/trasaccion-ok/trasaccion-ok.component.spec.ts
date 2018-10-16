import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasaccionOkComponent } from './trasaccion-ok.component';

describe('TrasaccionOkComponent', () => {
  let component: TrasaccionOkComponent;
  let fixture: ComponentFixture<TrasaccionOkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasaccionOkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasaccionOkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
