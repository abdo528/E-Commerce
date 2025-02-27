import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const id = inject(PLATFORM_ID)
  if (isPlatformBrowser(id)) {
    const token = localStorage.getItem('userToken')!
    if (localStorage.getItem('userToken') !== null) {
      localStorage.setItem('userId', (jwtDecode(token) as { id: string }).id)
      return true;
    } else {
      inject(Router).navigate(['/login'])
      return false;
    }
  }
  return false
};
