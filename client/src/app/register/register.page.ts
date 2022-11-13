import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form : FormGroup;
  error : boolean;
  errorMessage : string;

  constructor(private route: Router) { 
    this.form = new FormGroup({
      id : new FormControl(),
      firstname : new FormControl(),
      lastname : new FormControl(),
      password : new FormControl(),
      description : new FormControl()
    });
    this.error = false;
  }

  ngOnInit() {
  }

  register() {
    const user = this.form.value;
    axios.post(environment.apiUrl + "users", user)
    .then(() => {
      localStorage.setItem('login', user.id)
      this.route.navigateByUrl("/chat");
    })
    .catch(e => {
      this.error = true;
      this.errorMessage = e.response.data;
    })
  }
}
