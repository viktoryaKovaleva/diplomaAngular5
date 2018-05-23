import {Injectable} from '@angular/core';
import {ErrorAlertComponent} from '../error-alert/error-alert.component';

@Injectable()
export class SessionService {
  private readonly SELECTED_CALENDAR_ID: string = 'selectedCalendarId';
  private readonly ACCESS_TOKEN: string = 'accessToken';
  private readonly SELECTED_EVENT_ID: string = 'selectedEventId';

  constructor() {
  }

  private setToSession(key, value, message): void {
    if (value) sessionStorage.setItem(key, value);
    else throw new Error(message);
  }

  private getFromSession(key): string {
    const getValue = sessionStorage.getItem(key);
    if (getValue) return getValue;
  }

  private removeFromSession(key): void {
    sessionStorage.removeItem(key);
  }

  setSelectedCalendarId(calendarId: string): void {
    this.setToSession(this.SELECTED_CALENDAR_ID, calendarId, 'Calendar id is empty or corrupted');
  }

  removeCalendarId() {
    this.removeFromSession(this.SELECTED_CALENDAR_ID);
  }

  getSelectedCalendarId(): string {
    return this.getFromSession(this.SELECTED_CALENDAR_ID);
  }

  setAccessToken(token: string): void {
    this.setToSession(this.ACCESS_TOKEN, token, 'Access token is empty or corrupted');
  }

  removeAccessToken(): void {
    this.removeFromSession(this.ACCESS_TOKEN);
  }

  getAccessToken(): string {
    return this.getFromSession(this.ACCESS_TOKEN);
  }

  setSelectedEventId(eventId: string) {
    this.setToSession(this.SELECTED_EVENT_ID, eventId, 'Event id is empty or corrupted');
  }

  getSelectedEventId(): string {
    return this.getFromSession(this.SELECTED_EVENT_ID);
  }
}
