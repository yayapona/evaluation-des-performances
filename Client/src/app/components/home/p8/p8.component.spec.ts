import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P8Component } from './p8.component';

describe('P8Component', () => {
  let component: P8Component;
  let fixture: ComponentFixture<P8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P8Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
