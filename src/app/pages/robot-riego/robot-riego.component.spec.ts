import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotRiegoComponent } from './robot-riego.component';

describe('RobotRiegoComponent', () => {
  let component: RobotRiegoComponent;
  let fixture: ComponentFixture<RobotRiegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotRiegoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotRiegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
