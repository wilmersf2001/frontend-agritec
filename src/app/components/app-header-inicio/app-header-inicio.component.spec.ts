import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderInicioComponent } from './app-header-inicio.component';

describe('AppHeaderInicioComponent', () => {
  let component: AppHeaderInicioComponent;
  let fixture: ComponentFixture<AppHeaderInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderInicioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppHeaderInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
