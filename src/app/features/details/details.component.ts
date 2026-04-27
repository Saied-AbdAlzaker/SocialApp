import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../core/services/Posts/posts.service';
import { SinglePost, UserPost } from '../../core/interface/posts.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);
  postId: string = '';
  userId: string = '';
  postDetails: SinglePost = {} as SinglePost;
  userDetails: UserPost = {} as UserPost;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.postId = param.get('id')!;
    });
    this.getPostDetails();
    this.userId = JSON.parse(localStorage.getItem('userInfo')!)?._id;
  }

  getPostDetails(): void {
    this.postsService.getSinglePost(this.postId).subscribe({
      next: (res) => {
        console.log(res);
        this.postDetails = res.data.post;
        this.userDetails = res.data.post.user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
