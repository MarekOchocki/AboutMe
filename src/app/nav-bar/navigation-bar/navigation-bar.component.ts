import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
      new NavigationElement('Projects', 'assignment', '/projects'), // TODO: maybe assignment_turned_in icon?
      new NavigationElement('Coding', 'code', '/coding'),
      new NavigationElement('Contact', 'mail', '/contact'),
    ];
  }

  public isSelected(element: NavigationElement): boolean {
    return this.router.url === element.routerLink;
  }
}
