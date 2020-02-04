import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_count;
  constructor(private userservice: UserService) {
    this.userservice.getUser().subscribe((res: any) => {
      this.user_count = res.length;
    })
  }

  ngOnInit() {
  }

}
