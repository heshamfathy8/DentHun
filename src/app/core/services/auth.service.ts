import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject(false);
  public isLoggedInSubject$ = this.isLoggedInSubject.asObservable();
  public loginSignal = signal<boolean>(false);
  public updateUser = signal<string>(null);
  public userRole: string;
  public userName: string;
  public userId: string;
  public registerType: string;
  public token;

// private jwtHelper: JwtHelpeanyrService
  constructor() {
    this.updateLoggedInState(
      this.hasToken(),
      this.getName(),
      this.getId(),
      this.getToken(),
      this.getrole(),
    );
  }

  updateLoggedInState(
    status,
    userName: string,
    id,
    token?,
    role?,
  ) {
    if (status && role && userName) {
      this.userName = userName;
      this.userId = id;
      this.token = token;

      localStorage.setItem('token', token);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);
      this.userRole = role;
    }
    this.loginSignal.set(status);
    this.updateUser.set(this.userName);
  }

  extractDataFromToken(token: string) {
    // const decodedToken = this.jwtHelper.decodeToken(token);
    // decodedToken.sub = parseJson(decodedToken.sub);
    // return decodedToken;
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  private getName(): string {
    return localStorage.getItem('userName');
  }

  private getId(): string {
    return localStorage.getItem('userId');
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  private getrole(): string {
    return localStorage.getItem('role');
  }
}
