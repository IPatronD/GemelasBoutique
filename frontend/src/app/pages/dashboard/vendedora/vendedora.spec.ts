import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Vendedora } from './vendedora';

describe('Vendedora', () => {
  let component: Vendedora;
  let fixture: ComponentFixture<Vendedora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vendedora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Vendedora);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
