import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { NotifModel } from "src/app/models/Notif/notif.model";
import { UserModel } from "src/app/models/User/user.model";
import { AuthService } from "../../authentification/authAPI/auth.service";
import { AuthData } from "../../authentification/authData/auth.data";
import { RouteData } from "../../helpers/route/route.data";
import { NotificationService } from "../notificationAPI/notification.service";

@Injectable({
    providedIn: 'root'
})
export class NotificationData implements OnDestroy {
    // Notifs
    notifsSub: Subscription;
    notifs: NotifModel[];

    // Users
    usersSub: Subscription;
    users: UserModel[];

    // Request & Target
    requestButton: string;
    targetAvatar: string;

    constructor(
        private authData: AuthData,
        private authAPI: AuthService,
        private routeData: RouteData,
        private notifService: NotificationService
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

    getRequestSending(notifs: NotifModel[]): string {
        // Array of each request Current User has Create (Filtering by his Id)
        const currentNotif = notifs.filter(x => x.requestCreateById === this.authData.getCurrentUserId());
        // Check if a request has been send to this Target User (Filtering by Target Id)
        if ((currentNotif.filter(x => x.requestReceiverId === this.routeData.targetUserId)).length > 0) {
            // Set the State of Request
            return this.requestButton = 'Pending';
        } else {
            return this.requestButton = '';
        }
    };

    // Get all Users (To check if this Users are already friends)
    getFilteredUserRequest(requestButton: string): void {
        this.authAPI.getAllUsers();
        this.usersSub = this.authAPI.users$.subscribe(
            (users: UserModel[]) => {
                this.getRequestValidating(users, requestButton);
            }
        )
    };

    getRequestValidating(users: UserModel[], requestButton: string): void {
        /* Before anything, Retrieve target User Avatar */
        this.targetAvatar = users.filter(userId => userId._id === this.routeData.targetUserId)[0].avatar;
        /* If the request is "Pending" then no need to continue */
        if (requestButton === 'Pending') {
            return;
        }
        /* Else, Retrieve the data of current User connected */
        this.users = users.filter(x => x._id === this.authData.getCurrentUserId());
        /* We filtered the previous data for check if target User Profile was already friend */
        for (let i = 0; i < this.users.filter(x => x.friends).length; i++) {
            const filteredFriends = this.users.filter(x => x.friends[i]?.username === this.routeData.targetUsername);
            if (filteredFriends.length > 0) {
                // Set the State of Request
                this.requestButton = 'Already Friend';
            } else {
                this.requestButton = 'Add Friend';
            }
        }
    };

    ngOnDestroy(): void {
        if (this.notifsSub != null) {
            this.notifsSub.unsubscribe();
        }
    }
}