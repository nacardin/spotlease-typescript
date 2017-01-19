import * as crypto from "crypto";
import * as elliptic from "elliptic";

import { User } from "../entity/User";
import { UserClient } from "../entity/UserClient";

import publicFactory from "./scopes/public";
import superAdminFactory from "./scopes/superAdmin";

export default function apiFactory(connection) {

  let scopes = {
    'public': publicFactory(connection),
    'superAdmin': superAdminFactory(connection)
  };

  return async function apiCallHandler(req, res) {
    let message = req.body.message;
    let context = {
      user: null
    };

    if(message.scope !== 'public') {
      if(!req.body.publicKey || !req.body.signature) {
        res.status(403).send();
        return;
      }

      let ecdsa = new elliptic.ec('secp256k1');
      let keyPair = ecdsa.keyFromPublic(req.body.publicKey, 'hex');

      const publicKeyBuffer = Buffer.from(req.body.publicKey, 'hex');

      const stringifiedMessage = JSON.stringify(req.body.message);
      const stringifiedMessageHash = crypto.createHash('sha256').update(stringifiedMessage).digest('hex');

      const isSignatureValid = keyPair.verify(stringifiedMessageHash, req.body.signature);

      if(!isSignatureValid){
        res.status(403).send();
        return;
      }

      const hash = crypto.createHash('sha256');
      hash.update(Buffer.from(req.body.publicKey, 'hex'));

      let userRepository = connection.getRepository(User);
      let user = context.user = await userRepository
        .createQueryBuilder('user')
        .innerJoinAndMapOne("user.client", "user.clients", "client")
        .where("client.publicKeyHash=:publicKeyHash", {publicKeyHash: hash.digest('base64')})
        .getOne();

      if(message.scope === 'superAdmin' && !user.superAdmin) {
        res.status(403).send();
        return;
      }
    }


    if(!scopes[message.scope] || typeof(scopes[message.scope][message.method]) !== 'function') {
      res.status(404).send();
      return;
    }

    try {
      let result = await scopes[message.scope][message.method](message.params, context);
      res.send({
        result: result
      });
    } catch (exc) {
      console.error('api error: ', exc);
      res.status(500).send();
    }
  }


}
