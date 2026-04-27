import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import {
  BookMarkPost,
  LikePost,
  PostList,
  SharePostRes,
  SinglePostResponse,
} from '../../interface/posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly httpClient = inject(HttpClient);

  getAllPosts(): Observable<PostList> {
    return this.httpClient.get<PostList>(`${environment.baseUrl}/posts`);
  }
  getFeedPosts(): Observable<PostList> {
    return this.httpClient.get<PostList>(
      `${environment.baseUrl}/posts/feed?only=following&limit=10`,
    );
  }
  createPost(data: object): Observable<PostList> {
    return this.httpClient.post<PostList>(`${environment.baseUrl}/posts`, data);
  }
  getSinglePost(postId: string): Observable<SinglePostResponse> {
    return this.httpClient.get<SinglePostResponse>(
      `${environment.baseUrl}/posts/${postId}`,
    );
  }
  updatePost(postId: string, data: object): Observable<SinglePostResponse> {
    return this.httpClient.put<SinglePostResponse>(
      `${environment.baseUrl}/posts/${postId}`,
      data,
    );
  }
  deletePost(postId: string): Observable<SinglePostResponse> {
    return this.httpClient.delete<SinglePostResponse>(
      `${environment.baseUrl}/posts/${postId}`,
    );
  }

  getPostLikes(postId: string): Observable<SinglePostResponse> {
    return this.httpClient.get<SinglePostResponse>(
      `${environment.baseUrl}/posts/${postId}/likes?page=1&limit=20`,
    );
  }

  bookmarkPost(postId: string): Observable<BookMarkPost> {
    return this.httpClient.put<BookMarkPost>(
      `${environment.baseUrl}/posts/${postId}/bookmark`,
      {},
    );
  }
  sharePost(postId: string, data: object): Observable<SharePostRes> {
    return this.httpClient.post<SharePostRes>(
      `${environment.baseUrl}/posts/${postId}/share`,
      data,
    );
  }
  likePost(postId: string): Observable<LikePost> {
    return this.httpClient.put<LikePost>(
      `${environment.baseUrl}/posts/${postId}/like`,
      {},
    );
  }
}
