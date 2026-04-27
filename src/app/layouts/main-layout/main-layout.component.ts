import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarLeftComponent } from "./components/sidebar-left/sidebar-left.component";
import { SidebarRightComponent } from "./components/sidebar-right/sidebar-right.component";

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, SidebarLeftComponent, RouterOutlet, SidebarRightComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
