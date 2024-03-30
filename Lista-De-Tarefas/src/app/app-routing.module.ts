import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { RegisterComponent } from './security/register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent},

  {path: 'register', component:RegisterComponent},
  
  {
    path:'dashboard', component:LayoutComponent, canActivate: [AuthGuard]
  },
  
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
