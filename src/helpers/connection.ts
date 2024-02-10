import { Express } from 'express';
import mongoose from 'mongoose';
import appModules from './../modules/app.module';

class Connection {
  application: any;
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
    appModules.map(module => {
      this.application.use(`/v1/${module.prefix}`, module.router);
    });
  }

  verifyConfigs() {
    if (!process.env.PORT) {
      throw new Error('set PORT in env file');
    }

    if (!process.env.CONNECTION_STRING_DB) {
      throw new Error('set CONNECTION_STRING_DB in env file');
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
    });
  }
}


export default Connection; 