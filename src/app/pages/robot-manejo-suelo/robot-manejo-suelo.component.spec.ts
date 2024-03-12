import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotManejoSueloComponent } from './robot-manejo-suelo.component';

describe('RobotManejoSueloComponent', () => {
  let component: RobotManejoSueloComponent;
  let fixture: ComponentFixture<RobotManejoSueloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotManejoSueloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotManejoSueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
