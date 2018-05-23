import {Component} from '@angular/core';
import {ErrorAlertComponent} from '../../error-alert/error-alert.component';
import {CalendarService} from '../../service/calendar.service';
import {Calendars} from '../../calendars-list/calendars';
import {CalendarsListComponent} from '../../calendars-list/calendars-list.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CreateCalendarComponent} from '../../create-calendar/create-calendar.component';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})
export class CalendarDialogComponent {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private calendarService: CalendarService) {
  }

  openCalendarCreatorDialog(): void {
    this.dialog.open(CreateCalendarComponent, {
      width: '400px'
    });
  }

  openCalendarsDialog(params: Calendars[]): void {
    const dialogRef = this.dialog.open(CalendarsListComponent, {
      width: '400px',
      data: params
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.findCalendarById(result);
      } else {
        this.snackBar.openFromComponent(ErrorAlertComponent, {
          duration: 3500
          , data: 'Please choose or create a calendar'
        });
      }
    });
  }

  findCalendarById(calendarId: string) {
    if (!calendarId) {
      this.snackBar.openFromComponent(ErrorAlertComponent, {
        duration: 3500
        , data: 'No calendar id provided'
      });
      return;
    }

    this.calendarService.findCalendarById();
  }

  getAllCalendars() {
    this.calendarService.getAllCalendars()
      .subscribe(calendars => {
        if (calendars.items.length > 1) {
          this.openCalendarsDialog(calendars.items);
        } else {
          const maybeCalendarId = calendars.items.map(calendar => calendar.id)[0];

          if (maybeCalendarId) {
            this.findCalendarById(maybeCalendarId);
          } else {
            this.snackBar.openFromComponent(ErrorAlertComponent, {
              duration: 3500
              , data: 'Wow, we cannot find your calendar'
            });
          }
        }
      });
  }

}
