import { Component, OnInit } from '@angular/core';
import { ProjectTreeElement, ProjectsTreeService } from 'src/app/services/projects-tree.service';

@Component({
  selector: 'app-projects-tree',
  templateUrl: './projects-tree.component.html',
  styleUrls: ['./projects-tree.component.scss']
})
export class ProjectsTreeComponent implements OnInit {
  treeElements: ProjectTreeElement[] = [];

  constructor(private projectsTreeService: ProjectsTreeService) {
    this.treeElements = projectsTreeService.getTreeElements();
  }

  public ngOnInit() {

  }

  public toggleProject(projectName: string): void {
    this.projectsTreeService.toggleProject(projectName);
  }

  public navigateTo(sectionId: string): void {
    this.projectsTreeService.navigateTo(sectionId);
  }

  public isProjectSelected(projectId: string): boolean {
    return this.projectsTreeService.isProjectSelected(projectId);
  }

  public isSectionSelected(sectionId: string): boolean {
    return this.projectsTreeService.isSectionSelected(sectionId);
  }
}
