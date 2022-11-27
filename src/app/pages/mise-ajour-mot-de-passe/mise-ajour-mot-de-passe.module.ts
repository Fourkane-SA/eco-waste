import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiseAJourMotDePassePageRoutingModule } from './mise-ajour-mot-de-passe-routing.module';

import { MiseAJourMotDePassePage } from './mise-ajour-mot-de-passe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiseAJourMotDePassePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MiseAJourMotDePassePage]
})
export class MiseAJourMotDePassePageModule {}
