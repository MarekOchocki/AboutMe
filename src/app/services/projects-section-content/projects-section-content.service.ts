import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as projectsData from '../projects-data.json';
import { ProjectSection, ProjectsInfo } from '../projects-data.model';
import { ProjectSectionTreeElement } from '../projects-tree.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsSectionContentService {
  private urlToContent: Map<string, ProjectSection>;

  constructor(private router: Router) {
    this.urlToContent = new Map<string, ProjectSection>();
    const projects = projectsData as ProjectsInfo;
    projects.projects.forEach(project => {
      project.sections.forEach(section => {
        const sectionId = new ProjectSectionTreeElement(section, project.name).readableId;
        this.urlToContent.set(sectionId, section);
      });
    });
  }

  // public getSectionContent(): Observable<ProjectSection> {

  // }
}
