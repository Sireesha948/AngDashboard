import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.isLoggedInGuard){
    
     return true;
  }
  else{

    alert('You dont have permission to access this page');
    router.navigate(['/login']);
     return false;
   }


  
};
