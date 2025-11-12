import { Component, inject, input, InputSignal, signal } from '@angular/core';
import { Comment } from '../../../features/pages/timeline/models/posts.interface';
import { DatePipe } from '@angular/common';
import { CommentsService } from '../../../features/pages/timeline/services/comments.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-comment',
  imports: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css',
  providers: [MessageService]
})
export class CommentComponent {

  comment: InputSignal<Comment> = input.required();
  private readonly commentsService = inject(CommentsService);
  private readonly messageService = inject(MessageService);

  deleteComment(id: string): void {
    this.commentsService.deleteComment(id).subscribe({
      next: (res) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: res.message });
      }, error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    })
  }

}
