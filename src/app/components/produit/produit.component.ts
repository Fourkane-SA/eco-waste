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
  dateFormat : string
  constructor() { 
    setInterval(() => {
        this.dateFormat = new Date(this.expires).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
        if(this.dateFormat === "Invalid Date")
          this.dateFormat = "Date d'expiration"
      },10)
  }

  ngOnInit() {
    
  }

  increment() {
    this.count++
  }

  decrement() {
    if(this.count > 0)
      this.count--
  }
}
