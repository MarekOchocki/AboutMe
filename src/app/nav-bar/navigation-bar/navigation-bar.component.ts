import { Component } from '@angular/core';
import { Router } from '@angular/router';

class NavigationElement {
  constructor(public displayText: string, public iconName: string, public routerLink: string) {}
}

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  elements: NavigationElement[];

  constructor(private router: Router) {
    this.elements = [
      new NavigationElement('Home', 'home', '/home'),
      new NavigationElement('Projects', 'assignment', '/projects'),
      new NavigationElement('Coding', 'code', '/coding'),
      new NavigationElement('Contact', 'mail', '/contact')
    ];
  }

  public isSelected(element: NavigationElement): boolean {
    return this.router.url.startsWith(element.routerLink);
  }

  public goToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
