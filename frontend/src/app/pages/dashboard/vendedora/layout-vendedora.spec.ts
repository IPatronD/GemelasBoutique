import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutVendedora } from './layout-vendedora';

describe('LayoutVendedora', () => {
  let component: LayoutVendedora;
  let fixture: ComponentFixture<LayoutVendedora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutVendedora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutVendedora);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
