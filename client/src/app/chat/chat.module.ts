import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { TabsComponent } from '../tabs/tabs.component';
import { MenuComponent } from '../menu/menu.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPageRoutingModule,
    ScrollingModule
  ],
  declarations: [ChatPage, TabsComponent, MenuComponent]
})
export class ChatPageModule {}
