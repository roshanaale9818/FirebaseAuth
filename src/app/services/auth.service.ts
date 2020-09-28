import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth} from '@angular/fire/auth';
import { User } from './../models/user';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<User>;
  constructor(
    private angularFireAuth:AngularFireAuth,
    private angularFirestore:AngularFirestore,
    private router:Router
  ) {
    //// Get auth data, then get firestore user document || null
    this.user= this.angularFireAuth.authState.pipe(
    switchMap( (user) => {
      if(user){
          return this.angularFirestore.doc<User>(`users/${user.uid}`).valueChanges();
      }
      else{
          return of (null);
      }
    })
  )
  }

//it signinwithemailandpassword method returns a promise
login(email:string,password:string){
    return this.angularFireAuth.signInWithEmailAndPassword(email,password);
}
signUp(user:User){
  return this.angularFireAuth.createUserWithEmailAndPassword(user.email,user.password);
}
setUserData(user:User,uid:string){
  const userRef:AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${uid}`);
  const userdata:User = {
    uid:uid,
    firstName:user.firstName,
    lastName:user.lastName,
    email:user.email,
    password:user.password,
    roles:{
      user:true,
    },
  }
 return userRef.set(userdata,{merge:true});
}

getUserData(uid:string){
  return this.angularFirestore.doc(`users/${uid}`).valueChanges();
}
signOut(){
  this.angularFireAuth.signOut().then(data =>{
    this.router.navigate(['/login']);
  });
}

}

