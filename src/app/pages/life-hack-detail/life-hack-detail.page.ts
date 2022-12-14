import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecettesService } from 'src/app/services/recettes.service';

@Component({
  selector: 'app-life-hack-detail',
  templateUrl: './life-hack-detail.page.html',
  styleUrls: ['./life-hack-detail.page.scss'],
})
export class LifeHackDetailPage implements OnInit {

  title : string = ""
  src : string = ""

  constructor(private route : ActivatedRoute, private rec : RecettesService) { }

  ngOnInit() {
    this.title = this.route.snapshot.params['title']
    this.src = this.rec.allLifeHack.find(lh => lh.title == this.title).img
  }

}
