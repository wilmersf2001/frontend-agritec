import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDesmalezadoComponent } from './robot-desmalezado.component';

describe('RobotDesmalezadoComponent', () => {
  let component: RobotDesmalezadoComponent;
  let fixture: ComponentFixture<RobotDesmalezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotDesmalezadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotDesmalezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
