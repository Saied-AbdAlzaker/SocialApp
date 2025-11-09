import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  errMessage: string = '';
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router) { }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]),
  })

  submitForm() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.subscription.unsubscribe();
      this.subscription = this.auth.signin(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            localStorage.setItem('token',res.token)
            this.router.navigate(['/timeline'])
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errMessage = err.error.error;
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
