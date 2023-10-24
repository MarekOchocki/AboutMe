import { Injectable, OnDestroy } from '@angular/core';
import * as projectsData from './projects-data.json';
import { Project, ProjectSection, ProjectsInfo } from './projects-data.model';
import { EventType, Router } from '@angular/router';
import { Subscription } from 'rxjs';

const convertToKebabCase = (str: string): string => {
  return str.replace(/[\s]+/g, '-')
  .toLowerCase();
}

export class ProjectSectionTreeElement {
  displayName: string = '';
  readableId: string = '';

  constructor(section: ProjectSection, projectName: string) {
    this.displayName = section.name;
    this.readableId = this.makeReadableId(section.name, projectName);
  }

  private makeReadableId(sectionName: string, projectName: string): string {
    return `${convertToKebabCase(projectName)}/${convertToKebabCase(sectionName)}`;
  }
}

export class ProjectTreeElement {
  displayName: string = '';
  readableId: string = '';
  sections: ProjectSectionTreeElement[] = [];
  isCollapsed: boolean = true;

  constructor(project: Project) {
    this.displayName = project.name;
    this.readableId = convertToKebabCase(this.displayName);
    this.sections = project.sections.map(section => new ProjectSectionTreeElement(section, project.name));
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsTreeService implements OnDestroy {
  private treeElements: ProjectTreeElement[] = [];

  private subscriptions: Subscription;

  constructor(private router: Router) {
    const projects = projectsData as ProjectsInfo;
    this.treeElements = projects.projects.map(project => new ProjectTreeElement(project));

    this.subscriptions = this.router.events.subscribe((event) => {
      if(event.type === EventType.NavigationEnd) {
        this.openProjectAfterUrlChange();
      }
    });
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public getTreeElements(): ProjectTreeElement[] {
    return this.treeElements;
  }

  public toggleProject(projectName: string): void {
    this.treeElements.forEach(project => {
      project.isCollapsed = projectName === project.displayName ? !project.isCollapsed : project.isCollapsed ;
    });
  }

  public navigateTo(sectionId: string): void {
    this.router.navigateByUrl(`/projects/${sectionId}`);
  }

  public isProjectSelected(projectId: string): boolean {
    const urlParts = this.router.url.split('/');
    return urlParts[2] === projectId;
  }

  public isSectionSelected(sectionId: string): boolean {
    const urlParts = this.router.url.split('/');
    if(urlParts.length !== 4) { return false; }
    return urlParts.slice(2).reduce((sum, el) => `${sum}/${el}`) === sectionId;
  }

  private openProjectAfterUrlChange() {
    const urlParts = this.router.url.split('/').slice(1);
    if(urlParts.length == 3 && urlParts[0] === 'projects') {
      this.treeElements.forEach(project => {
        project.isCollapsed = urlParts[1] === project.readableId ? false : project.isCollapsed;
      });
    }
  }
}
