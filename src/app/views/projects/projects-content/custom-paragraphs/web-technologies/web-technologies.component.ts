import { Component } from '@angular/core';
import { CustomParagraph } from '../custom-paragraph.interface';

@Component({
  selector: 'app-web-technologies',
  templateUrl: './web-technologies.component.html',
  styleUrls: ['./web-technologies.component.scss']
})
export class WebTechnologiesComponent implements CustomParagraph {
  data: any;
}
