import { Injectable, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StorieModel } from "src/app/models/storie/storie.model";
import { AuthData } from "../../authentification/authData/auth.data";
import { StorieService } from "../storieAPI/storie.service";

@Injectable({
    providedIn: 'root'
})
export class StorieData implements OnDestroy {
    // Stories Variable
    storiesSub: Subscription;
    storiesValues: StorieModel[];

    constructor(
        public storieAPI: StorieService,
        public authData: AuthData
    ) { }

    // Stories of current User
    getStories() {
        this.storiesSub = this.storieAPI.stories$.subscribe(
            {
                next: (result) => {
                    this.storiesValues = result.filter((storie => storie.userId === this.authData.getCurrentUserId()));
                },
                error: (err) => {
                    console.log(err);
                }
            }
        )
    };

    // Get Stories of current Category
    getCategory(category: string): StorieModel[] {
        return this.storiesValues.filter((storie => storie.category === category));
    };

    // Get Stories unique Category
    getUniqueCategories(): StorieModel[] {
        return this.storiesValues.filter((value, index, self) =>
            index === self.findIndex((storie) => (storie.category === value.category)));
    }

    // Reset Progress of all Stories (current user)
    resetProgress(): void {
        return this.storiesValues.forEach((storie => storie.progress = 0));
    };

    ngOnDestroy() {
        if (this.storiesSub != null) {
            this.storiesSub.unsubscribe();
        }
    }

}
