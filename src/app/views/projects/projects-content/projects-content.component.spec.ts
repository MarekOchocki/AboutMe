import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContentComponent } from './projects-content.component';

describe('ProjectsContentComponent', () => {
  let component: ProjectsContentComponent;
  let fixture: ComponentFixture<ProjectsContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsContentComponent]
    });
    fixture = TestBed.createComponent(ProjectsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
