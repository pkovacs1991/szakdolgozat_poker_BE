import {Router, Request, Response, NextFunction} from 'express';
import {AuthService} from "../service/AuhService";

export class AuthController {
    router: Router

    /**
     * Initialize the AuthController
     */
    constructor() {
        this.router = Router();

        this.init();

    }

    /**
     * Login user with Username and password.
     */
     public async postLogin(req: Request, res: Response, next: NextFunction) {

        let message = await AuthService.loginUser(req);

        if (message == "Fail") {

            res.status(400);
        }
        res.send(message);
    }

    /**
     * Register a User.
     */
    public async postRegister(req: Request, res: Response, next: NextFunction) {
      
        let message = await AuthService.loginUser(req.body);

        res.send(message);


    }


    /**
     * Get the current User.
     */
    public async getUser(req: Request, res: Response, next: NextFunction) {

        let message = await AuthService.currentUser(req);
        res.header('Access-Control-Allow-Origin', 'localhost:4200');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.send(message);

    }


    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/login', this.postLogin);
        this.router.post('/register',this.postRegister);
        this.router.all('/currentUser',this.getUser);
    }

}

// Create the AuthController, and export its configured Express.Router
const authController = new AuthController( );
authController.init();

export default authController.router;
