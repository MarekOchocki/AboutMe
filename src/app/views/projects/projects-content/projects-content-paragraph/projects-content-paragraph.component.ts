import { Component, Input, ViewChild } from '@angular/core';
import { ProjectParagraph } from 'src/app/services/projects-data.model';
import { CustomParagraphDirective } from '../custom-paragraphs/custom-paragraph.directive';
import { CustomParagraphService } from '../custom-paragraphs/custom-paragraph.service';
import { CustomParagraph } from '../custom-paragraphs/custom-paragraph.interface';

@Component({
  selector: 'app-projects-content-paragraph',
  templateUrl: './projects-content-paragraph.component.html',
  styleUrls: ['./projects-content-paragraph.component.scss']
})
export class ProjectsContentParagraphComponent {
  private customParagraphChild: CustomParagraphDirective | undefined;

  @Input({ required: true }) paragraph: ProjectParagraph | undefined;
  @ViewChild(CustomParagraphDirective, {static: false}) set setRef(ref: CustomParagraphDirective) {
    if(ref) {
      this.customParagraphChild = ref;
      setTimeout(() => this.loadCustomComponent(), 0);
    }
  }

  constructor(private customParagraphService: CustomParagraphService) {
  }

  private loadCustomComponent() {
    if(this.paragraph?.type !== 'component' || !this.customParagraphChild) {
      return;
    }

    const customComponentType = this.customParagraphService.getCustomParagraphComponent(this.paragraph.htmlTag);
    if(!customComponentType) {
      return;
    }

    const viewContainerRef = this.customParagraphChild.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent<CustomParagraph>(customComponentType);
  }

}
