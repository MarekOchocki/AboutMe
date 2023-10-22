import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, delay, of } from 'rxjs';
import { ProjectSectionContent, ProjectsSectionContentService } from 'src/app/services/projects-section-content/projects-section-content.service';

@Component({
  selector: 'app-projects-content',
  templateUrl: './projects-content.component.html',
  styleUrls: ['./projects-content.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('invisible', style({
        opacity: 0,
      })),
      state('visible', style({
        opacity: 1,
      })),
      transition('visible => invisible', [
        animate('0.15s')
      ]),
      transition('invisible => visible', [
        animate('0.15s')
      ]),
    ]),
  ]
})
export class ProjectsContentComponent implements OnDestroy {
  sectionContent: ProjectSectionContent;
  isVisible: boolean = true;
  private subscriptions: Subscription;

  private animationSubscription = new Subscription();
  private nextContent: ProjectSectionContent

  constructor(private projectsSectionContentService: ProjectsSectionContentService) {
    this.sectionContent = this.projectsSectionContentService.getDefaultSectionContent();
    this.nextContent = this.projectsSectionContentService.getDefaultSectionContent();
    this.subscriptions = this.projectsSectionContentService.getSectionContent().subscribe(content => this.onContentChange(content));
    this.startContentChangeAnimation();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private onContentChange(newContent: ProjectSectionContent): void {
    this.nextContent = newContent;
    this.startContentChangeAnimation();
  }

  private startContentChangeAnimation(): void {
    this.isVisible = false;
    this.animationSubscription.unsubscribe();
    this.animationSubscription = of(true).pipe(delay(150)).subscribe(visiblity => {
      this.isVisible = visiblity
      this.sectionContent = this.nextContent;
    });
  }
}
