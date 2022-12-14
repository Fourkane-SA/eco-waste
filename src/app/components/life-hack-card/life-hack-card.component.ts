import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-life-hack-card',
  templateUrl: './life-hack-card.component.html',
  styleUrls: ['./life-hack-card.component.scss'],
})
export class LifeHackCardComponent implements OnInit {
  @Input() img
  @Input() title
  constructor(private route : Router) { }

  ngOnInit() {}

}
