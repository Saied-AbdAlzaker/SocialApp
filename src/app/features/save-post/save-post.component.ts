import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './../../core/auth/service/auth.service';
import { Bookmark } from '../../core/interface/bookmarks.interface';

@Component({
  selector: 'app-save-post',
  imports: [],
  templateUrl: './save-post.component.html',
  styleUrl: './save-post.component.css',
})
export class SavePostComponent implements OnInit {
  bookmarks: Bookmark[] = [];
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.getAllBookmark();
  }

  getAllBookmark(): void {
    this.authService.getBookmarks().subscribe({
      next: (res) => {
        console.log(res);
        this.bookmarks = res.data.bookmarks;
      },
    });
  }
}
