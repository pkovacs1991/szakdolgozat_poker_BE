import * as express from 'express';
import * as session from 'express-session';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as http from "http";
import * as socketIo from "socket.io";
import * as crypto from 'crypto-js';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import AuthController from './controller/AuthController'
import UserController from "./controller/UserController";
import PokerTableController from "./controller/PokerTableController";
import {Message} from "./entity/Message";
import {PokerService} from "./service/PokerService";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public static readonly PORT:number = 8080;
  public express: express.Application;
  private server: any;
  private io: any;
  private port: string | number;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
      createConnection().then(async connection => {


          const admin = new User();
          admin.id = 1;
          admin.username = 'admin';
          admin.password = crypto.SHA256('1234').toString();
          admin.email = 'admin@admin.com';
          admin.balance = 500;
          admin.firstName = 'admin';
          admin.lastName = 'admin';
          admin.isAdmin = true;

          await admin.save();
          const users = await connection.manager.find(User);



      }).catch(error => console.log(error));

      this.server = http.createServer(this.express);
      this.config()
      this.sockets();
      this.listen();
      // Encrypt

// Decrypt
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
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
        next();
    });
    this.express.use('/api/v1/auth', AuthController);
    this.express.use('/api/v1/user', UserController);
    this.express.use('/api/v1/table', PokerTableController);
  }


  private config(): void {
    this.port = process.env.PORT || App.PORT;
  }

  private sockets(): void {
    this.io = socketIo(this.server)
  }



   private listen() {
    this.server.listen(this.port, () => {
        console.log('Running server on port %s', this.port);
    });

    let pokerServices: PokerService[] = [];

    this.io.on('connect', (socket: any) => {
        console.log('Connected client on port %s.', this.port);
        socket.on('message', async (m: Message) => {
            let content: string;
            let contentJSON = JSON.parse(m.content);
            const tableId = contentJSON.table;
            let pokerService: PokerService = null;
            for(let i = 0; i < pokerServices.length; i++) {
                if(pokerServices[i].tableId === tableId) {
                    pokerService = pokerServices[i];
                }
            }
            if (!pokerService) {
                pokerService = new PokerService(tableId);
                pokerServices.push(pokerService);
            }
            if( contentJSON.action === 'JOINED') {
                socket.join(contentJSON.table);
            }
            m = await pokerService.handleMessage(m);
            this.io.to(contentJSON.table).emit('message', m);
            if (pokerService.users.length < 2) {
                this.io.to(contentJSON.table).emit('message', new Message(m.from, JSON.stringify({message: "You should wait for another user"})));
                this.io.to(contentJSON.table).emit('message', new Message(m.from, JSON.stringify({reset: true})));
            }
            if (pokerService.isNew) {
                this.io.to(contentJSON.table).emit('message', new Message(m.from, JSON.stringify(pokerService.tableStatus)));
                pokerService.isNew = false;
            }

        });



        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
  }


}

export default new App().express;

