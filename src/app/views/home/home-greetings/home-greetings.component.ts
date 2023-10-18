import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-greetings',
  templateUrl: './home-greetings.component.html',
  styleUrls: ['./home-greetings.component.scss']
})
export class HomeGreetingsComponent {

  constructor(private router: Router) {
  }
  
  public goToProjects(): void {
    this.router.navigateByUrl('/projects');
  }
}
