import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewContratComponent } from './modal-view-contrat.component';

describe('ModalViewContratComponent', () => {
  let component: ModalViewContratComponent;
  let fixture: ComponentFixture<ModalViewContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewContratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
