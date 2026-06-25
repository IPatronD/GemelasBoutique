import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMetodosPago } from './listar-metodos-pago';

describe('ListarMetodosPago', () => {
  let component: ListarMetodosPago;
  let fixture: ComponentFixture<ListarMetodosPago>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarMetodosPago]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMetodosPago);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
