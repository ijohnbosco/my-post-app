import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostEditComponent } from './post-edit/post-edit.component';

const routes: Routes = [
{path:'',redirectTo: '/home', pathMatch: 'full'},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'post-edit',component:PostEditComponent},
{path:'post-edit/:id',component:PostEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
