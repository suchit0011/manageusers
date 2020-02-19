import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  err_msg;

  constructor(private userservice: UserService, private router: Router) {

  }

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    roles: new FormControl('user', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  get name() {
    return this.loginForm.get('name');
  }

  get roles() {
    return this.loginForm.get('roles');
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {


    this.userservice.userRegister(this.loginForm.value).subscribe((res: any) => {

      this.err_msg = res.data.body.message;
      if (res.data.body.message == "success") {

        this.router.navigate(['']);
        localStorage.setItem('token', res.data.body.usertoken);
        localStorage.setItem('registeruser', res.data.body.id);
      }
      if (res.data.body.roles == "admin") {
        this.userservice.adminRegister('true');
      }
    })
  }

  ngOnInit() {
  }

}
