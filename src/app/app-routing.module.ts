import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: 'login', component: LoginComponent }, // Route to the LoginComponent
  { path: 'dashboard', component: DashboardComponent } // Route to the DashboardComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
