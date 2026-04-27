import { Component, inject } from '@angular/core';
import { Post } from '../../core/interface/posts.interface';
import { PostsService } from '../../core/services/Posts/posts.service';
import { CreatePostComponent } from "../feed/components/create-post/create-post.component";
import { SinglePostComponent } from "../feed/components/single-post/single-post.component";

@Component({
  selector: 'app-my-posts',
  imports: [CreatePostComponent, SinglePostComponent],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent {
   private readonly postsService = inject(PostsService);

  postsList: Post[] = [];

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postsService.getFeedPosts().subscribe({
      next: (res) => {
        if (res.success) {
          this.postsList = res.data.posts;
          console.log(this.postsList);
          
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
