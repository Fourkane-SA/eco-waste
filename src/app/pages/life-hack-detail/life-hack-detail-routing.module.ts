import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifeHackDetailPage } from './life-hack-detail.page';

const routes: Routes = [
  {
    path: '',
    component: LifeHackDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifeHackDetailPageRoutingModule {}
