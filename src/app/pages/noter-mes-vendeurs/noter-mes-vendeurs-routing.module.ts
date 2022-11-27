import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoterMesVendeursPage } from './noter-mes-vendeurs.page';

const routes: Routes = [
  {
    path: '',
    component: NoterMesVendeursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoterMesVendeursPageRoutingModule {}
