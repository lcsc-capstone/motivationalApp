import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMotivationPage } from './new-motivation.page';

describe('NewMotivationPage', () => {
  let component: NewMotivationPage;
  let fixture: ComponentFixture<NewMotivationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMotivationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMotivationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
