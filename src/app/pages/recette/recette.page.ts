import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recette',
  templateUrl: './recette.page.html',
  styleUrls: ['./recette.page.scss'],
})
export class RecettePage implements OnInit {
  lifeHCards = [
    {title: "Guacamole", img: "https://www.papillesetpupilles.fr/wp-content/uploads/2020/08/Guacamole-%C2%A9cookingalamel-Licence-CC-BY-NC-ND-2.0.jpg"},
    {title: "Gateau aux pommes", img: "https://www.mesrecettes.info/wp-content/uploads/2020/04/gateau-aux-pommes-ultra-moelleux-de-grand-mere.jpg"},
    {title: "Exemple", img: "https://via.placeholder.com/200x150"},
  ]
  constructor() { }

  ngOnInit() {
  }

}
