import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PosterAnnoncePageRoutingModule } from './poster-annonce-routing.module';

import { PosterAnnoncePage } from './poster-annonce.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PosterAnnoncePageRoutingModule
  ],
  declarations: [PosterAnnoncePage]
})
export class PosterAnnoncePageModule {}
