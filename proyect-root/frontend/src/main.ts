// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { LoginComponent } from './app/auth/login/login.component';
import { TOKEN_INTERCEPTOR_PROVIDER } from './app/services/token-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    TOKEN_INTERCEPTOR_PROVIDER,
    provideRouter([
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'dashboard', component: DashboardComponent }
    ])
  ]
});
