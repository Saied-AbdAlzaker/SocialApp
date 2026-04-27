import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  CommentResponse,
  LikeCommentResponse,
  SingleCommentResponse,
} from '../../interface/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private readonly httpClient = inject(HttpClient);

  getPostComments(postId: string): Observable<CommentResponse> {
    return this.httpClient.get<CommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments`,
    );
  }

  createComment(
    postId: string,
    data: object,
  ): Observable<SingleCommentResponse> {
    return this.httpClient.post<SingleCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments`,
      data,
    );
  }

  createReplies(
    postId: string,
    commentId: string,
    data: object,
  ): Observable<SingleCommentResponse> {
    return this.httpClient.post<SingleCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}/replies`,
      data,
    );
  }

  updateComment(
    postId: string,
    commentId: string,
    data: object,
  ): Observable<SingleCommentResponse> {
    return this.httpClient.put<SingleCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
      data,
    );
  }
  deleteComment(
    postId: string,
    commentId: string,
  ): Observable<SingleCommentResponse> {
    return this.httpClient.delete<SingleCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}`,
    );
  }

  likeComment(
    postId: string,
    commentId: string,
  ): Observable<LikeCommentResponse> {
    return this.httpClient.put<LikeCommentResponse>(
      `${environment.baseUrl}/posts/${postId}/comments/${commentId}/like`,
      {},
    );
  }
}
