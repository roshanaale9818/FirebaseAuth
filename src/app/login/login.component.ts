import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { LoginRequest } from './../models/loginRequest';
import { User } from './../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      password:[null,[Validators.required]]
    })
  }
  onSubmit(value:LoginRequest){
    if(this.loginForm.invalid){
      alert('please make sure you enter email and password')
      return;
    }
    else {
      console.log(value);
      this.authService.login(value.email,value.password).then(data =>{
        console.log(data);
        this.authService.getUserData(data.user.uid).subscribe((userInfo:User)=>{
          console.log(userInfo);
          if(userInfo.roles.admin){
            this.router.navigate(['/dashboard']);
          }
          else{
            this.router.navigate(['/home']);
          }
          // console.log(userInfo);
        });
      }).catch(error =>{
        //alerting firebase error message here.
        alert(error);
      });
    }
  }

}
