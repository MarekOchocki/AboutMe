import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAboutDetailsComponent } from './home-about-details.component';

describe('HomeAboutDetailsComponent', () => {
  let component: HomeAboutDetailsComponent;
  let fixture: ComponentFixture<HomeAboutDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAboutDetailsComponent]
    });
    fixture = TestBed.createComponent(HomeAboutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
