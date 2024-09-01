import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargingStationCreateComponent } from './charging-station-create.component';

describe('ChargingStationCreateComponent', () => {
  let component: ChargingStationCreateComponent;
  let fixture: ComponentFixture<ChargingStationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargingStationCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChargingStationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
