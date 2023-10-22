import { Component } from '@angular/core';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('navigationEnter', [
      transition(':enter', [
        animate('0.3s', keyframes([
          style({ opacity: '0' }),
          style({ opacity: '1' })
        ]))
      ])
    ],
  )]
})
export class ProjectsComponent {
}
