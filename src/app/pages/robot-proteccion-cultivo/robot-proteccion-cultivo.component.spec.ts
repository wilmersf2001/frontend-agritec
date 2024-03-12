import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotProteccionCultivoComponent } from './robot-proteccion-cultivo.component';

describe('RobotProteccionCultivoComponent', () => {
  let component: RobotProteccionCultivoComponent;
  let fixture: ComponentFixture<RobotProteccionCultivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotProteccionCultivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotProteccionCultivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
