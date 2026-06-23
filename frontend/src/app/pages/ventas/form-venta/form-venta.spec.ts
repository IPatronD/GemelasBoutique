import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVenta } from './form-venta';

describe('FormVenta', () => {
  let component: FormVenta;
  let fixture: ComponentFixture<FormVenta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormVenta]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormVenta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
