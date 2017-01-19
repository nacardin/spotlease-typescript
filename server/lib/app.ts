import * as express from "express";
import routeFactory from "./routes";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserClient } from "./entity/UserClient";
import { Community } from "./entity/Community";

export default async function appFactory() {

  let app = express();

  try {
    let connection = await createConnection({
      driver: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        extra: {
          ssl: true
        }
      },
      entities: [
        User,
        UserClient,
        Community
      ],
      autoSchemaSync: true
    });

    app.use(routeFactory(connection));

  } catch (exc) {
    console.error('error connection to db', exc);
  }

  return app;
}

