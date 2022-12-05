import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  @Input() text: string
  @Input() isRead: string
  @Input() src: string
  status: string

  constructor() {}

  ngOnInit() {
    if(this.isRead == "true")
      this.status = "/assets/images/read.svg"
    else
      this.status = "/assets/images/unread.svg"
    if(this.text.length > 80)
      this.text = this.text.substring(0, 80) + '...'
    if(this.src == undefined) {
      this.src = 'https://ionicframework.com/docs/img/demos/avatar.svg'
    }
  }

}
