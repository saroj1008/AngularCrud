import { Component, inject } from '@angular/core';
import { StateService, initial_state_value } from './state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <!--If firstname or _id is received then the signal value is changed otherwise signal / state is null-->
    <div *ngIf="!stateService.state()._id; else welcome_and_signout">
      <button (click)="signin()">Sign In</button>
      <button (click)="signup()">Sign Up</button>
    </div>

    <ng-template #welcome_and_signout>
      <p>Welcome {{ stateService.state().fullname }}</p>
      <button (click)="signout()">Log Out</button>
    </ng-template>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'FrontEnd';
  stateService = inject(StateService); // make it public, it's value used in template too
  private router = inject(Router);
  signin() {
    this.router.navigate(['', 'signin']);
  }
  signup() {
    // this.router.navigate(['','signup'])
    this.router.navigate(['/signup']);
  }
  signout() {
    this.stateService.state.set(initial_state_value);
    localStorage.clear();
    this.router.navigate(['', 'signin'])
  }
}
