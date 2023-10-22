import { Injectable, OnDestroy } from '@angular/core';
import { EventType, Router } from '@angular/router';
import * as projectsData from '../projects-data.json';
import { ProjectSection, ProjectSubsection, ProjectsInfo } from '../projects-data.model';
import { ProjectSectionTreeElement } from '../projects-tree.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';


export class ProjectSectionContent {
  projectName: string;
  sectionName: string;
  subsections: ProjectSubsection[];

  public constructor(projectName: string, section: ProjectSection) {
    this.projectName = projectName;
    this.sectionName = section.name;
    this.subsections = section.subsections;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsSectionContentService implements OnDestroy {
  private static readonly defaultSection: ProjectSectionContent = {
    projectName: 'unnamed project',
    sectionName: 'unnamed section',
    subsections: []
  }; 

  private urlToContent: Map<string, ProjectSectionContent>;
  private subscriptions: Subscription;
  private currentSectionContent = new BehaviorSubject<ProjectSectionContent>(ProjectsSectionContentService.defaultSection);

  constructor(private router: Router) {
    this.urlToContent = new Map<string, ProjectSectionContent>();
    const projects = projectsData as ProjectsInfo;

    projects.projects.forEach(project => {
      project.sections.forEach(section => {
        const sectionId = new ProjectSectionTreeElement(section, project.name).readableId;
        const sectionContent = new ProjectSectionContent(project.name, section);
        this.urlToContent.set(sectionId, sectionContent);
      });
    });

    
    this.subscriptions = this.router.events.subscribe((event) => {
      if(event.type === EventType.NavigationEnd) {
        this.updateSectionContent();
      }
    })
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getSectionContent(): Observable<ProjectSectionContent> {
    return this.currentSectionContent.asObservable();
  }

  public getDefaultSectionContent(): ProjectSectionContent {
    return ProjectsSectionContentService.defaultSection;
  }

  private updateSectionContent(): void {
    const currentSectionId = this.getCurrentSectionIdFromUrl();
    if(this.urlToContent.has(currentSectionId)) {
      const section = this.urlToContent.get(currentSectionId) ?? ProjectsSectionContentService.defaultSection;
      this.currentSectionContent.next(section);
    }
  }

  private getCurrentSectionIdFromUrl(): string {
    return this.router.url.split('/').slice(2).reduce((sum, el) => `${sum}/${el}`);
  }
}
