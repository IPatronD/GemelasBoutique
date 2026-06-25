import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCategorias } from './listar-categorias';

describe('ListarCategorias', () => {
  let component: ListarCategorias;
  let fixture: ComponentFixture<ListarCategorias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCategorias]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCategorias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
