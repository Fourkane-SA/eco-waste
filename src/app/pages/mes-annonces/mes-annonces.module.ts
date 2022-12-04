import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesAnnoncesPageRoutingModule } from './mes-annonces-routing.module';

import { MesAnnoncesPage } from './mes-annonces.page';
import { SharedModule } from 'src/app/module/shared/shared.module';
import { AnnonceEditComponent } from 'src/app/components/annonce-edit/annonce-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesAnnoncesPageRoutingModule,
    SharedModule
  ],
  declarations: [MesAnnoncesPage, AnnonceEditComponent]
})
export class MesAnnoncesPageModule {}
