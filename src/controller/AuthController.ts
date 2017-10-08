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

        let message = await AuthService.loginUser(req.body);
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
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.post('/login', this.postLogin);
        this.router.post('/register',this.postRegister);
    }

}

// Create the AuthController, and export its configured Express.Router
const authController = new AuthController( );
authController.init();

export default authController.router;
