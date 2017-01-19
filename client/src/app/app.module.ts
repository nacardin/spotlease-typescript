import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SpotLeaseApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { SuperAdminPage } from '../pages/superAdmin/superAdmin';
import { TabsPage } from '../pages/tabs/tabs';
import { UnitPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { AuthenticatePage } from '../pages/authenticate/authenticate';
import { AccountSelectPage } from "../pages/accountSelect/accountSelect";
import { HttpModule } from '@angular/http';
import { ApiService } from '../services/apiService';
import { AuthService } from '../services/authService';

import 'rxjs/add/operator/map';

@NgModule({
  declarations: [
    SpotLeaseApp,
    AboutPage,
    ContactPage,
    SuperAdminPage,
    TabsPage,
    LoginPage,
    AuthenticatePage,
    AccountSelectPage,
    UnitPage
  ],
  imports: [
    IonicModule.forRoot(SpotLeaseApp, {}, {
      links: [
        {component: AuthenticatePage, name: 'AuthenticatePage', segment: 'authenticate/:verificationTokenMessage'}
      ]
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SpotLeaseApp,
    AboutPage,
    ContactPage,
    SuperAdminPage,
    TabsPage,
    LoginPage,
    AuthenticatePage,
    AccountSelectPage,
    UnitPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    AuthService
  ]
})
export class AppModule {}
