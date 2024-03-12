import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotMonitoreoDiagnosticoComponent } from './robot-monitoreo-diagnostico.component';

describe('RobotMonitoreoDiagnosticoComponent', () => {
  let component: RobotMonitoreoDiagnosticoComponent;
  let fixture: ComponentFixture<RobotMonitoreoDiagnosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotMonitoreoDiagnosticoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotMonitoreoDiagnosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
