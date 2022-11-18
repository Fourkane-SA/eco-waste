import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiseAJourMotDePassePage } from './mise-ajour-mot-de-passe.page';

const routes: Routes = [
  {
    path: '',
    component: MiseAJourMotDePassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiseAJourMotDePassePageRoutingModule {}
