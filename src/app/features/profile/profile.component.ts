import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../core/interface/profile.interface';
import { AuthService } from '../../core/auth/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User = {} as User;
  private readonly authService = inject(AuthService);

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user = res.data.user;
        console.log(res);
        
      },
    });
  }
}
