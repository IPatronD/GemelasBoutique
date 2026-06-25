import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpleados } from './listar-empleados';

describe('ListarEmpleados', () => {
  let component: ListarEmpleados;
  let fixture: ComponentFixture<ListarEmpleados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEmpleados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEmpleados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
