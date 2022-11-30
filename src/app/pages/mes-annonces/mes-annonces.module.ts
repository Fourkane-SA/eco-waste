import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesAnnoncesPageRoutingModule } from './mes-annonces-routing.module';

import { MesAnnoncesPage } from './mes-annonces.page';
import { AnnonceHomeComponent } from 'src/app/components/annonce-home/annonce-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesAnnoncesPageRoutingModule
  ],
  declarations: [MesAnnoncesPage, AnnonceHomeComponent]
})
export class MesAnnoncesPageModule {}
