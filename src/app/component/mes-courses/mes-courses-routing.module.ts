import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MesCoursesPage } from './mes-courses.page';

const routes: Routes = [
  {
    path: '',
    component: MesCoursesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MesCoursesPageRoutingModule {}
