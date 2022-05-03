import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { MainRegisterSpaceComponent } from './components/main-register-space/main-register-space.component';
import { RegisterComponent } from './components/main-register-space/register/register.component';
import { MainSpaceStoryComponent } from './components/main-space-story/main-space-story.component';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main-space-register', pathMatch: 'full' },

  // Register Path
  {
    path: 'main-space-register', component: MainRegisterSpaceComponent, children: [
      { path: 'register', component: RegisterComponent },
    ],
  },
  // Story Path
  { path: 'main-space-story', component: MainSpaceStoryComponent, canActivate: [AuthGuard] },
  // Not Found Path
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
