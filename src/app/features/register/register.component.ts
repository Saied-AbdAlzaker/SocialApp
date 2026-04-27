import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../core/auth/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          ),
        ],
      ],
      rePassword: ['', [Validators.required]],
    },
    { validators: [this.confirmPassword] },
    // {updateOn:"submit"}
  );

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    if (rePassword !== password && rePassword !== '') {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    return null;
  }

  msgError: string = '';
  loading: boolean = false;
  registerSubscribe: Subscription = new Subscription();

  submitForm() {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log(this.registerForm);
      this.registerSubscribe.unsubscribe();

      this.registerSubscribe = this.authService
        .signUp(this.registerForm.value)
        .subscribe({
          next: (res) => {
            if (res.success) {
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
      this.registerForm.markAllAsTouched();
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
