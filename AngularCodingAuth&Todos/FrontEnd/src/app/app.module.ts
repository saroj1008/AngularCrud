import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { addTokenInterceptor } from './add-token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { checkTokenGuard } from './check-token.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { StateService } from './state.service';

const bootstrap = function (stateService: StateService) {
  return () => {
    const state = localStorage.getItem('TodosAppState');
    if (state) {
      stateService.state.set(JSON.parse(state));
    }
  };
};

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),

    RouterModule.forRoot([
      { path: '', redirectTo: 'signin', pathMatch: 'full' }, // if nothing redirect to singin
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      // If path is 'todos' then lazily load todos module
      {
        path: 'todos',
        loadChildren: () =>
          import('./todos/todos.module').then((module) => module.TodosModule),
        // we can change logic later now protect guard, its true
        canActivate: [checkTokenGuard],
      },
    ]),
  ],
  providers: [
    provideHttpClient(withInterceptors([addTokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: bootstrap,
      deps: [StateService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
