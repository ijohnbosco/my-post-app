import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}

  // Called when the user clicks the Log In button
  login() {
    // Check if username is provided
    if (!this.username.trim()) {
      this.errorMessage = 'Please enter a username.';
      return;
    }

    // Fetch users and validate username
    this.dataService.getUsers().subscribe(users => {
      const user = users.find(u => u.username === this.username);

      if (user) {
        this.authService.setCurrentUser(user); // Set the logged-in user
        this.router.navigate(['/home']); // Navigate to home on successful login
      } else {
        this.errorMessage = 'User not found. Please enter a valid username.';
      }
    });
  }

  // Check if the Log In button should be disabled
  isLoginDisabled() {
    return !this.username.trim();
  }
}
