import { Component, Inject } from '@angular/core';
import { CalendarService } from '../service/calendar.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
  selector: 'app-create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent {
  isProcessing = false;


  constructor(private calendarService: CalendarService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CreateCalendarComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string) { }

  private createCalendar(calendarTitle: string) {
    this.calendarService.createCalendar(calendarTitle
    )
      .subscribe((data) => {
        this.dialogRef.close();
        this.isProcessing = false;
        this.snackBar.openFromComponent(ErrorAlertComponent, {
          duration: 3500
          , data: `Calendar "${data.summary}" has been created!`
        });
      });
  }

  onCloseConfirm(calendarTitle: string) {
    if (calendarTitle) {
      this.isProcessing = true;
      this.createCalendar(calendarTitle);
    } else {
      this.onCloseCancel();
    }
  }

  onCloseCancel() {
    this.dialogRef.close();
  }
}
