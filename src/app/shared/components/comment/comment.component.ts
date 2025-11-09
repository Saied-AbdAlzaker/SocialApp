import { Component, input, InputSignal, signal } from '@angular/core';
import { Comment } from '../../../features/pages/timeline/models/posts.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
})
export class CommentComponent {

  comment: InputSignal<Comment> = input.required()

}
