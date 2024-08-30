import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindChargingPointComponent } from './find-charging-point.component';

describe('FindChargingPointComponent', () => {
  let component: FindChargingPointComponent;
  let fixture: ComponentFixture<FindChargingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindChargingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindChargingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
