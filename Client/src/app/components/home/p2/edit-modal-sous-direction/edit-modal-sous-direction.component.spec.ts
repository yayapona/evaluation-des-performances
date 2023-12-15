import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalSousDirectionComponent } from './edit-modal-sous-direction.component';

describe('EditModalSousDirectionComponent', () => {
  let component: EditModalSousDirectionComponent;
  let fixture: ComponentFixture<EditModalSousDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalSousDirectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalSousDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
