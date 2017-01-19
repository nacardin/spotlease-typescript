import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../services/apiService';
import { SuperAdminPage } from '../superAdmin/superAdmin';
// import { CommunityAdminPage } from '../communityManager/communityManager';SuperAdminPage
import { UnitPage } from '../account/account';

@Component({
  selector: 'page-account-select',
  templateUrl: 'accountSelect.html'
})
export class AccountSelectPage {

  constructor(public navCtrl: NavController, private apiService: ApiService) {
  }

  openNavDetailsPage(page) {
    switch (page) {
      case 'superAdmin':
        this.navCtrl.push(SuperAdminPage);
        break;
      // case 'communityAdmin':
      //   this.navCtrl.push(CommunityAdminPage);
      //   break;
      case 'unit':
        this.navCtrl.push(UnitPage);
        break;
      default:
        break;
    }
  }

}
