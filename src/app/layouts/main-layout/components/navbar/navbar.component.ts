import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  userName: string = '';
  userImg: string = '';

  private readonly authService = inject(AuthService);
  ngOnInit(): void {
    initFlowbite();

    this.userName = JSON.parse(localStorage.getItem('userInfo')!)?.name;
    this.userImg = JSON.parse(localStorage.getItem('userInfo')!)?.photo;
  }

  logOut(): void {
    this.authService.signOut();
  }
}
