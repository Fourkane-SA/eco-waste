import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss'],
})
export class ProduitComponent implements OnInit {

  @Input() image : string = ""
  @Input() count : number = 0
  @Input() expires : string = ""
  @Input() name : string = ""
  constructor() { }

  ngOnInit() {}

  increment() {
    this.count++
  }

  decrement() {
    if(this.count > 0)
      this.count--
  }
}
