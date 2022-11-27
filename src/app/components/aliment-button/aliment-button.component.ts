import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aliment-button',
  templateUrl: './aliment-button.component.html',
  styleUrls: ['./aliment-button.component.scss'],
})
export class AlimentButtonComponent implements OnInit {

  @Input() name : string
  @Input() image : string

  constructor() { }

  ngOnInit() {}

}
