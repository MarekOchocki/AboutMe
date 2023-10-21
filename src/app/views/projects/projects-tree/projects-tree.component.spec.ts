import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTreeComponent } from './projects-tree.component';

describe('ProjectsTreeComponent', () => {
  let component: ProjectsTreeComponent;
  let fixture: ComponentFixture<ProjectsTreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsTreeComponent]
    });
    fixture = TestBed.createComponent(ProjectsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
