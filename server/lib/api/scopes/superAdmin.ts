import * as mailgunjs from "mailgun-js";
import * as crypto from "crypto";
import { User } from "../../entity/User";
import { Community } from "../../entity/Community";
import { UserClient } from "../../entity/UserClient";

const mailgun = mailgunjs({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

export default function superAdminFactory(connection) {

  return {

    async getCommunities(params) {
      let communityRepository = connection.getRepository(Community);
      let communities = await communityRepository
        .createQueryBuilder('community')
        .getMany();

      return communities;
    },

    async createCommunity(params) {

      let newCommunity = new Community();
      newCommunity.name = params.name;

      try {
        await connection.entityManager.persist(newCommunity);
      } catch (exc) {
        console.error(exc);
      }

      return true;
    }

  }

}
