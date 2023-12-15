import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalPreuveComponent } from './edit-modal-preuve.component';

describe('EditModalPreuveComponent', () => {
  let component: EditModalPreuveComponent;
  let fixture: ComponentFixture<EditModalPreuveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalPreuveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalPreuveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
