import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogEditorialComponent } from './log-editorial.component';

describe('LogEditorialComponent', () => {
  let component: LogEditorialComponent;
  let fixture: ComponentFixture<LogEditorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogEditorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogEditorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
