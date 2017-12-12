import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginformComponent } from './loginform/loginform.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RouterModule } from '@angular/router';
import { IsLoggedInService } from './services/isLoggedIn.canactivate.service';
import { routes } from './routes';
import { SignupformComponent } from './signupform/signupform.component';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { FileUploadModule } from "ng2-file-upload";
import { ImageUploadModule } from "angular2-image-upload";
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LocationService } from './services/location.service';
import { NewLocationComponent } from './new-location/new-location.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginformComponent,
    HomeComponent,
    UserprofileComponent,
    SignupformComponent,
    LocationListComponent,
    LocationDetailComponent,
    NewLocationComponent

  ],

  imports: [
    BrowserModule,
    FileUploadModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    L_SEMANTIC_UI_MODULE,
    ImageUploadModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, IsLoggedInService, LocationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
