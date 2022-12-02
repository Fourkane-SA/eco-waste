import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() sender : string
  @Input() receiver : string
  @Input() text : string
  @Input() url1 : string
  @Input() url2 : string
  sendByUserLoggin : boolean = false

  constructor() { 
    
  }

  ngOnInit() {
    if(this.sender == localStorage.getItem('uid'))
      this.sendByUserLoggin = true
  }

}
