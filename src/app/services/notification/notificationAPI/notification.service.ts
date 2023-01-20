import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/layout/material/snackbar/snackbar-service';
import { Data } from 'src/app/models/data/data.model';
import { NotifModel, RequestValidated } from 'src/app/models/notif/notif.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // Auth Data
  private api = environment.api;

  // Observable Notifs
  notifs: NotifModel[];
  notifs$ = new Subject<NotifModel[]>();

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private snackbar: SnackBarService,
  ) { }

  // Get All Notifications
  getNotifications() {
    return this.http.get(this.api + '/notifications/').subscribe(
      {
        next: (notifData: Data) => {
          this.notifs = notifData.result;
          this.notifs$.next([...this.notifs]);
        },
        error: (notifData: Data) => {
          this.snackbar.openSnackBar(notifData.message, 5);
        }
      }
    )
  }

  // Send a Friend Request
  requestOneFriend(requestData: NotifModel, targetUserId: string) {
    // Send Notif Data
    return this.http.post(this.api + '/notifications/request-one-friend/' + targetUserId, requestData).subscribe(
      {
        next: () => {
          this.getNotifications();
          this.snackbar.openSnackBar('A friend request has been created', 3);
        },
        error: (requestData: Data) => {
          this.snackbar.openSnackBar(requestData.message, 5);
        }
      }
    )
  }

  // Confirm a Friend Request
  acceptOneFriend(requestValidated: RequestValidated, notifId: string) {
    // Send Response Data
    return this.http.post(this.api + '/notifications/accept-one-friend/' + notifId, requestValidated).subscribe(
      {
        next: () => {
          this.getNotifications();
          this.snackbar.openSnackBar('You are Friend now', 3);
        },
        error: (requestData: Data) => {
          this.snackbar.openSnackBar(requestData.message, 5);
        }
      }
    )
  }

  // Delete Currrent Notification
  deleteNotification(id: string) {
    return this.http.delete(this.api + '/notifications/' + id).subscribe(
      {
        next: () => {
          this.getNotifications();
          this.snackbar.openSnackBar('Notification deleted', 3);
        },
        error: (notifData: Data) => {
          this.snackbar.openSnackBar(notifData.message, 5);
        }
      }
    )

  }
}
