import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditCritereComponent } from './modaledit-critere.component';

describe('ModaleditCritereComponent', () => {
  let component: ModaleditCritereComponent;
  let fixture: ComponentFixture<ModaleditCritereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditCritereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditCritereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
