import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../features/auth/services/auth.service';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, Dialog],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: []
})
export class NavbarComponent {

  visible: boolean = false;
  private readonly auth = inject(AuthService);

  showDialog() {
    this.visible = true;
  }

  signout(): void {
    this.auth.logout();
  }

}
