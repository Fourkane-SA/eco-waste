import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PosterAnnoncePage } from './poster-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: PosterAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosterAnnoncePageRoutingModule {}
