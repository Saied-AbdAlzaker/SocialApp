import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/auth/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.email, Validators.minLength(3)],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
      ],
    ],
  });

  msgError: string = '';
  loading: boolean = false;
  loginSubscribe: Subscription = new Subscription();

  submitForm() {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm);
      this.loginSubscribe.unsubscribe();

      this.loginSubscribe = this.authService
        .signIn(this.loginForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);

            if (res.success) {
              // save token and user in localStorage
              localStorage.setItem('socialToken', res.data.token);
              localStorage.setItem('userInfo', JSON.stringify(res.data.user));
              console.log(res);

              // navigate to login
              this.router.navigate(['/feed']);
            }
          },
          error: (err: HttpErrorResponse) => {
            this.msgError = err.error.message;
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  // Show Password
  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }
}
