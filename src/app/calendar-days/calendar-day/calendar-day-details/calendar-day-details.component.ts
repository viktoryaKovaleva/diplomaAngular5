import {Component, Inject, Optional} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {ErrorAlertComponent} from '../../../error-alert/error-alert.component';
import {CalendarService} from '../../../service/calendar.service';
import {SessionService} from '../../../service/session.service';

@Component({
  selector: 'app-calendar-day-details',
  templateUrl: './calendar-day-details.component.html',
  styleUrls: ['./calendar-day-details.component.css']
})
export class CalendarDayDetailsComponent {
  tasks: any[] = [];

  constructor(private sessionService: SessionService,
              private snackBar: MatSnackBar,
              private calendarService: CalendarService,
              private dialogRef: MatDialogRef<CalendarDayDetailsComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.tasks = data.tasks;
  }

  addEvent(eventText: string, date: string) {
    if (eventText) {
      this.calendarService.createEvent(eventText, date)
        .subscribe((data) => {
          this.tasks.push(data);
          this.snackBar.openFromComponent(ErrorAlertComponent, {
            duration: 3500
            , data: `Task "${eventText}" has been created!`
          });
        });
    } else {
      this.snackBar.openFromComponent(ErrorAlertComponent, {
        duration: 3500
        , data: 'Good try 😀 !'
      });
    }
  }

  removeTask(id: string, eventTitle: string, eventIndex: number) {
    if (id && eventTitle) {
      this.calendarService.deleteEvent(id)
        .subscribe(() => {
          this.tasks.splice(eventIndex, 1);
          this.snackBar.openFromComponent(ErrorAlertComponent, {
            duration: 3500
            , data: `Event "${eventTitle}" has been deleted!`
          });
          document.getElementById(id).remove();
        });
    } else {
      this.snackBar.openFromComponent(ErrorAlertComponent, {
        duration: 3500
        , data: 'Seems like i cannot find task to remove'
      });
    }
  }

  editEvent(eventId, eventNewTitle) {
    if (eventId && event) {
      this.calendarService.editEvent(eventId, eventNewTitle)
        .subscribe(() => {
          this.snackBar.openFromComponent(ErrorAlertComponent, {
            duration: 3500
            , data: `Event has been updated!`
          });
        });
    } else {
      this.snackBar.openFromComponent(ErrorAlertComponent, {
        duration: 3500
        , data: 'Seems like i cannot find task to edit'
      });
    }
  }
}
