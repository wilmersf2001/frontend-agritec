import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotCosechaComponent } from './robot-cosecha.component';

describe('RobotCosechaComponent', () => {
  let component: RobotCosechaComponent;
  let fixture: ComponentFixture<RobotCosechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotCosechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotCosechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
