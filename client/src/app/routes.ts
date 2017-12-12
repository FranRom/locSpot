import { Routes } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {LoginformComponent} from './loginform/loginform.component';
import {SignupformComponent} from './signupform/signupform.component';
import {LocationListComponent } from './location-list/location-list.component';
import {LocationDetailComponent } from './location-detail/location-detail.component';
import {NewLocationComponent} from './new-location/new-location.component';

import {IsLoggedInService} from './services/isLoggedIn.canactivate.service';
import {LocationService} from './services/location.service';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'user',  component: UserprofileComponent,canActivate: [ IsLoggedInService ]  },
    { path: 'login',  component: LoginformComponent,  },
    { path: 'signup',  component: SignupformComponent,  },
    { path: 'explore', component: LocationListComponent},
    { path: 'explore/:id', component: LocationDetailComponent},
    { path: 'newlocation', component: NewLocationComponent},
    { path: '**', redirectTo: '' }
];
