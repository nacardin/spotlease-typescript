import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { ApiService } from '../../services/apiService'

@Component({
  selector: 'page-super-admin',
  templateUrl: 'superAdmin.html'
})
export class SuperAdminPage {

  communities = [];
  newName: string;

  constructor(public navCtrl: NavController, private apiService: ApiService) {

  }

  loadCommunities() {
    this.apiService.call('superAdmin', 'getCommunities').subscribe((res) => {
      this.communities = res.result;
    });
  }

  ionViewWillEnter() {
    this.loadCommunities();
  }

  createCommunity() {
    this.apiService.call('superAdmin', 'createCommunity', {
      name: this.newName
    }).subscribe((res) => {
      this.loadCommunities();
    });
  }

}
