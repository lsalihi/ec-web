import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishChargingPointComponent } from './publish-charging-point.component';

describe('PublishChargingPointComponent', () => {
  let component: PublishChargingPointComponent;
  let fixture: ComponentFixture<PublishChargingPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishChargingPointComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishChargingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
