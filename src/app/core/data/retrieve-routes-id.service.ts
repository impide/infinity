import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RetrieveRoutesId {
    // Bases on the Route Url, whe Retrieve the Id of User target
    targetUserId$ = new BehaviorSubject<string>('');

    setRoutesId(userId: string) {
        this.targetUserId$.next(userId);
    }

    getRoutesId() {
        return this.targetUserId$.value;
    }
}