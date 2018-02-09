import { LibraryComponent } from './library/library.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormComponent } from './library/form/form.component';
import { HomepageComponent } from './library/homepage/homepage.component';
import { SingleMovieComponent } from './library/single-movie/single-movie.component';

import { AuthGuard } from './auth/guards/auth-guard.service';
import { UnAuthGuard } from './auth/guards/unauth-guard.service';

export const router:Routes = [
    { path: '', redirectTo:'library', pathMatch:'full'},
    { path: 'library', component:LibraryComponent ,children:[
        { path:'movie/:id',component:SingleMovieComponent }
    ]},
    { path: 'movie', children:[
        { path: 'add', component:FormComponent, canActivate:[AuthGuard] },
        { path: 'edit/:id', component:FormComponent, canActivate:[AuthGuard] }
    ]},
    { path: 'auth', children:[
        { path: '', redirectTo:'login', pathMatch:'full'},
        { path: 'login', component:LoginComponent, canActivate:[UnAuthGuard]},
        { path: 'signup', component:SignupComponent, canActivate:[UnAuthGuard]}
    ]}
];

export const routes:ModuleWithProviders = RouterModule.forRoot(router);