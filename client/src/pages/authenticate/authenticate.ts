import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, Loading, NavParams } from "ionic-angular";
import { AuthService } from "../../services/authService";
import { AccountSelectPage } from "../accountSelect/accountSelect";

@Component({
  selector: 'page-authenticate',
  templateUrl: 'authenticate.html'
})
export class AuthenticatePage {

  loading: Loading;
  emailAddress: string;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController,
              private loadingCtrl: LoadingController, public params: NavParams) {

  }

  ionViewWillEnter() {
    let verificationTokenMessage = this.params.get('verificationTokenMessage');

    this.showLoading();
    this.auth.authenticate(verificationTokenMessage).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.setRoot(AccountSelectPage);

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
