import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
declare let AOS: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedIn: boolean = false; 
  private subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    AOS.init();
  }

  ngOnInit(): void {
    this.subscription = this.authService
      .getLoggedInStatus()
      .subscribe((status: boolean) => {
        this.loggedIn = status;
        console.log('HomeComponent - LoggedIn status:', this.loggedIn); // نتأكد إن الحالة بتتغير
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
