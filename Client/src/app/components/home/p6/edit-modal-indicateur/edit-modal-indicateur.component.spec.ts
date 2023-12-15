import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalIndicateurComponent } from './edit-modal-indicateur.component';

describe('EditModalIndicateurComponent', () => {
  let component: EditModalIndicateurComponent;
  let fixture: ComponentFixture<EditModalIndicateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalIndicateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalIndicateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
