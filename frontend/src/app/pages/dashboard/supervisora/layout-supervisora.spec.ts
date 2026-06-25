import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSupervisora } from './layout-supervisora';

describe('LayoutSupervisora', () => {
  let component: LayoutSupervisora;
  let fixture: ComponentFixture<LayoutSupervisora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSupervisora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSupervisora);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
