import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  msgError!: string
  msgSuccess!: string
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  }, { validators: this.confirmPassword })
  submitRegister(): void {
    if (this.register.valid) {
      this.authService.sendRegister(this.register.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('userToken', res.token)
            this.authService.saveTokenDecode()
            this.msgSuccess = res.message
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 500);
          }
        },
        error: (er: HttpErrorResponse) => {
          this.msgError = er.error.message
        }
      })
    } else {
      this.register.markAllAsTouched()
    }
  }
  confirmPassword(control: AbstractControl) {
    const password = control.get('password')?.value
    const rePassword = control.get('rePassword')?.value
    return password === rePassword ? null : { mismatch: true }
  }
}