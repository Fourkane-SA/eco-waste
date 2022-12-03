import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecettePageRoutingModule } from './recette-routing.module';

import { RecettePage } from './recette.page';
import { TagComponent } from 'src/app/components/tag/tag.component';
import { LifeHackCardComponent } from 'src/app/components/life-hack-card/life-hack-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecettePageRoutingModule
  ],
  declarations: [RecettePage, TagComponent, LifeHackCardComponent]
})
export class RecettePageModule {}
