import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: '**', redirectTo:'signin' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthRoutingModule { }
