import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnonceHomeComponent } from 'src/app/components/annonce-home/annonce-home.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [AnnonceHomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    AnnonceHomeComponent
  ]
})
export class SharedModule { }
