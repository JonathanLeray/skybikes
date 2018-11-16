import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {StationListComponent} from './station-list/station-list.component';
import {StationFormComponent} from './station-list/station-form/station-form.component';
import {SingleStationComponent} from './station-list/single-station/single-station.component';
import {BikeListComponent} from './bike-list/bike-list.component';
import {BikeFormComponent} from './bike-list/bike-form/bike-form.component';
import {SingleBikeComponent} from './bike-list/single-bike/single-bike.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './user-list/user-form/user-form.component';
import {SingleUserComponent} from './user-list/single-user/single-user.component';
import {HeaderComponent} from './header/header.component';
import {AuthService} from './services/auth.service';
import {StationsService} from './services/stations.service';
import {AuthGuardService} from './services/auth-guard.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AngularFontAwesomeModule} from 'angular-font-awesome';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'bikes', canActivate: [AuthGuardService], component: BikeListComponent },
  { path: 'bikes/new', canActivate: [AuthGuardService], component: BikeFormComponent },
  { path: 'bikes/view/:id', canActivate: [AuthGuardService], component: SingleBikeComponent },
  { path: 'stations', canActivate: [AuthGuardService], component: StationListComponent },
  { path: 'stations/new', canActivate: [AuthGuardService], component: StationFormComponent },
  { path: 'stations/view/:id', canActivate: [AuthGuardService], component: SingleStationComponent },
  { path: 'users', canActivate: [AuthGuardService], component: UserListComponent },
  { path: 'users/new', canActivate: [AuthGuardService], component: UserFormComponent },
  { path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent },
  { path: '', redirectTo: 'bikes', pathMatch: 'full' },
  { path: '**', redirectTo: 'bikes' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BikeListComponent,
    SingleBikeComponent,
    BikeFormComponent,
    StationListComponent,
    SingleStationComponent,
    StationFormComponent,
    UserListComponent,
    SingleUserComponent,
    UserFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
