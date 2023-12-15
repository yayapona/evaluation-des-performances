import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalDirectionComponent } from './edit-modal-direction.component';

describe('EditModalDirectionComponent', () => {
  let component: EditModalDirectionComponent;
  let fixture: ComponentFixture<EditModalDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalDirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
