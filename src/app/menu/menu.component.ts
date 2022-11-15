import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private route: Router, public authService: AuthenticationService) { }

  ngOnInit() {}

  logout() {
    localStorage.removeItem("login");
    this.route.navigateByUrl("/");
  }
}
