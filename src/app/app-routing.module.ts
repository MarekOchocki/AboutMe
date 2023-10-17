import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProjectsComponent } from './views/projects/projects.component';
import { CodingComponent } from './views/coding/coding.component';
import { ContactComponent } from './views/contact/contact.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "projects", component: ProjectsComponent},
  {path: "coding", component: CodingComponent},
  {path: "contact", component: ContactComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
