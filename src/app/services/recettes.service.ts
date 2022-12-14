import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecettesService {
allRecettes = [
    {title: "Guacamole", img: "https://www.papillesetpupilles.fr/wp-content/uploads/2020/08/Guacamole-%C2%A9cookingalamel-Licence-CC-BY-NC-ND-2.0.jpg"},
    {title: "Gateau aux pommes", img: "https://www.mesrecettes.info/wp-content/uploads/2020/04/gateau-aux-pommes-ultra-moelleux-de-grand-mere.jpg"},
    {title: "Boulettes", img: "https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F07.2F29.2F61e7b058-bf8e-46da-bf42-151329b040aa.2Ejpeg/1200x900/quality/80/crop-from/center/confinement-nos-recettes-de-boulettes-anti-gaspi-avec-les-restes-de-la-veille.jpeg"},
    {title: "Chips d'épluchures de légumes", img: "https://media.houra.fr/images/widget/recette/gd_chipsepluchure_fevrier_2021.jpg"},
    {title: "Pain perdu avec pain rassi", img: "https://media.houra.fr/images/widget/recette/gd_painperdu_fevrier_2021.jpg"},
    {title: "Cookie au pain rassis", img: "https://cdn.chefclub.tools/uploads/recipes/cover-thumbnail/2c3008b3-5f90-4c7a-bb50-db459198a9b5_78JY8Fe.jpg"},
  ]

allLifeHack = [
    {title: "Life hack vinaigre", img: "https://mescoursesenvrac.com/wp-content/uploads/2021/02/vinaigre-menager-8.jpeg"},
    {title: "Oranges", img: "https://zupimages.net/up/22/50/xkc3.png"},
  ]
  constructor() { }
}
