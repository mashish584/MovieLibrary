import { LibraryService } from './services/library.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LibraryComponent } from './library/library.component';
import { HomepageComponent } from './library/homepage/homepage.component';
import { FormComponent } from './library/form/form.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoaderComponent } from './loader/loader.component';
import { SingleMovieComponent } from './library/single-movie/single-movie.component';

import { routes } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth/guards/auth-guard.service';
import { UnAuthGuard } from './auth/guards/unauth-guard.service';

export const config = {
  apiKey: "##############",
  authDomain: "##############",
  databaseURL: "##############",
  projectId: "##############",
  storageBucket: "##############",
  messagingSenderId: "##############"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LibraryComponent,
    HomepageComponent,
    FormComponent,
    SignupComponent,
    LoaderComponent,
    SingleMovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    InfiniteScrollModule,
    routes,
  ],
  providers: [AuthService,AuthGuard,UnAuthGuard,LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
