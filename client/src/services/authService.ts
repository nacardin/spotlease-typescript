import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ApiService } from "./apiService";
import * as elliptic from 'elliptic';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(private api: ApiService) {

  }

  public requestEmailToken(email) {
    if (email === null) {
      return Observable.throw("Please enter a valid email address");
    } else {
      return this.api.call('public', 'requestEmailToken', {
        email: email
      });
    }
  }

  public authenticate(verificationTokenMessage) {
    if (!verificationTokenMessage) {
      return Observable.throw("Please enter a valid email address");
    } else {

      let ecdsa = new elliptic.ec('secp256k1');
      let keyPair = ecdsa.genKeyPair();

      let subscription = this.api.call('public', 'authenticate', {
        verificationTokenMessage: verificationTokenMessage,
        publicKey: keyPair.getPublic('hex')
      });

      subscription.subscribe((res) => {
        localStorage.setItem('privateKey', keyPair.getPrivate('hex'))
      });

      return subscription;
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
