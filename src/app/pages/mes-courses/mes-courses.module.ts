import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesCoursesPageRoutingModule } from './mes-courses-routing.module';

import { MesCoursesPage } from './mes-courses.page';
import { ProduitComponent } from 'src/app/components/produit/produit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesCoursesPageRoutingModule
  ],
  declarations: [MesCoursesPage, ProduitComponent]
})
export class MesCoursesPageModule {}
