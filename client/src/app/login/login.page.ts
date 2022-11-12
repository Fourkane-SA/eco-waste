import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form : FormGroup;
  error : boolean;
  errorMessage : string;
  

  constructor(private route: Router) { 
    this.form = new FormGroup({
      id : new FormControl(),
      password : new FormControl()
    })
  }

  ngOnInit() {
  }

  login() {
    axios.post(environment.apiUrl + "users/login", this.form.value)
    .then(() => {
      localStorage.setItem('login', this.form.value.id)
      this.route.navigateByUrl("/articles")
    }) // TODO
    .catch(e => {
      this.error = true;
      this.errorMessage = e.response.data;
    })
  }

}
