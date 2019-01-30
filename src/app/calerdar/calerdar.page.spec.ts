import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalerdarPage } from './calerdar.page';

describe('CalerdarPage', () => {
  let component: CalerdarPage;
  let fixture: ComponentFixture<CalerdarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalerdarPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalerdarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
