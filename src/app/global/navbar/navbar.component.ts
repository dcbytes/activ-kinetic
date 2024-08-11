import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { NavLinkComponent } from '../../components/nav-link/nav-link.component';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NavLinkComponent, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private readonly router: Router) {}

  private routeSubscription!: Subscription;
  currentRoute: string = this.router.url;

  lastScrollTop: number = 0;
  isScrolled: boolean = false;

  // Declare the nav links
  navLinks = [
    { link: '#despre', text: 'Despre', icon: 'pi pi-info-circle' },
    { link: '#tratamente', text: 'Tratamente', icon: 'pi pi-plus-circle' },
    { link: '#evaluare', text: 'Evaluare', icon: 'pi pi-check-square' },
  ];

  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
    this.lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
  }
}
