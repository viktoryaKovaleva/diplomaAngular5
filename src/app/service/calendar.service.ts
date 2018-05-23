import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SessionService} from './session.service';
import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class CalendarService {
  private readonly API_URL: string = 'https://www.googleapis.com/calendar/v3';

  constructor(private sessionService: SessionService,
              private httpClient: HttpClient) {
  }

  findCalendarById() {
    const calendarId: string = this.sessionService.getSelectedCalendarId();
    return this.getApiRequest(`calendars/${calendarId}`);
  }

  getAllCalendars() {
    return this.getApiRequest('users/me/calendarList');
  }

  createCalendar(calendarTitle: string) {
    const params = {'summary': calendarTitle};

    return this.postApiRequest('calendars', params);
  }

  getAllEvents(date: string) {
    const calendarId: string  = this.sessionService.getSelectedCalendarId();
    const nextDay: string = moment(date).add(1, 'd').format();
    const params: any = {
      'timeMin': moment(date).toISOString(),
      'timeMax': moment(nextDay).toISOString()
    };

    return this.getApiRequest(`calendars/${calendarId}/events`, params);
  }

  createEvent(eventText: string, date: string) {
    const calendarId: string  = this.sessionService.getSelectedCalendarId();
    const nextDay: string = moment(date).add(1, 'd').format();
    const params: any = {
      'start': {
        'dateTime': moment(date).toISOString()
      },
      'end': {
        'dateTime': moment(nextDay).toISOString()
      },
      'summary': eventText
    };

    return this.postApiRequest(`calendars/${calendarId}/events`, params);
  }

  deleteEvent(eventId: string) {
    const calendarId: string  = this.sessionService.getSelectedCalendarId();
    return this.deleteApiRequest(`calendars/${calendarId}/events/${eventId}`);
  }

  editEvent (eventId: string, eventNewTitle: string) {
    const params: any = { 'summary': eventNewTitle };
    const calendarId: string = this.sessionService.getSelectedCalendarId();
    return this.patchApiRequest(`calendars/${calendarId}/events/${eventId}`, params);
  }

  private getApiRequest(urlParams: string, params?: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/${urlParams}`, {
      params: params
    });
  }

  private postApiRequest(urlParams: string, params: any | null): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/${urlParams}`, params, {});
  }

  private deleteApiRequest(urlParams: string, params?: any) {
    return this.httpClient.delete(`${this.API_URL}/${urlParams}`, {
      params: params
    });
  }

  private patchApiRequest(urlParams: string, params: any | null) {
    return this.httpClient.patch(`${this.API_URL}/${urlParams}`, params, {});
  }

  isCalendarSelected(): boolean {
    return !_.isEmpty(this.sessionService.getSelectedCalendarId());
  }
}
