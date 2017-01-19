import { Component } from '@angular/core';

import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { AuthService } from '../../services/authService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: Loading;
  emailAddress: string;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {

  }

  public login() {
    this.showLoading();
    this.auth.requestEmailToken(this.emailAddress).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
          });
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
