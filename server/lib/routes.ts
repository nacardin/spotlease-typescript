import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import { User } from "./entity/User";
import apiFactory from "./api";

export default function routeFactory(connection) {

  let router = express.Router();

  let serveStatic = express.static('../client/dist');

  router.use('/', serveStatic);

  router.get('/test', (req, res) => {

    let user = new User();
    user.givenName = "user1";
    user.familyName = "user1";
    user.email = "user1";
    user.telephone = "user1";

    connection.entityManager
      .persist(user)
      .then(user => {
        console.log("user has been saved");
        res.send('hello');
      }).catch((exc) => {
      res.send(500, exc);
    });

  });

  router.use('/api', cors({origin: 'http://localhost:8100'}));
  router.post('/api', bodyParser.json(), apiFactory(connection));

  return router

}
