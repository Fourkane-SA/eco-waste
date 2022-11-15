import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from "../shared/authentication-service";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form : FormGroup;
  error : boolean;
  errorMessage : string;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {
    this.form = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    })
  }
  ngOnInit() {}
  login() {
    this.authService.SignIn(this.form.value.email, this.form.value.password)
      .then((res) => {
          console.log(res)
          this.router.navigate(['articles']);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
}
