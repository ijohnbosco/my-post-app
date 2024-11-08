import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  users: any[] = [];
  currentUser: any;
  displayedPosts: any[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private dataService: DataService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  loadData() {
    this.dataService.getPosts().subscribe(posts => {
      this.dataService.getUsers().subscribe(users => {
        this.users = users;
        this.posts = posts.map(post => ({
          ...post,
          user: users.find(user => user.id === post.userId)
        }));
        this.updateDisplayedPosts();
      });
    });
  }

  updateDisplayedPosts() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.displayedPosts = this.posts.slice(start, start + this.pageSize);
  }

  navigateToLogin() {
    // Navigate to login page

    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    // Refresh or redirect to the home page
  }

  createNewPost() {
    this.router.navigate(['/post-edit']);
  }

  editPost(post: any) {
    // Navigate to post edit page with post ID
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.updateDisplayedPosts();
    }
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.currentPage--;
      this.updateDisplayedPosts();
    }
  }

  hasNextPage() {
    return this.currentPage * this.pageSize < this.posts.length;
  }

  hasPreviousPage() {
    return this.currentPage > 1;
  }
}
