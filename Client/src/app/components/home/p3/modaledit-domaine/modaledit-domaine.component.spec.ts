import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditDomaineComponent } from './modaledit-domaine.component';

describe('ModaleditDomaineComponent', () => {
  let component: ModaleditDomaineComponent;
  let fixture: ComponentFixture<ModaleditDomaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditDomaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditDomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
