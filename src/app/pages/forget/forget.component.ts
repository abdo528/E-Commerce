import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget',
  imports: [ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {
  step: number = 1
  private readonly _authService = inject(AuthService)
  private readonly router = inject(Router)
  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })
  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)])
  })
  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  })
  verifyEmailSubmit(): void {
    const emailValue = this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailValue)
    this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg === 'success') {
          this.step = 2
        }
      }
    })
  }
  verifyCodeSubmit(): void {
    this._authService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.step = 3
        }
      }
    })
  }
  resetPasswordSubmit(): void {
    this._authService.setResetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        localStorage.setItem('userToken', res.token)
        this._authService.saveTokenDecode()
        this.router.navigate(['/home'])
      }
    })
  }
}
