import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalObjectifComponent } from './edit-modal-objectif.component';

describe('EditModalObjectifComponent', () => {
  let component: EditModalObjectifComponent;
  let fixture: ComponentFixture<EditModalObjectifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalObjectifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalObjectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
