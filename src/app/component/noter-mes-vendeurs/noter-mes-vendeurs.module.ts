import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoterMesVendeursPageRoutingModule } from './noter-mes-vendeurs-routing.module';

import { NoterMesVendeursPage } from './noter-mes-vendeurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoterMesVendeursPageRoutingModule
  ],
  declarations: [NoterMesVendeursPage]
})
export class NoterMesVendeursPageModule {}
