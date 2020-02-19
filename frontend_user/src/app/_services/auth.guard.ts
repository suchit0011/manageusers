import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate() {
    let user_token = localStorage.getItem('token')
    // console.log('-',user_token)
    if (user_token) {
    
      return true
    }
    else {
      this.router.navigate(['/login']);
      return false
      
    }

  }

}
