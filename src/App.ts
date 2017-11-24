import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import AuthController from './controller/AuthController'
import UserController from "./controller/UserController";
import PokerTableController from "./controller/PokerTableController";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
      createConnection().then(async connection => {


          const admin = new User();
          admin.id = 1;
          admin.username = 'admin';
          admin.password = '1234';
          admin.email = 'admin@admin.com';
          admin.balance = 500;
          admin.firstName = 'admin';
          admin.lastName = 'admin';
          admin.isAdmin = true;

          await admin.save();
          console.log("Loading users from the database...");
          const users = await connection.manager.find(User);
          console.log("Loaded users: ", users);



      }).catch(error => console.log(error));

      console.log("Server started in localhost:3000");
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(session({secret: 'ssshhhhh',resave: false, saveUninitialized: true}));

  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
        next();
    });
    this.express.use('/api/v1/auth', AuthController);
    this.express.use('/api/v1/user', UserController);
    this.express.use('/api/v1/table', PokerTableController);
  }

}

export default new App().express;

