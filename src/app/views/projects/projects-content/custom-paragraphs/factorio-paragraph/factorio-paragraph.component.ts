import { Component } from '@angular/core';
import { CustomParagraph } from '../custom-paragraph.interface';

@Component({
  selector: 'app-factorio-paragraph',
  templateUrl: './factorio-paragraph.component.html',
  styleUrls: ['./factorio-paragraph.component.scss']
})
export class FactorioParagraphComponent implements CustomParagraph {
  data: any;
}
