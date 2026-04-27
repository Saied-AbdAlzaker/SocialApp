import { Component, inject, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentsService } from '../../../../core/services/Comments/comments.service';
import { Comment } from '../../../../core/interface/comment.interface';
import { Post } from '../../../../core/interface/posts.interface';

@Component({
  selector: 'app-comment-post',
  imports: [ReactiveFormsModule],
  templateUrl: './comment-post.component.html',
  styleUrl: './comment-post.component.css',
})
export class CommentPostComponent implements OnInit {
  userImg: string = '';
  userName: string = '';
  like: boolean = false;
  isOpen: boolean = false;
  errorMsg: string = '';

  @Input() postData: Post = {} as Post;
  commentList: Comment[] = [];
  commentControl: FormControl = new FormControl('', [Validators.required]);
  private readonly commentService = inject(CommentsService);

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userInfo')!);
    this.userName = user?.name;
    this.userImg = user?.photo;
    this.getAllPostComments();
  }

  getAllPostComments(): void {
    this.commentService.getPostComments(this.postData._id).subscribe({
      next: (res) => {
        this.commentList = res.data.comments;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // create comment
  submitCommentForm(e: SubmitEvent): void {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', this.commentControl.value);

    this.commentService.createComment(this.postData._id, formData).subscribe({
      next: (res) => {
        if (res.success) {
          this.commentControl.reset();
          this.getAllPostComments();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // update comment
  submitUpdateCommentForm(e: SubmitEvent): void {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', this.commentControl.value);

    this.commentService
      .updateComment(this.postData._id, this.postData.topComment?._id, formData)
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.isOpen = false;
            this.getAllPostComments();
            this.commentControl.reset();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  // LikeComment
  likeComment(commentId: string): void {
    this.commentService.likeComment(this.postData._id, commentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.like = res.data.liked;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Delete
  deleteComment(commentId: string): void {
    this.commentService.deleteComment(this.postData._id, commentId).subscribe({
      next: (res) => {
        if (res.success) {
          this.getAllPostComments();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // Open popup
  openEditPopup(): void {
    this.commentControl.setValue(this.postData.topComment?.content ?? '');
    this.errorMsg = '';
    this.isOpen = true;
  }

  handleClose(): void {
    this.isOpen = false;
    this.errorMsg = '';
  }
}
