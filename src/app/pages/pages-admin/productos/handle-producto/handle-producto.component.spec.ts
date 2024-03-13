import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleProductoComponent } from './handle-producto.component';

describe('HandleProductoComponent', () => {
  let component: HandleProductoComponent;
  let fixture: ComponentFixture<HandleProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandleProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HandleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
