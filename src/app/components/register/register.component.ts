import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { userName, password, email } = this.registerForm.value;
      this.authService.register(userName, password, email).subscribe(
        () => {
          alert('Registration successful');
           localStorage.setItem('userName',userName);
          this.router.navigate(['/login']);
        },
        (err) => {
          alert('Registration failed');
        }
      );
    }
  }
}
