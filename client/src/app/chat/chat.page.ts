import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
items: [1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  }

}
