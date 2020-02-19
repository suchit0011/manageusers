import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-authuser',
  templateUrl: './authuser.component.html',
  styleUrls: ['./authuser.component.css']
})
export class AuthuserComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {
    let auth_token = this.route.snapshot.queryParamMap.get('tokenstore');
    let auth_user = this.route.snapshot.queryParamMap.get('useraccess');

    if (auth_token != 'undefind' && auth_token != '') {

      localStorage.setItem('token', auth_token);
      if (auth_user != 'undefind' && auth_user != '' && auth_user == "admin") {
        localStorage.setItem('adminid', 'true');
      }
      this.router.navigate(['']);
    }


  }

  ngOnInit() {
  }

}
