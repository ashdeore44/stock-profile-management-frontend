import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  userExist():boolean{
  return localStorage.getItem('userName')!==null;
  }

   userLogout():void{
   localStorage.removeItem('userName');
   this.router.navigate(['/login']);
    }
}
