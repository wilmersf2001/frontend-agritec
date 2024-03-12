import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotVigilanciaSeguridadComponent } from './robot-vigilancia-seguridad.component';

describe('RobotVigilanciaSeguridadComponent', () => {
  let component: RobotVigilanciaSeguridadComponent;
  let fixture: ComponentFixture<RobotVigilanciaSeguridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotVigilanciaSeguridadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotVigilanciaSeguridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
