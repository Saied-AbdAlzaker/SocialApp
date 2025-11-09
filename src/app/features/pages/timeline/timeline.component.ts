import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { CreatePostComponent } from "../../../shared/components/create-post/create-post.component";
import { PostComponent } from "../../../shared/components/post/post.component";
import { PostsService } from './services/posts.service';
import { Post } from './models/posts.interface';

@Component({
  selector: 'app-timeline',
  imports: [CreatePostComponent, PostComponent],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css',
})
export class TimelineComponent implements OnInit{

  allPosts:WritableSignal<Post[]> = signal([]);
  private readonly postsService = inject(PostsService);

  ngOnInit(): void {
      this.getAllPosts();
  }

  getAllPosts():void{
    this.postsService.getAllPosts().subscribe({
      next:(res)=>{
        this.allPosts.set(res.posts);
      }
    })
  }

}
