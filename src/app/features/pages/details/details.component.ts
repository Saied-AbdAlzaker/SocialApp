import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../timeline/services/posts.service';
import { Post } from '../timeline/models/posts.interface';
import { PostComponent } from "../../../shared/components/post/post.component";

@Component({
  selector: 'app-details',
  imports: [PostComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {

  postId: WritableSignal<string | null> = signal(null);
  post: WritableSignal<Post> = signal({} as Post);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly postsService = inject(PostsService);

  ngOnInit(): void {
    this.getSPostId();
    this.getSinglePost();
  }

  getSPostId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.postId.set(params.get('id'));
      }
    })
  }

  getSinglePost(): void {
    this.postsService.getSinglePost(this.postId()).subscribe({
      next: (res) => {
        this.post.set(res.post);
      }
    })
  }


}
