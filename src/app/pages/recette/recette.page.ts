import { Component, OnInit } from '@angular/core';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {
  
  recettes = []
  lifehack = []

  search

  constructor(private rec : RecettesService) {
    this.recettes = this.rec.allRecettes
    this.lifehack = this.rec.allLifeHack
    console.log(this.recettes)
   }

  ngOnInit() {
    
  }
  update() {
    this.recettes = this.rec.allRecettes.filter(recette => recette.title.toLowerCase().includes(this.search.toLowerCase()))
    this.lifehack = this.rec.allLifeHack.filter(lifehack => lifehack.title.toLowerCase().includes(this.search.toLowerCase()))
  }
}
