import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private postsUrl = "https://jsonplaceholder.typicode.com/posts";
  private usersUrl = "https://jsonplaceholder.typicode.com/users";
  private posts: any[] = [];
  constructor(private http:HttpClient) { }

  getPosts(): Observable<any[]> {
    if (this.posts.length) {
      return of(this.posts);
    } else {
      return this.http.get<any[]>(this.postsUrl).pipe(
        tap((posts) => (this.posts = posts)) // Cache the posts locally
      );
    }
  }

  // Fetch all users from the API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl);
  }

  // Add a new post locally and update in-memory array
  addPost(newPost: any): Observable<any> {
    // Assign a new ID (increment based on the max ID in posts array)
    const maxId = this.posts.length > 0 ? Math.max(...this.posts.map(post => post.id)) : 0;
    newPost.id = maxId + 1;

    this.posts.unshift(newPost); // Add new post at the start of the array
    return of(newPost); // Return the new post as an observable
  }

  // Update an existing post locally
  updatePost(updatedPost: any): Observable<any> {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = { ...updatedPost }; // Update the post in the array
    }
    return of(updatedPost); // Return the updated post as an observable
  }

  // Delete a post locally
  deletePost(postId: number): Observable<any> {
    const index = this.posts.findIndex(post => post.id === postId);
    if (index !== -1) {
      this.posts.splice(index, 1); // Remove the post from the array
    }
    return of({ success: true }); // Return a success message
  }  
}
