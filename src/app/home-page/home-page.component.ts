import {Component, OnInit, Optional} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {UserService} from '../service/user.service';
import {CalendarService} from '../service/calendar.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private userService: UserService,
              private gapiService: GoogleApiService,
              private calendarService: CalendarService) {
    this.gapiService.onLoad().subscribe();
  }

  ngOnInit() {
  }

  public isLoggedIn(): boolean {
    return this.userService.isUserSignedIn();
  }

  isCalendarSelected(): boolean {
    return this.calendarService.isCalendarSelected();
  }
}
