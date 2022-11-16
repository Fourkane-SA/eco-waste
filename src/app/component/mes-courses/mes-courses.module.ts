import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MesCoursesPageRoutingModule } from './mes-courses-routing.module';

import { MesCoursesPage } from './mes-courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MesCoursesPageRoutingModule
  ],
  declarations: [MesCoursesPage]
})
export class MesCoursesPageModule {}
