import { Injectable, Type } from '@angular/core';
import { CustomParagraph } from './custom-paragraph.interface';
import { WebTechnologiesComponent } from './web-technologies/web-technologies.component';
import { FactorioParagraphComponent } from './factorio-paragraph/factorio-paragraph.component';

@Injectable({
  providedIn: 'root'
})
export class CustomParagraphService {
  private tagToComponentMap = new Map<string, Type<CustomParagraph>>();

  constructor() {
    this.tagToComponentMap.set('app-web-technologies', WebTechnologiesComponent);
    this.tagToComponentMap.set('app-factorio-paragraph', FactorioParagraphComponent);
  }

  public getCustomParagraphComponent(htmlTag: string): Type<CustomParagraph> | undefined {
    return this.tagToComponentMap.get(htmlTag);
  }
}
