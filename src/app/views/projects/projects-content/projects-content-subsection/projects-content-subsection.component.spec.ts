import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContentSubsectionComponent } from './projects-content-subsection.component';

describe('ProjectsContentSubsectionComponent', () => {
  let component: ProjectsContentSubsectionComponent;
  let fixture: ComponentFixture<ProjectsContentSubsectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsContentSubsectionComponent]
    });
    fixture = TestBed.createComponent(ProjectsContentSubsectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
