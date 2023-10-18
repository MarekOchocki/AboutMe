import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './nav-bar/navigation-bar/navigation-bar.component';
import { HomeComponent } from './views/home/home.component';
import { ProjectsComponent } from './views/projects/projects.component';
import {MatIconModule} from '@angular/material/icon';
import { CodingComponent } from './views/coding/coding.component';
import { ContactComponent } from './views/contact/contact.component';
import { HomeGreetingsComponent } from './views/home/home-greetings/home-greetings.component';
import { HomeAboutDetailsComponent } from './views/home/home-about-details/home-about-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    ProjectsComponent,
    CodingComponent,
    ContactComponent,
    HomeGreetingsComponent,
    HomeAboutDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
