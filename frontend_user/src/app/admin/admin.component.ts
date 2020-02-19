import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  userDetail = []
  filter_array = []
  update_id;
  register_error;
  update_err;
  p = 1;
  // adminlog_val;
  loginId;
  adminlog_check;
  constructor(private userservice: UserService, private router: Router) {

    this.loginId = localStorage.getItem('loggedinId');
    this.adminlog_check = localStorage.getItem('registeruser');
    // get user detail
    this.userservice.getUser().subscribe((res: any) => {
      if (res) {
        for (let i = 0; i < res.length; i++) {
          this.userDetail.push(res[i])
        }
      }


    })

  }
  toggle_val: boolean = true;

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    roles: new FormControl('', [Validators.required]),
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
  onClear() {
    this.register_error = "";
    this.loginForm.reset();
    this.loginForm.patchValue({
      roles: 'user'
    });
  }
  onSubmit() {
    this.userservice.registerUser(this.loginForm.value).subscribe((res: any) => {
      this.register_error = res.data.body.message;
    })
  }

  userDelete(id) {

    this.userservice.deleteUser(id).subscribe((res: any) => {

      if (res.data.body.status == 200) {
        this.userDetail = [];
        this.userservice.getUser().subscribe((res: any) => {
          if (res) {
            for (let i = 0; i < res.length; i++) {
              if ((this.loginId == id || this.adminlog_check == id) ) {
                this.userservice.logout();
                
              }
              this.userDetail.push(res[i])
            }
          }


        })
      }

    })
  }

  userUpdate(id) {
    this.update_err = ""
    this.filter_array = []
    this.userDetail.forEach((getuser, index) => {
      if (getuser._id === id) {
        this.filter_array.push(getuser);

      }

    })
    this.loginForm.setValue({
      name: this.filter_array[0].name,
      roles: this.filter_array[0].roles,
      email: this.filter_array[0].email,
      password: this.filter_array[0].password
    });
    this.update_id = id;

  }

  modalClose() {
    this.loginForm.setValue({
      name: '',
      roles: 'user',
      email: '',
      password: ''
    });
  }
  onChange() {
    this.userDetail.forEach((userval) => {

      if (this.update_id == userval._id && userval.password == this.loginForm.value.password) {

        let update_data = {
          id: this.update_id,
          name: this.loginForm.value.name,
          email: this.loginForm.value.email,
          roles: this.loginForm.value.roles

        }

        this.userservice.updateUser(update_data).subscribe((res: any) => {

          this.update_err = res.data.body.message;
          this.userDetail = [];
          this.userservice.getUser().subscribe((res: any) => {

            if (res) {
              for (let i = 0; i < res.length; i++) {

                if ((this.loginId == res[i]._id || this.adminlog_check == res[i]._id) && res[i]._id == userval._id && userval.roles !== res[i].roles && res[i].roles == "user") {

                  this.userservice.logout();
                }

                this.userDetail.push(res[i])
              }
            }


          })

        })


      } else if (this.update_id == userval._id && userval.password != this.loginForm.value.password) {
        let update_data = {
          id: this.update_id,
          name: this.loginForm.value.name,
          email: this.loginForm.value.email,
          roles: this.loginForm.value.roles,
          password: this.loginForm.value.password
        }

        this.userservice.updateUser(update_data).subscribe((res: any) => {

          this.update_err = res.data.body.message;
          this.userDetail = [];
          this.userservice.getUser().subscribe((res: any) => {

            if (res) {
              for (let i = 0; i < res.length; i++) {
                if ((this.loginId == res[i]._id || this.adminlog_check == res[i]._id) && res[i]._id == userval._id && userval.roles !== res[i].roles && res[i].roles == "user") {
                  
                  this.userservice.logout();
                }
                
                this.userDetail.push(res[i])
              }
            }


          })

        })
      }

    })


  }
  // side bar toggle
  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    this.toggle_val = false;
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    this.toggle_val = true;
  }


}
