import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccueilPageRoutingModule } from './accueil-routing.module';

import { AccueilPage } from './accueil.page';
import { AnnonceHomeComponent } from 'src/app/components/annonce-home/annonce-home.component';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { PubComponent } from 'src/app/components/pub/pub.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccueilPageRoutingModule,
    SharedModule
  ],
  declarations: [AccueilPage, PubComponent]
})
export class AccueilPageModule {}
