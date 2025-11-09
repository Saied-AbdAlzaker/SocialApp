import { Component, ElementRef, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { initFlowbite, Modal } from 'flowbite';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostsService } from '../../../features/pages/timeline/services/posts.service';

@Component({
  selector: 'app-create-post',
  imports: [ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  
  saveFile: WritableSignal<File | null> = signal(null);
  myModal = viewChild<ElementRef>('modal');
  private readonly postsService = inject(PostsService);

  content: FormControl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    initFlowbite();
  }

  changeImage(e: Event): void {
    let inputFile = e.target as HTMLInputElement; // element
    if (inputFile.files && inputFile.files.length > 0) {
      this.saveFile.set(inputFile.files[0]);
    }
  }

  submitForm(e: Event): void {
    e.preventDefault();

    if (this.content.value) {
      const formData = new FormData();
      formData.append('body', this.content.value);
      let file = this.saveFile();
      if (file) {
        formData.append('image', file, file.name);
      }
      console.log(this.content.value);
      console.log(this.saveFile());

      this.postsService.createPost(formData).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            new Modal(this.myModal()?.nativeElement).hide();
            // getPosts
          }

        }
      })

    }
  }

}
