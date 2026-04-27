import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../../../../core/services/Posts/posts.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  private readonly postsService = inject(PostsService);
  @Output() allPosts = new EventEmitter();

  content: FormControl = new FormControl('');
  privacy: FormControl = new FormControl('public');

  userId: string = '';
  userName: string = '';
  userImg: string = '';
  saveFile!: File;
  imgUrl: string | ArrayBuffer | null | undefined;
  imgAlt!: string;

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('userInfo')!);
    this.userId = user?._id;
    this.userName = user?.name;
    this.userImg = user?.photo;
  }

  // upload file
  changeFile(imgInfo: Event) {
    const imgInput = imgInfo.target as HTMLInputElement;
    if (imgInput.files && imgInput.files.length > 0) {
      this.saveFile = imgInput.files[0];
      this.imgAlt = this.saveFile.name;
      this.showFile();
    }
  }
  // show file
  showFile() {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.saveFile);
    fileReader.onload = (e: ProgressEvent<FileReader>) => {
      this.imgUrl = e.target?.result;
    };
  }

  submitForm(e: Event, form: HTMLFormElement) {
    e.preventDefault();
    // formData
    const formData = new FormData();
    if (this.content.value) {
      formData.append('body', this.content.value);
    }
    if (this.privacy.value) {
      formData.append('privacy', this.privacy.value);
    }
    if (this.saveFile) {
      formData.append('image', this.saveFile);
    }
    // call api create post
    this.postsService.createPost(formData).subscribe({
      next: (res) => {
        if (res.success) {
          form.reset();
          this.imgUrl = '';
          this.allPosts.emit();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  close() {
    this.imgUrl = '';
  }
}
