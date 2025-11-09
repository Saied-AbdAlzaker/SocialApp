import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  errMessage: string = '';
  loading: boolean = false;
  dateVlue: Date | undefined;
  subscription: Subscription = new Subscription();

  constructor(private auth: AuthService, private router: Router) { }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
  }, this.confirmPassword)

  // custom-validation
  confirmPassword(form: AbstractControl) {
    const password = form.get('password')?.value;
    const rePassword = form.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true }
    }

  }

  submitForm() {
    this.loading = true;
    if (this.registerForm.valid) {
      this.subscription.unsubscribe();
      this.subscription = this.auth.signup(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === "success") {
            this.router.navigate(['/login'])
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errMessage = err.error.error;
        }
      })
    } else {
      this.registerForm.setErrors({ 'mismatch': true });
      this.registerForm.markAllAsTouched();
    }
  }

  gender: any[] = [
    { name: 'male', key: 'A' },
    { name: 'female', key: 'B' },
  ];

}
