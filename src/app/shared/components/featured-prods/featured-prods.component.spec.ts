import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProdsComponent } from './featured-prods.component';

describe('FeaturedProdsComponent', () => {
  let component: FeaturedProdsComponent;
  let fixture: ComponentFixture<FeaturedProdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedProdsComponent]
    });
    fixture = TestBed.createComponent(FeaturedProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
