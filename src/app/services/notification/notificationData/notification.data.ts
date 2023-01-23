import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { NotifModel } from "src/app/models/notif/notif.model";
import { AuthService } from "../../authentification/authAPI/auth.service";
import { AuthData } from "../../authentification/authData/auth.data";
import { NotificationService } from "../notificationAPI/notification.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationData implements OnDestroy {
    // Notifs
    notifsSub: Subscription;
    notifs: NotifModel[];

    // Request & Target
    requestButton$ = new BehaviorSubject<string>('Loading...');

    constructor(
        private authData: AuthData,
        private authAPI: AuthService,
        private notifService: NotificationService,
    ) { }

    getNotificationData(): void {
        // Get all Notifications (To check if a friend request already exists for this user)
        this.notifService.getNotifications();
        this.notifsSub = this.notifService.notifs$.subscribe(
            (notifs: NotifModel[]) => {
                this.getRequestSending(notifs);
            }
        )
    };

    getRequestSending(notifs: NotifModel[]) {
      if (!(notifs?.length > 0)) return;
        // Array of each request Current User has Create (Filtering by his Id)
        const sortByCreatedRequests = notifs.filter(notif => notif.requestCreateById === this.authData.getCurrentUserId());

        // Check if a request has been send to this Target User (Filtering by Target Id)
        const receiverId = sortByCreatedRequests.filter((receiver) => (
          receiver._id === this.authAPI.user$.value._id
        ));

      if (sortByCreatedRequests.length && receiverId) {
            return this.requestButton$.next('Pending');
          } else {
            return this.requestButton$.next('Loading...');
          }
      };

    getRequestValidating(targetUserId: string): void {
      if (targetUserId) {
      /* If the request is "Pending" or User's Friends is empty then no need to continue */
        if (this.requestButton$.value === 'Pending') return;
        if (!(this.authData.getFilteredFriends()?.length > 0)) {
          this.requestButton$.next('Add Friend');
          return;
        }

      /* We filtered Data for check if Target User was Already friend with Current */
        this.authData.getFilteredFriends().forEach((friend) => {
          if (friend.userId === targetUserId) {
            this.requestButton$.next('Already Friend');
          } else {
            this.requestButton$.next('Add Friend');
          }
        });
      }
    };

    ngOnDestroy(): void {
        if (this.notifsSub != null) {
            this.notifsSub.unsubscribe();
        }
    }
}
