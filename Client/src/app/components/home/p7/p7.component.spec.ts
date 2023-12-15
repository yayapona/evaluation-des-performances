import { ComponentFixture, TestBed } from '@angular/core/testing';

import { P7Component } from './p7.component';

describe('P7Component', () => {
  let component: P7Component;
  let fixture: ComponentFixture<P7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ P7Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(P7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
