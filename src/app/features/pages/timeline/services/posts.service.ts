import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {

  private readonly http = inject(HttpClient);

  createPost(data: any): Observable<any> {
    return this.http.post(`/posts`, data);
  }
  getAllPosts(): Observable<any> {
    return this.http.get(`/posts?limit=50`);
  }
  getUserPosts(userId: string): Observable<any> {
    return this.http.get(`/users/${userId}/posts?limit=2`);
  }
  getSinglePost(userId: string|null): Observable<any> {
    return this.http.get(`/posts/${userId}`);
  }
  updatePost(data: any, postId: string): Observable<any> {
    return this.http.put(`/posts/${postId}`, data);
  }
  deletePost(postId: string): Observable<any> {
    return this.http.delete(`/posts/${postId}`);
  }


}
