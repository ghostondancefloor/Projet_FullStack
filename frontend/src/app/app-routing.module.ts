import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component'; // Import CalendarComponent
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuard } from './helpers/auth.guard'; // We'll create this later

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'calendar', component: CalendarComponent,  canActivate: [AuthGuard] }, // Add route for calendar
  // Redirect any unknown paths to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
