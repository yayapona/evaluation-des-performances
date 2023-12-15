import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaleditAnneeComponent } from './modaledit-annee.component';

describe('ModaleditAnneeComponent', () => {
  let component: ModaleditAnneeComponent;
  let fixture: ComponentFixture<ModaleditAnneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaleditAnneeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaleditAnneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
