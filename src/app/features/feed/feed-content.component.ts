import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { PostsService } from '../../core/services/Posts/posts.service';
import { Post } from '../../core/interface/posts.interface';


@Component({
  selector: 'app-feed-content',
  imports: [
    ReactiveFormsModule,
    CreatePostComponent,
    SinglePostComponent,
  ],
  templateUrl: './feed-content.component.html',
  styleUrl: './feed-content.component.css',
})
export class FeedContentComponent implements OnInit {
  private readonly postsService = inject(PostsService);

  postsList: Post[] = [];

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts() {
    this.postsService.getAllPosts().subscribe({
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
