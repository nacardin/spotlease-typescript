import "reflect-metadata";
import * as dotenv from 'dotenv';
dotenv.config();

import * as http from "http";
import * as debug from "debug";

import appFactory from "./app";

async function main() {
  let app = await appFactory();

  let httpServer = http.createServer(app);
  httpServer.listen(8080);
  httpServer.on("error", (err) => console.error(err));
  httpServer.on("listening", () => {
    let addr = httpServer.address();
    let bind = typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr.port;
    debug("express:server")("Listening on " + bind);
  });
}

main();
