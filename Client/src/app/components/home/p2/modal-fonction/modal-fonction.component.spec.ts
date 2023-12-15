import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFonctionComponent } from './modal-fonction.component';

describe('ModalFonctionComponent', () => {
  let component: ModalFonctionComponent;
  let fixture: ComponentFixture<ModalFonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFonctionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalFonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
