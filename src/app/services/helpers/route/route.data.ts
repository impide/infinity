import { Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { RetrieveRoutesId } from "src/app/core/data/retrieve-routes-id.service";

@Injectable({
    providedIn: 'root'
})
export class RouteData implements OnDestroy {
    routeSub: Subscription;
    targetUserId: string;
    targetUsername: string;

    constructor(
        private retrieveRoutesId: RetrieveRoutesId,
        private route: ActivatedRoute
    ) { }

    getUrlData() {
        // Retrieve data Url in Route (Id & Username)
        this.routeSub = this.route.params.subscribe(params => {
            this.targetUserId = params['id'];
            this.targetUsername = params['username'];
            // We send params Id for child component because cannot retrieve it using this way
            this.retrieveRoutesId.setRoutesId(params['id']);
        });
    }

    ngOnDestroy() {
        if (this.routeSub != null) {
            this.routeSub.unsubscribe();
        }
    }
}