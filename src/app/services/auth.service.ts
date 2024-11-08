import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private currentUser:any = null;
  constructor() { }

  login(user:any){
    this.currentUser=user;
    localStorage.setItem("user",JSON.stringify(user));
  }
  
  setCurrentUser(user:any){
    this.currentUser=user;
    localStorage.setItem("user",JSON.stringify(user));
  }

  logout(){
    this.currentUser=null;
    localStorage.removeItem("user");
  }

  getCurrentUser(){
    if(!this.currentUser){
      return JSON.parse(localStorage.getItem("user") || "null");
    }
    return this.currentUser;
  }

  isLoggedIn(){
    return !!this.getCurrentUser();
  }
}
