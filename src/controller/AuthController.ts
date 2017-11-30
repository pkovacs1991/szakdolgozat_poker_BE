import {Router, Request, Response, NextFunction} from 'express';
import {AuthService} from "../service/AuhService";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {encode,decode}  from 'jwt-simple'
import {User} from "../entity/User";

export class AuthController {
    router: Router;
    secret: string = 'secret';
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

        let result = await AuthService.loginUser(req);
        let message;
        let token;
        if (result) {
            try {
            token = encode({id: result.id}, 'secret');
            console.log(token);
            message = {
                user: result,
                token:token};
            console.log(message);
            } catch (e) {
                console.log(e);
            }
        } else {
            message = "Fail";
            res.status(400);
        }
        console.log(message);
        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Register a User.
     */
    public async postRegister(req: Request, res: Response, next: NextFunction) {
        console.log(req);
        let message = await AuthService.registerUser(req.body);
        res.header('Content-type','application/json');
        res.send(message);


    }


    /**
     * Get the current User.
     */
    public async getUser(req: Request, res: Response, next: NextFunction) {

        let message;

        try {
            message = await AuthService.currentUser(req);

        } catch (e) {
            if (e instanceof NotAuthenticatedException) {
                message = {
                    response: "Not authenticated"

                };
                res.status(403);
            }
        }
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
