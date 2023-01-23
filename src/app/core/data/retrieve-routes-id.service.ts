import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class RetrieveRoutesData {
    // Bases on the Route Url, whe Retrieve the Id of User target
    targetUserId$ = new BehaviorSubject<string>('');
    targetUsername$ = new BehaviorSubject<string>('');

    setRoutesId(userId: string): void {
        this.targetUserId$.next(userId);
    };

    getRoutesId(): string {
        return this.targetUserId$.value;
    };
}
