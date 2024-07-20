import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBtnsComponent } from './filter-btns.component';

describe('FilterBtnsComponent', () => {
  let component: FilterBtnsComponent;
  let fixture: ComponentFixture<FilterBtnsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBtnsComponent]
    });
    fixture = TestBed.createComponent(FilterBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
