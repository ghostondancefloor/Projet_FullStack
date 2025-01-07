import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isSidebarCollapsed: boolean = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isSidebarCollapsed = screenWidth <= 768; // Collapse for small screens
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.storageService.clearUser();
        this.isLoggedIn = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error during logout:', err);
        this.router.navigate(['/']);
      },
    });
  }
}
