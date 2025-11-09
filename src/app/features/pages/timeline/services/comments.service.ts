import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private readonly http = inject(HttpClient);

  createComment(data: any): Observable<any> {
    return this.http.post(`/comments`, data)
  }
  getPostComments(postId: string): Observable<any> {
    return this.http.get(`/posts/${postId}/comments`)
  }
  updateComment(data: any, commentId: string): Observable<any> {
    return this.http.put(`/comments/${commentId}`, data)
  }
  deleteComment(commentId: string): Observable<any> {
    return this.http.delete(`/comments/${commentId}`)
  }


}
