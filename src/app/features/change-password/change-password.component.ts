import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/service/auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  changePasswordForm: FormGroup = this.fb.group({
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        ),
      ],
    ],
    newPassword: [
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
  changePasswordSubscribe: Subscription = new Subscription();

  submitForm() {
    if (this.changePasswordForm.valid) {
      this.loading = true;
      console.log(this.changePasswordForm);
      this.changePasswordSubscribe.unsubscribe();

      this.changePasswordSubscribe = this.authService
        .changePassword(this.changePasswordForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            
            if (res.success) {
              // save token and user in localStorage
              localStorage.setItem('socialToken', res.data.token);

              // navigate to login
              this.router.navigate(['/login']);
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
      this.changePasswordForm.markAllAsTouched();
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
