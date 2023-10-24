import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationBarComponent } from './nav-bar/navigation-bar/navigation-bar.component';
import { HomeComponent } from './views/home/home.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { MatIconModule } from '@angular/material/icon';
import { CodingComponent } from './views/coding/coding.component';
import { ContactComponent } from './views/contact/contact.component';
import { HomeGreetingsComponent } from './views/home/home-greetings/home-greetings.component';
import { HomeAboutDetailsComponent } from './views/home/home-about-details/home-about-details.component';
import { ProjectsTreeComponent } from './views/projects/projects-tree/projects-tree.component';
import { ProjectsContentComponent } from './views/projects/projects-content/projects-content.component';
import { ProjectsContentParagraphComponent } from './views/projects/projects-content/projects-content-paragraph/projects-content-paragraph.component';
import { ProjectsContentSubsectionComponent } from './views/projects/projects-content/projects-content-subsection/projects-content-subsection.component';
import { WebTechnologiesComponent } from './views/projects/projects-content/custom-paragraphs/web-technologies/web-technologies.component';
import { CustomParagraphDirective } from './views/projects/projects-content/custom-paragraphs/custom-paragraph.directive';
import { FactorioParagraphComponent } from './views/projects/projects-content/custom-paragraphs/factorio-paragraph/factorio-paragraph.component';
import { FactorioInputsComponent } from './factorio-calculator/components/factorio-inputs/factorio-inputs.component';
import { FactorioOutputsComponent } from './factorio-calculator/components/factorio-outputs/factorio-outputs.component';
import { FactorioProductionRaportComponent } from './factorio-calculator/components/factorio-production-raport/factorio-production-raport.component';
import { FactorioAppComponent } from './factorio-calculator/components/factorio-app/factorio-app.component';
import { KebabToPrettyTextPipe } from './pipes/kebab-to-pretty-text.pipe';
import { AutoselectInputComponent } from './factorio-calculator/components/autoselect-input/autoselect-input.component';
import { ProductionNumberInputComponent } from './factorio-calculator/components/factorio-outputs/production-number-input/production-number-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    ProjectsComponent,
    CodingComponent,
    ContactComponent,
    HomeGreetingsComponent,
    HomeAboutDetailsComponent,
    ProjectsTreeComponent,
    ProjectsContentComponent,
    ProjectsContentParagraphComponent,
    ProjectsContentSubsectionComponent,
    WebTechnologiesComponent,
    CustomParagraphDirective,
    FactorioParagraphComponent,
    FactorioInputsComponent,
    FactorioOutputsComponent,
    FactorioProductionRaportComponent,
    FactorioAppComponent,
    KebabToPrettyTextPipe,
    AutoselectInputComponent,
    ProductionNumberInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
