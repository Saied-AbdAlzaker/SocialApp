import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { TimelineComponent } from './features/pages/timeline/timeline.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { DetailsComponent } from './features/pages/details/details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'timeline', pathMatch: 'full' },
    {
        path: '', component: MainLayoutComponent, children: [
            { path: 'timeline', component: TimelineComponent, title: 'Timeline Page' },
            { path: 'profile', component: ProfileComponent, title: 'Profile Page' },
            { path: 'details/:id', component: DetailsComponent, title: 'Post Details Page' },
        ]
    },
    {
        path: '', component: AuthLayoutComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, title: 'Login Page' },
            { path: 'register', component: RegisterComponent, title: 'Register Page' },
        ]
    }
];
