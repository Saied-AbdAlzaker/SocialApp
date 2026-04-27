import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/auth/service/auth.service';
import { Suggestion } from '../../../../core/interface/suggestions.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar-right',
  imports: [RouterLink],
  templateUrl: './sidebar-right.component.html',
  styleUrl: './sidebar-right.component.css',
})
export class SidebarRightComponent implements OnInit {
 suggestionList: Suggestion[] = [];
  followingMap: Record<string, boolean> = {}; // ✅ track per-user state
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.allSuggestions();
  }

  allSuggestions(): void {
    this.authService.getSuggestions().subscribe({
      next: (res) => {
        this.suggestionList = res.data.suggestions;
        // ✅ Initialize each user's follow state to false
        this.suggestionList.forEach(s => this.followingMap[s._id] = false);
      },
    });
  }

  followAndUnfollow(id: string): void {
    this.authService.followUser(id).subscribe({
      next: (res) => {
        this.followingMap[id] = res.data.following; // ✅ update only that user
      },
    });
  }
  
}
