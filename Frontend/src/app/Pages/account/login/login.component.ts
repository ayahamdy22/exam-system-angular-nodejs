// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, FormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   credentials = { email: '', password: '' };
//   errorMessage: string | null = null;
//   successMessage: string | null = null;

//   constructor(private authService: AuthService, private router: Router) {}

//   onSubmit(): void {
//     this.errorMessage = null;
//     this.successMessage = null;

//     this.authService.login(this.credentials).subscribe({
//       next: () => {
//         this.successMessage = 'Login successful! Redirecting...';
//         setTimeout(() => {
//           this.router.navigate(['/exam-list']);
//         }, 2000);
//       },
//       error: (err) => {
//         this.errorMessage =
//           err.error.message || 'Login failed. Please try again.';
//       },
//     });
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response); // نتأكد إن الـ role بيترجع من الـ backend
        this.successMessage = 'Login successful! Redirecting...';
        setTimeout(() => {
          if (response.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        }, 2000);
      },
      error: (err) => {
        this.errorMessage =
          err.error.message || 'Login failed. Please try again.';
      },
    });
  }
}
