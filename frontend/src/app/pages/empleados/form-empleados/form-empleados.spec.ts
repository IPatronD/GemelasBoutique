import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpleados } from './form-empleados';

describe('FormEmpleados', () => {
  let component: FormEmpleados;
  let fixture: ComponentFixture<FormEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEmpleados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEmpleados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
