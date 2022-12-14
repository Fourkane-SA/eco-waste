import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifeHackDetailPageRoutingModule } from './life-hack-detail-routing.module';

import { LifeHackDetailPage } from './life-hack-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LifeHackDetailPageRoutingModule
  ],
  declarations: [LifeHackDetailPage]
})
export class LifeHackDetailPageModule {}
