import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotivationPage } from './edit-motivation.page';

describe('EditMotivationPage', () => {
  let component: EditMotivationPage;
  let fixture: ComponentFixture<EditMotivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMotivationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMotivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
