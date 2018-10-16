import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasaccionErrorComponent } from './trasaccion-error.component';

describe('TrasaccionErrorComponent', () => {
  let component: TrasaccionErrorComponent;
  let fixture: ComponentFixture<TrasaccionErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrasaccionErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasaccionErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
