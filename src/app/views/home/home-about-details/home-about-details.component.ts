import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-about-details',
  templateUrl: './home-about-details.component.html',
  styleUrls: ['./home-about-details.component.scss']
})
export class HomeAboutDetailsComponent {
  constructor(private router: Router) {
  }
  
  public goToContact(): void {
    this.router.navigateByUrl('/contact');
  }
}
