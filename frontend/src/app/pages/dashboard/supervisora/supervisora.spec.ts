import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Supervisora } from './supervisora';

describe('Supervisora', () => {
  let component: Supervisora;
  let fixture: ComponentFixture<Supervisora>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Supervisora]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Supervisora);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
