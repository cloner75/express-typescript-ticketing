import { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import appModules from './../modules/app.module';
import DataSeeder from './seeder';

class Connection {
  application: Express | any;
  express: any;

  constructor(app: Express | any) {
    this.express = app;
    this.application = app();
  }

  applicationInitialize() {
    this.application.use(require('cors')({
      origin: '*',
      METHODS: 'GET POST DELETE PUT PATCH'
    }));
    this.application.use(this.express.urlencoded({ extended: true }));
    this.application.use(this.express.json());
  }

  modules() {
    const VERSION_1 = '/v1';
    appModules.map(module => {
      this.application.use(VERSION_1 + module.prefix, module.router);
    });

    this.application.use((req: Request, res: Response) => res.status(404).send({
      success: false,
      message: `Not Found Route : ${req.path} `
    }));

    this.application.use((err: any, req: Request, res: Response, next: any) => {
      if (err.status === 400 && 'body' in err) {
        return res
          .status(400)
          .send({
            status: 404,
            message: err.message
          });
      }
      next();
    });

  }

  verifyConfigs() {
    if (!process.env.PORT) {
      throw new Error('set PORT in env file');
    }

    if (!process.env.CONNECTION_STRING_DB) {
      throw new Error('set CONNECTION_STRING_DB in env file');
    }

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error('set JWT_SECRET_KEY in env file');
    }

    if (!process.env.SALT_ROUNDS) {
      throw new Error('set SALT_ROUNDS in env file');
    }
  }

  nodeEvents() {
    process.on('uncaughtException', (err) => {
      console.log("🚀 ~ Connection ~ process.on ~ err:", err);
    });

    process.on('unhandledRejection', (err) => {
      console.log("🚀 ~ Connection ~ process.on ~ err:", err);
    });
  }

  mongoConnection() {
    mongoose.connect(`${process.env.CONNECTION_STRING_DB}`)
      .then(() => {
        console.log("🚀 ~ Connection ~ mongoConnection ~ successfuly");
      })
      .catch(err => {
        console.log("🚀 ~ Connection ~ mongoConnection ~ err:", err);
      });
  }

  startup() {
    this.verifyConfigs();
    this.applicationInitialize();
    this.modules();
    this.application.listen(process.env.PORT, () => {
      console.log("🚀 ~ Connection ~ startup ~ process.env.PORT:", process.env.PORT);
      this.nodeEvents();
      this.mongoConnection();
      new DataSeeder();
    });
  }
}


export default Connection; 