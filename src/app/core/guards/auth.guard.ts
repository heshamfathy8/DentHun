import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { LoginService } from '@login/services/login.service';

export function AuthGuard(role?): CanActivateFn {
  return () => {
    const authService: AuthService = inject(AuthService);
    const loginService: LoginService = inject(LoginService);
    if (authService.loginSignal()) {
      return true;
    }
    loginService.logout();
    return false;
  };
}
