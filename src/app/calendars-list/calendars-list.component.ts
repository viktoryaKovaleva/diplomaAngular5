import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Calendars } from './calendars';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-calendars-list',
  templateUrl: './calendars-list.component.html',
  styleUrls: ['./calendars-list.component.css']
})
export class CalendarsListComponent {
  private chosenCalendarId: string;

  constructor(private sessionService: SessionService,
    private dialogRef: MatDialogRef<CalendarsListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Calendars[]) { }

  getCalendarId(calendarId: string) {
    this.chosenCalendarId = calendarId;
  }

  onCloseConfirm() {
    if (this.chosenCalendarId) {
      this.sessionService.setSelectedCalendarId(this.chosenCalendarId);
      this.dialogRef.close(this.chosenCalendarId);
    } else {
      this.onCloseCancel();
    }
  }

  onCloseCancel() {
    this.dialogRef.close();
  }
}
