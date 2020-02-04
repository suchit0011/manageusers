import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserroleGuard implements CanActivate {
  constructor(private userservice: UserService){}
  canActivate(){  
    let user_token = localStorage.getItem('token')
    let admin = this.userservice.adminAccess()
    if (user_token && admin==true) {
      return true;
    }
    else {
      return false;
    }
  }
   
  
}
