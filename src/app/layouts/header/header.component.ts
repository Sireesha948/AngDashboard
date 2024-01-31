import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  userEmail: string | undefined;
  isLoggedIn$:  Observable<boolean> | undefined;
  


  constructor(private authService: AuthService){}

  ngOnInit(): void {
    
     let a:any = localStorage.getItem('user');
     a = JSON.parse(a);
     this.userEmail =  a.email;
     this.isLoggedIn$ = this.authService.isLoggedIn();
    


    //console.log(JSON.parse(localStorage.getItem('user')));
   
    
  }
  onLogOut(){
   this.authService.logOut();


  }


}
