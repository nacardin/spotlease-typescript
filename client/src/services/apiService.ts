import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import * as elliptic from 'elliptic';
import * as hash from 'hash.js';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: Http) {
  }

  call(scope: string, method: string, params?: any) {

    let body: any = {
      message: {
        scope: scope,
        method: method
      }
    };

    if(params) {
      body.message.params = params;
    }

    if (scope !== 'public') {
      let privateKey = localStorage.getItem('privateKey');
      if(!privateKey) return Observable.throw('privateKey is required');

      let ecdsa = new elliptic.ec('secp256k1');
      let keyPair = ecdsa.keyFromPrivate(privateKey, 'hex');

      let stringifiedMessage = JSON.stringify(body.message);
      body.publicKey = keyPair.getPublic('hex');
      const messageHash = hash.sha256().update(stringifiedMessage).digest('hex');

      body.signature = keyPair.sign(messageHash).toDER('hex');
    }

    return this.http.post(this.apiUrl, body)
      .map((res: Response) => {
        return res.json();
      });
  }
}
