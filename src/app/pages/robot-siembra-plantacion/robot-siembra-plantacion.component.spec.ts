import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotSiembraPlantacionComponent } from './robot-siembra-plantacion.component';

describe('RobotSiembraPlantacionComponent', () => {
  let component: RobotSiembraPlantacionComponent;
  let fixture: ComponentFixture<RobotSiembraPlantacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotSiembraPlantacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotSiembraPlantacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
