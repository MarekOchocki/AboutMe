import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('navigationEnter', [
      transition(':enter', [
        animate('0.3s', keyframes([
          style({ opacity: '0' }),
          style({ opacity: '1' })
        ]))
      ]),
      transition(':leave', [
        animate('0.3s', keyframes([
          style({ opacity: '1' }),
          style({ opacity: '0' })
        ]))
      ])
    ],
  )]
})
export class HomeComponent {
}
