import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit{

  private readonly auth = inject(AuthService);

  ngOnInit(): void {
    initFlowbite();
  }

  signout():void{
    this.auth.logout();
  }

}
