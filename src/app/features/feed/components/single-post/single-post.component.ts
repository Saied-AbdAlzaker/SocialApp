import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../../../../core/interface/posts.interface';
import { PostsService } from '../../../../core/services/Posts/posts.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommentPostComponent } from '../comment-post/comment-post.component';

@Component({
  selector: 'app-single-post',
  imports: [RouterLink, ReactiveFormsModule, CommentPostComponent],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.css',
})
export class SinglePostComponent implements OnInit {
  userId: string = '';
  userName: string = '';
  userImg: string = '';

  // Popup state
  isOpen: boolean = false;
  isOpenShare: boolean = false;

  // Form controls
  content: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');
  contentSharePost: FormControl = new FormControl('');

  // Loading / error state
  isSubmitting: boolean = false;
  errorMsg: string = '';

  bookmarkPost: boolean = false;
  like: boolean = false;

  @Input() postData: Post = {} as Post;
  @Output() allPosts = new EventEmitter();

  private readonly postsService = inject(PostsService);

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
    this.userId = userInfo?._id;
    this.userName = userInfo?.name;
    this.userImg = userInfo?.photo;
  }

  // Open popup
  openEditPopup(): void {
    this.content.setValue(this.postData.body ?? '');
    this.privacy.setValue(this.postData.privacy ?? 'public');
    this.errorMsg = '';
    this.isOpen = true;
  }

  handleClose(): void {
    this.isOpen = false;
    this.errorMsg = '';
  }

  // Submit update
  submitForm(event: Event, form: HTMLFormElement): void {
    event.preventDefault();

    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMsg = '';

    const postId = this.postData._id;
    const formData = new FormData();

    formData.append('body', this.content.value ?? '');
    formData.append('privacy', this.privacy.value ?? 'public');

    this.postsService.updatePost(postId, formData).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        if (res.success) {
          this.isOpen = false;
          this.allPosts.emit(); // refresh parent list
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMsg =
          err?.error?.message ?? 'Something went wrong. Please try again.';
        console.error(err);
      },
    });
  }

  // Delete
  deletepostData(id: string): void {
    this.postsService.deletePost(id).subscribe({
      next: (res) => {
        if (res.success) {
          this.allPosts.emit();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  // savePost
  savePost(): void {
    this.postsService.bookmarkPost(this.postData._id).subscribe({
      next: (res) => {
        console.log(res);
        this.bookmarkPost = res.data.bookmarked;
        this.allPosts.emit();
      },
    });
  }
  // likePost
  likePost(): void {
    this.postsService.likePost(this.postData._id).subscribe({
      next: (res) => {
        console.log(res);
        this.like = res.data.liked;
        this.allPosts.emit();
      },
    });
  }
  // sharePost
  openSharePost(): void {
    // this.content.setValue(this.postData.body ?? '');
    this.errorMsg = '';
    this.isOpenShare = true;
  }
  submitSharePost(e: Event, formShare: HTMLFormElement) {
    e.preventDefault();
    // formData
    const postId = this.postData._id;
    const formData = new FormData();
    if (this.contentSharePost.value) {
      formData.append('body', this.contentSharePost.value);
    }
    // call api Share post
    this.postsService.sharePost(postId, formData.values).subscribe({
      next: (res) => {
        if (res.success) {
          formShare.reset();
          this.isOpenShare = false;
          this.allPosts.emit();
          console.log(res);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
