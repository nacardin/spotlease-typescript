import * as mailgunjs from "mailgun-js";
import * as crypto from "crypto";
import { User } from "../../entity/User";
import { UserClient } from "../../entity/UserClient";

const mailgun = mailgunjs({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

export default function publicFactory(connection) {

  return {

    async requestEmailToken(params) {

      let verificationToken = {
        created: Date.now(),
        email: params.email
      };

      let hmac = crypto.createHmac('sha256', process.env.SERVER_SECRET);
      hmac.update(JSON.stringify(verificationToken));
      let verificationTokenDigest = hmac.digest('base64');

      let verificationTokenMessage = {token: verificationToken, digest: verificationTokenDigest};
      let verificationTokenMessageJsonStr = JSON.stringify(verificationTokenMessage);
      let verificationTokenMessageBase64 = new Buffer(verificationTokenMessageJsonStr).toString('base64');

      let data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: params.email,
        subject: 'Hello',
        html: `Testing some Mailgun awesomness! <a href="http://localhost:8100/#/authenticate/${verificationTokenMessageBase64}">verify</a>`
      };

      try {
        await mailgun.messages().send(data);
        return true;
      } catch (e) {
        console.error('error sending email', e);
        return false;
      }

    },

    async authenticate(params) {

      let verificationTokenMessageJsonStr = Buffer.from(params.verificationTokenMessage, 'base64').toString('ascii');
      let verificationTokenMessage = JSON.parse(verificationTokenMessageJsonStr);

      let hmac = crypto.createHmac('sha256', process.env.SERVER_SECRET);
      hmac.update(JSON.stringify(verificationTokenMessage.token));
      let verificationTokenDigest = hmac.digest('base64');

      if (verificationTokenDigest !== verificationTokenMessage.digest) {
        return false;
      }

      let email = verificationTokenMessage.token.email;
      let userRepository = connection.getRepository(User);
      let user = await userRepository
        .createQueryBuilder('user')
        .where('user.email=:email')
        .setParameters({email: email})
        .getOne();

      const hash = crypto.createHash('sha256');
      hash.update(Buffer.from(params.publicKey, 'hex'));

      if(!user) {
        user = new User();
        user.email = email;
        user.givenName = '';
        user.familyName = '';
        user.telephone = '';
        user.superAdmin = true;
      }

      let userClient = new UserClient();
      userClient.user = user;
      userClient.publicKeyHash = hash.digest('base64');

      try {
        await connection.entityManager.persist(userClient);
      } catch (exc) {
        console.log('pub hash already authed');
      }

      return true;

    }

  }

}
