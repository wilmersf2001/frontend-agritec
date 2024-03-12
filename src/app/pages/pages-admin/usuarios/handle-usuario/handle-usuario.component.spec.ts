import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleUsuarioComponent } from './handle-usuario.component';

describe('HandleUsuarioComponent', () => {
  let component: HandleUsuarioComponent;
  let fixture: ComponentFixture<HandleUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
