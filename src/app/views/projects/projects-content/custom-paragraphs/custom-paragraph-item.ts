import { Type } from '@angular/core';
import { CustomParagraph } from './custom-paragraph.interface';

export class CustomParagraphItem {
  constructor(public component: Type<CustomParagraph>, public data: any) {}
}
