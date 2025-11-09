import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:WritableSignal<any> = signal(null);

  private readonly http = inject(HttpClient);
  private readonly id = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  constructor() {
    if (isPlatformBrowser(this.id)) {
      if (localStorage.getItem('token') !== null) {
        this.userInfo();
      }
    }
  }

  userInfo() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.user.set(decoded);
  }

  signin(data: any): Observable<any> {
    return this.http.post(`/users/signin`, data)
  }
  signup(data: any): Observable<any> {
    return this.http.post(`/users/signup`, data)
  }
  changePasword(data: any): Observable<any> {
    return this.http.patch(`/users/change-password`, data)
  }
  uploadPhoto(data: any): Observable<any> {
    return this.http.put(`/users/upload-photo`, data)
  }
  profileData(): Observable<any> {
    return this.http.get(`/users/profile-data`)
  }

  logout() {
    localStorage.clear();
    this.user.set(null);
    this.router.navigate(['/login']);
  }

}
