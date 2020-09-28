import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../models/user';
import { AuthService } from './../services/auth.service';
import { UtilService } from './../services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
registerForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private utilService:UtilService,
    private router:Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]],
      firstName:[null,[Validators.required]],
      lastName:[null,[Validators.required]],
      password:[null,[Validators.required]],
      // role:['user']
    })
  }
  onSubmit(value:User){
    if(this.registerForm.invalid){
      alert('Please fill up the form accurately')
      return;
    }
    else{
      console.log(value);
      this.authService.signUp(value).then(userCredentials=>{
        console.log('this is userCredentials',userCredentials.user.uid)
        this.authService.setUserData(value,userCredentials.user.uid).then(data =>{
          // console.log(data);
          alert("signed up successfully");
          this.registerForm.reset();
          this.router.navigate(['/login'])
        });
      });
    }
  }
back(){
  this.utilService.goBack();
}

}
