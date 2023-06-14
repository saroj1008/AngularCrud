import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService, IToken, IUser } from './auth.service';
import { StateService } from './state.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  template: `
    <form [formGroup]="form" (ngSubmit)="login()">
      <input placeholder="email" formControlName="email" />
      <input
        placeholder="password"
        type="password"
        formControlName="password"
      />
      <button type="submit">Login</button>
    </form>
  `,
  styles: [],
})
export class SigninComponent {
  private authService = inject(AuthService);
  private stateService = inject(StateService);
  private router = inject(Router);
  private notification = inject(ToastrService);

  form = inject(FormBuilder).nonNullable.group({
    email: ['asaad@miu.edu', Validators.required],
    password: ['123456', Validators.required],
  });

  login() {
    this.authService.signin(this.form.value as IUser).subscribe((response) => {
      if (response.success) {
        //set state
        const decoded_token = jwt_decode(response.data) as IToken; // jwt_decode will return unknown all the time so mention type
        const state = {
          ...decoded_token,
          jwt: response.data,
        };
        this.stateService.state.set(state);
        //store store in local storage to prevent logout when refresh
        localStorage.setItem('TodoAppState', JSON.stringify(state));
        //redirect
        this.router.navigate(['', 'todos']);
        this.notification.success('Signed In');
      } else {
        // display error
        this.notification.success('Incorrect credentials');
      }
    });
  }
}
