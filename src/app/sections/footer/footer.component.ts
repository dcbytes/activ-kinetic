import { Component, OnInit } from '@angular/core';
import { NavLinkComponent } from '../../components/nav-link/nav-link.component';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NavLinkComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  constructor(private readonly router: Router) {}
  ngOnInit(): void {
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }

  private observer!: IntersectionObserver;

  private routeSubscription!: Subscription;
  currentRoute: string = this.router.url;
  // Declare the nav links
  navLinks = [
    { link: '#despre', text: 'Despre', icon: 'pi pi-info-circle' },
    { link: '#tratamente', text: 'Tratamente', icon: 'pi pi-plus-circle' },
    { link: '#evaluare', text: 'Evaluare', icon: 'pi pi-check-square' },
  ];
}
