import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {
  GoogleApiModule,
  GoogleApiService,
  GoogleAuthService,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
  GoogleApiConfig
} from 'ng-gapi';
import {AppComponent} from './app.component';
import {UserService} from './service/user.service';
import {CalendarService} from './service/calendar.service';
import {MaterialModule} from './material.module';
import {WelcomeCardComponent} from './welcome-card/welcome-card.component';
import {HomePageComponent} from './home-page/home-page.component';
import {CalendarsListComponent} from './calendars-list/calendars-list.component';
import {ErrorAlertComponent} from './error-alert/error-alert.component';
import {CreateCalendarComponent} from './create-calendar/create-calendar.component';
import {CalendarDaysComponent} from './calendar-days/calendar-days.component';
import {CalendarDayComponent} from './calendar-days/calendar-day/calendar-day.component';
import {CalendarDayDetailsComponent} from './calendar-days/calendar-day/calendar-day-details/calendar-day-details.component';
import {SessionService} from './service/session.service';
import {InterceptorService} from './service/interceptor.service';
import {NavBarComponent} from './home-page/nav-bar/nav-bar.component';
import {CalendarDialogComponent} from './home-page/calendar-dialog/calendar-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';


const gapiClientConfig: NgGapiClientConfig = {
  client_id: '264020862118-0p5dcu6107f5qekoradeti5qpk51ilk9.apps.googleusercontent.com',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.readonly'

  ].join(' '),
};

const routes: Routes = [
  {path: 'login', component: WelcomeCardComponent},
  {path: 'home-page', component: HomePageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: WelcomeCardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeCardComponent,
    HomePageComponent,
    CalendarsListComponent,
    ErrorAlertComponent,
    CreateCalendarComponent,
    CalendarDaysComponent,
    CalendarDayComponent,
    CalendarDayDetailsComponent,
    NavBarComponent,
    CalendarDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    })
  ],
  entryComponents: [CalendarsListComponent,
    ErrorAlertComponent,
    CreateCalendarComponent,
    CalendarDayDetailsComponent
  ],
  providers: [UserService, CalendarService, SessionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
