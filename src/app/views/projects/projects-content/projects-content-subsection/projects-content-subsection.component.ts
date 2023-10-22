import { Component, Input } from '@angular/core';
import { ProjectSubsection } from 'src/app/services/projects-data.model';

@Component({
  selector: 'app-projects-content-subsection',
  templateUrl: './projects-content-subsection.component.html',
  styleUrls: ['./projects-content-subsection.component.scss']
})
export class ProjectsContentSubsectionComponent {
  @Input({ required: true }) subsection: ProjectSubsection | undefined;
}
