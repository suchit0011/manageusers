import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  canActivate() {
    let user_token = localStorage.getItem('token')
    if (user_token) {
      return false;
    }
    else {
      return true;
    }

  }


}
