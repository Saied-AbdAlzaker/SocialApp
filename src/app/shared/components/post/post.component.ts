import { Component, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { Comment, Post } from '../../../features/pages/timeline/models/posts.interface';
import { DatePipe } from '@angular/common';
import { CommentComponent } from "../comment/comment.component";
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../features/pages/timeline/services/comments.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-post',
  imports: [DatePipe, CommentComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {

  post: InputSignal<Post> = input.required();

  commentControl: FormControl = new FormControl(null, Validators.required);

  private readonly commentsService = inject(CommentsService);

  commentPost: WritableSignal<Comment[]> = signal([]);

  ngOnInit(): void {
    this.commentPost.set(this.post().comments);
  }

  submitForm(e: Event): void {
    e.preventDefault();

    if (this.commentControl.valid) {
      let data = {
        content: this.commentControl.value,
        post: this.post()._id
      }

      this.commentsService.createComment(data).subscribe({
        next: (res) => {
          this.commentPost.set(res.comments.reverse());
          this.commentControl.reset();
        }
      })
    }

  }

}
