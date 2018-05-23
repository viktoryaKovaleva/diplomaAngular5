import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {MatDialog} from '@angular/material/dialog';
import {CalendarDayDetailsComponent} from './calendar-day-details/calendar-day-details.component';
import {CalendarService} from '../../service/calendar.service';

@Component({
  selector: 'app-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.css']
})
export class CalendarDayComponent {
  @Input() date: any;

  constructor(private dialog: MatDialog,
              private calendarService: CalendarService) {
  }


  private openDayDetails(params: any) {
    this.dialog.open(CalendarDayDetailsComponent, {
      data: params
    });
  }

  getCalendarEvents(date: string) {
    this.calendarService.getAllEvents(date)
      .subscribe(tasks => {
        this.openDayDetails({'tasks': tasks.items, 'date': date});
      });
  }

}
