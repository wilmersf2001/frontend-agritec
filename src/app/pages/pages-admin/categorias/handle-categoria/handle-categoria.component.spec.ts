import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleCategoriaComponent } from './handle-categoria.component';

describe('HandleCategoriaComponent', () => {
  let component: HandleCategoriaComponent;
  let fixture: ComponentFixture<HandleCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleCategoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
