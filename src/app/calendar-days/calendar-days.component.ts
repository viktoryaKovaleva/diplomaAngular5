import { Component } from '@angular/core';
import * as Moment from 'moment';
import { extendMoment } from 'moment-range';

@Component({
  selector: 'app-calendar-days',
  templateUrl: './calendar-days.component.html',
  styleUrls: ['./calendar-days.component.css']
})
export class CalendarDaysComponent {
  moment = extendMoment(Moment);
  dates: string[] = [];

  constructor() { this.renderCalendarWeek(); }

  renderCalendarWeek() {
    const fromDate = this.moment().startOf('isoWeek');
    const toDate = this.moment().endOf('isoWeek');
    const range = this.moment().range(fromDate, toDate);

    this.dates = Array.from(range.by('day')).map(date => date.format())
  }
}
