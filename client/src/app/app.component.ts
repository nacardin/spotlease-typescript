import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { AccountSelectPage } from "../pages/accountSelect/accountSelect";


@Component({
  templateUrl: 'app.html'
})
export class SpotLeaseApp {
  rootPage: any;

  constructor(platform: Platform) {

    if(localStorage.getItem('privateKey')) {
      this.rootPage = AccountSelectPage
    } else {
      this.rootPage = LoginPage
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
