import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Router } from '@angular/router';
import { ProfileResponse } from '../../interface/profile.interface';
import { BookmarksResponse } from '../../interface/bookmarks.interface';
import {
  FollowUnFollowResponse,
  SuggestionsResponse,
} from '../../interface/suggestions.interface';
import { UserProfileResponse } from '../../interface/user-profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  signUp(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signup`, data);
  }

  signIn(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/users/signin`, data);
  }

  changePassword(data: object): Observable<any> {
    return this.httpClient.patch(
      `${environment.baseUrl}/users/change-password`,
      data,
    );
  }

  signOut(): void {
    localStorage.removeItem('socialToken');
    this.router.navigate(['/login']);
  }

  uploadPhoto(data: object): Observable<ProfileResponse> {
    return this.httpClient.patch<ProfileResponse>(
      `${environment.baseUrl}/users/upload-photo`,
      data,
    );
  }

  getProfile(): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(
      `${environment.baseUrl}/users/profile-data`,
    );
  }

  getBookmarks(): Observable<BookmarksResponse> {
    return this.httpClient.get<BookmarksResponse>(
      `${environment.baseUrl}/users/bookmarks`,
    );
  }

  getSuggestions(): Observable<SuggestionsResponse> {
    return this.httpClient.get<SuggestionsResponse>(
      `${environment.baseUrl}/users/suggestions?limit=10`,
    );
  }

  getUserProfile(userId: string): Observable<UserProfileResponse> {
    return this.httpClient.get<UserProfileResponse>(
      `${environment.baseUrl}/users/${userId}/profile`,
    );
  }

  followUser(userId: string): Observable<FollowUnFollowResponse> {
    return this.httpClient.put<FollowUnFollowResponse>(
      `${environment.baseUrl}/users/${userId}/follow`,
      {},
    );
  }

  getUserPosts(userId: string): Observable<ProfileResponse> {
    return this.httpClient.get<ProfileResponse>(
      `${environment.baseUrl}/users/${userId}/posts`,
    );
  }
}
