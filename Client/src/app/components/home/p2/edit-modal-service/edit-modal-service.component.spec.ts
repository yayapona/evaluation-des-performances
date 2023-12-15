import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModalServiceComponent } from './edit-modal-service.component';

describe('EditModalServiceComponent', () => {
  let component: EditModalServiceComponent;
  let fixture: ComponentFixture<EditModalServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditModalServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModalServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
