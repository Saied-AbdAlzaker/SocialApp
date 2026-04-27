import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/interface/user-profile.interface';
import { AuthService } from '../../core/auth/service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-suggestion',
  imports: [],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css',
})
export class SuggestionComponent implements OnInit {
  friend: User = {} as User;
  userId: string = '';
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((params) =>
          this.authService.getUserProfile(params.get('id')!),
        ),
      )
      .subscribe((res) => (this.friend = res.data.user));
  }

}
