import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsContentParagraphComponent } from './projects-content-paragraph.component';

describe('ProjectsContentParagraphComponent', () => {
  let component: ProjectsContentParagraphComponent;
  let fixture: ComponentFixture<ProjectsContentParagraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsContentParagraphComponent]
    });
    fixture = TestBed.createComponent(ProjectsContentParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
