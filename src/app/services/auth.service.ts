import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, authState , signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;


  constructor(private afAuth: Auth, private router:Router ) {

    

   }

  login(email:any, id:any){

    signInWithEmailAndPassword (this.afAuth, email, id).then(logRef => {
      alert('Logged In Successfully');
      this.loadUser();
      this.loggedIn.next(true);
      this.isLoggedInGuard = true;
      this.router.navigate(['/']);
    }).catch(e => {
      alert(e);
    })
          
  }
  

   loadUser(){

       authState(this.afAuth).subscribe(user => {
           localStorage.setItem('user', JSON.stringify(user));
       });

   }

   logOut(){

    signOut(this.afAuth).then(()=>{
      alert('User Logged Out Successfully');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    })

   }

   isLoggedIn(){
    return this.loggedIn.asObservable();
   }


}
