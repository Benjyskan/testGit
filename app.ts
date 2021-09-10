import express, { RequestHandler } from "express";
import { root } from "./src/main";
import json, { value } from "./assets/test.json";

const app = express();

const ignoreFavicon: RequestHandler = (req, res, next) => {
  if (req.originalUrl === "/favicon.ico") res.status(204).end();
  else next();
};

const myLogger: RequestHandler = (req, _res, next) => {
  console.log("before? LOGGED on", req.url);
  next();
};

app.use(ignoreFavicon);
app.use(myLogger);

app.get("/", (_req, res) => {
  console.log("after?");

  res.send(root);
});

app.get("/json", (_req, res) => {
  res.send(`${json.name} ${value}`);
});

if (process.env.NODE_ENV === "production") {
  app.listen(3000);
}

export const viteNodeApp = app;
