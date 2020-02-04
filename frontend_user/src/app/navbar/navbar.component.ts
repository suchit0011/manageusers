import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user_login = false;
  
  constructor( public userservice: UserService) {}
   
  

  ngOnInit() {
  }

  onLogout() {

    this.userservice.logout();

  }


}
