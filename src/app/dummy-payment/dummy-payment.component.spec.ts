import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyPaymentComponent } from './dummy-payment.component';

describe('DummyPaymentComponent', () => {
  let component: DummyPaymentComponent;
  let fixture: ComponentFixture<DummyPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DummyPaymentComponent]
    });
    fixture = TestBed.createComponent(DummyPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
