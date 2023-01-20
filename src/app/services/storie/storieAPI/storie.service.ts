import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SnackBarService } from 'src/app/layout/material/snackbar/snackbar-service';
import { Data } from 'src/app/models/data/data.model';
import { StorieModel } from 'src/app/models/storie/storie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorieService {
  // Token & Api
  private api = environment.api;

  // Observable Stories
  stories: StorieModel[];
  stories$ = new Subject<StorieModel[]>();

  // Storie(s) View
  interval: NodeJS.Timeout;

  constructor(
    private http: HttpClient,
    private snackbar: SnackBarService,
    public dialog: MatDialog
  ) { }

  // Get all Stories
  getStories() {
    return this.http.get(this.api + '/stories/').subscribe({
      next: (storieData: Data) => {
        this.stories = storieData.result;
        this.stories$.next([...this.stories]);
      },
      error: (storieData: Data) => {
        this.snackbar.openSnackBar(storieData.message, 5);
      }
    });
  }

  // Add a new Storie
  addOneStorie(storie: StorieModel, image: File) {
    let storieData: FormData = new FormData();
    storieData.append('storie', JSON.stringify(storie));
    storieData.append('image', image);
    return this.http.post(this.api + '/stories/add-storie', storieData).subscribe({
      next: () => {
        this.snackbar.openSnackBar('Storie Added Successfully', 3);
        this.getStories();
        this.dialog.closeAll();
      },
      error: (storieData: Data) => {
        this.snackbar.openSnackBar(storieData.message, 5);
      }
    }
    )
  }

  // Delete Storie
  deleteStorie(id: string) {
    return this.http.delete(this.api + '/stories/' + id).subscribe(
      {
        next: () => {
          this.getStories();
          this.snackbar.openSnackBar('Storie deleted successfully', 3);
          this.dialog.closeAll();
        },
        error: (storieData: Data) => {
          this.snackbar.openSnackBar(storieData.message, 5);
        }
      }
    )

  }

}
