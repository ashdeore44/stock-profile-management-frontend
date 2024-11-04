import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  userName = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {

  if (this.loginForm.valid) {
          const { userName, password } = this.loginForm.value;
          this.authService.login(userName, password).subscribe(

          (res: any) => {
          localStorage.setItem('userName',res?.userName);
          alert('login successful');
          this.router.navigate(['/portfolio'], { queryParams: { userName: userName } });

          },
          (err) => {
                alert('login failed');
          }

      );
    }
  }
}
