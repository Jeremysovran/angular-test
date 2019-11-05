import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'appareils',
    loadChildren: () => import('./appareils/appareils.module').then(m => m.AppareilsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  { path: 'auth', component: AuthComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '', redirectTo: 'appareils', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
