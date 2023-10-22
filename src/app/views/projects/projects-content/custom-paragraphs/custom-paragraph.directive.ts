import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomParagraph]',
})
export class CustomParagraphDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
