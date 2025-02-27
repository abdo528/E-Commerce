import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  msgError!: string
  msgSuccess!: string
  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
  })
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  submitLogin(): void {
    if (this.login.valid) {
      this.authService.sendLogin(this.login.value).subscribe({
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
      this.login.markAllAsTouched()
    }
  }
}