import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_msg;

  constructor(private userservice: UserService) {

    this.userservice.admin_exist.subscribe((res: any) => {
      this.login_msg = res;
      if (res == "success") {
        this.login_msg = "";
      }
    })

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('')
  })

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {

    this.userservice.userLogin(this.loginForm.value)

  }
  onLogin() {
    this.login_msg = "";
    this.userservice.socialLogin().subscribe((res: any) => {

    })
  }


}
