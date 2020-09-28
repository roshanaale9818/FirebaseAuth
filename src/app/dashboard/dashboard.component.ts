import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { User } from './../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService:AuthService) { }
  user:User;
  ngOnInit(){
    this.authService.user.subscribe((data:User)=>{
      this.user = data;
    })

  }
  logOut(){
    let userChoice = confirm("Are you sure?");
    if(userChoice == true){
      this.authService.signOut();
    }
    else{
      return
    }
  }

}
