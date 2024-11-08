import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post: any = { title: '', body: '', userId: null };
  isEditMode: boolean = false;
  errorMessage: string = '';
  isFormModified: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.post.userId = currentUser.id;

    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.isEditMode = true;
      this.loadPost(parseInt(postId, 10));
    }
  }

  loadPost(postId: number) {
    this.dataService.getPosts().subscribe(posts => {
      const post = posts.find(p => p.id === postId && p.userId === this.post.userId);
      if (post) {
        this.post = { ...post };
      } else {
        this.errorMessage = 'Post not found or you are not authorized to edit this post.';
      }
    });
  }

  savePost() {
    if (this.isEditMode) {
      this.dataService.updatePost(this.post).subscribe(() => {
        alert('Post updated successfully!');
        this.navigateToHome();
      });
    } else {
      this.dataService.addPost(this.post).subscribe(() => {
        alert('New post created successfully!');
        this.navigateToHome();
      });
    }
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.dataService.deletePost(this.post.id).subscribe(() => {
        alert('Post deleted successfully!');
        this.navigateToHome();
      });
    }
  }

  cancel() {
    if (this.isFormModified && confirm('You have unsaved changes. Do you really want to leave?')) {
      this.navigateToHome();
    } else if (!this.isFormModified) {
      this.navigateToHome();
    }
  }

  onFormChange() {
    this.isFormModified = true;
  }

  // Navigate to home page
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
