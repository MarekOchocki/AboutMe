import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebTechnologiesComponent } from './web-technologies.component';

describe('WebTechnologiesComponent', () => {
  let component: WebTechnologiesComponent;
  let fixture: ComponentFixture<WebTechnologiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebTechnologiesComponent]
    });
    fixture = TestBed.createComponent(WebTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
