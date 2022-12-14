import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-recette-detail',
  templateUrl: './recette-detail.page.html',
  styleUrls: ['./recette-detail.page.scss'],
})
export class RecetteDetailPage implements OnInit {

  title : string = ""
  src : string = ""

  constructor(private route : ActivatedRoute, private rec : RecettesService) { }

  ngOnInit() {
    this.title = this.route.snapshot.params['title']
    this.src = this.rec.allRecettes.find(lh => lh.title == this.title).img
  }

}
