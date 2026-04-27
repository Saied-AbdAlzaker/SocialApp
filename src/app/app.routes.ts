import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { ProfileComponent } from './features/profile/profile.component';
import { NotificationComponent } from './features/notification/notification.component';
import { ChangePasswordComponent } from './features/change-password/change-password.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { userGuard } from './core/auth/guards/user.guard';
import { DetailsComponent } from './features/details/details.component';
import { FeedContentComponent } from './features/feed/feed-content.component';
import { MyPostsComponent } from './features/my-posts/my-posts.component';
import { SavePostComponent } from './features/save-post/save-post.component';
import { SuggestionComponent } from './features/suggestion/suggestion.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [userGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'Login Page.' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page.',
      },
      {
        path: 'forget-password',
        component: ForgotPasswordComponent,
        title: 'Forget-Password Page.',
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'feed', component: FeedContentComponent, title: 'Posts Page.' },
      { path: 'posts', component: MyPostsComponent, title: 'Community Page.' },
      { path: 'save-post', component: SavePostComponent, title: 'post likes Page.' },
      { path: 'profile', component: ProfileComponent, title: 'Profile Page.' },
      { path: 'suggestion/:id', component: SuggestionComponent, title: 'Suggestion Friends Page.' },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page.',
      },
      {
        path: 'notification',
        component: NotificationComponent,
        title: 'Notification Page.',
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        title: 'Change Password Page.',
      },
    ],
  },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found.' },
];
 