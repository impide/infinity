import { Injectable } from "@angular/core";
import { catchError, EMPTY, finalize, map, Observable } from "rxjs";
import { StorieModel } from "src/app/models/Storie/storie.model";
import { AuthData } from "../../authentification/authData/auth.data";
import { StorieService } from "../storieAPI/storie.service";

@Injectable({
    providedIn: 'root'
})
export class StorieData {
    // Values (View Component)
    storiesValues: StorieModel[];
    // Length
    storiesLength: number;

    constructor(
        public storieAPI: StorieService,
        public authData: AuthData
    ) { }

    // Stories of current User
    getFilteredStories(): Observable<StorieModel[]> {
        return this.storieAPI.stories$.pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                stories => stories.filter(storie => storie.userId === this.authData.getCurrentUserId())
            )
        );
    };

    // Stories.length of current User
    getFilteredLength(): Observable<number> {
        return this.storieAPI.stories$.pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(stories => this.storiesLength = stories.length)
        );
    };

    // Stories.categories of current User
    getFilteredValuesCategories(category: string) {
        return this.getFilteredStories().pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                stories => this.storiesValues = stories.filter(storie => storie.category === category)
            )
        );
    };

    // Unique Stories.categories
    getUniqStoriesCategories(): Observable<StorieModel[]> {
        return this.getFilteredStories().pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                stories => stories.filter((value, index, self) =>
                    index === self.findIndex((x) => (x.category === value.category)))
            )
        );
    };

    // Stories.categories (selected)
    getFilteredCategories(category: string): Observable<StorieModel[]> {
        return this.getFilteredStories().pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                stories => stories.filter(storie => storie.category === category)
            )
        );
    };

    resetProgressStories(): Observable<void> {
        return this.getFilteredStories().pipe(
            catchError(error => {
                console.error(error);
                return EMPTY;
            }),
            finalize(() => {
                console.log('Filtered Users Done');
            }),
            map(
                stories => stories.forEach((storie => storie.progress = 0))
            )
        );
    };

}