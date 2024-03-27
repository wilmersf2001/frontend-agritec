import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarOrdenComponent } from './guardar-orden.component';

describe('GuardarOrdenComponent', () => {
  let component: GuardarOrdenComponent;
  let fixture: ComponentFixture<GuardarOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarOrdenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
