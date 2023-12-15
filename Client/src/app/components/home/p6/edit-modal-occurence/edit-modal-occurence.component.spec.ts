import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalOccurenceComponent } from './edit-modal-occurence.component';

describe('EditModalOccurenceComponent', () => {
  let component: EditModalOccurenceComponent;
  let fixture: ComponentFixture<EditModalOccurenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalOccurenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalOccurenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
