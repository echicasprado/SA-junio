import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarLibroComponent } from './solicitar-libro.component';

describe('SolicitarLibroComponent', () => {
  let component: SolicitarLibroComponent;
  let fixture: ComponentFixture<SolicitarLibroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarLibroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
