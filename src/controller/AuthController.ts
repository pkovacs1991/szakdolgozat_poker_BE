import {Router, Request, Response, NextFunction} from 'express';
import {AuthService} from "../service/AuhService";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {encode,decode}  from 'jwt-simple'
import {User} from "../entity/User";
import {UniqueConstraintException} from "../exception/UniqueConstraintException";
import {NullConstraintException} from "../exception/NullConstraintException";

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
            message = {
                user: result,
                token:token};
            } catch (e) {
                console.log(e);
            }
        } else {
            message = JSON.stringify({message: 'Fail'});
            res.status(400);
        }
        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Register a User.
     */
    public async postRegister(req: Request, res: Response, next: NextFunction) {
        let message;
        try {
            console.log('starting');
            message = await AuthService.registerUser(req.body);
        } catch (e) {
            if (e instanceof UniqueConstraintException) {
                message = e.message;
                res.status(400);
            }

            if (e instanceof NullConstraintException) {
                message = e.message;
                res.status(400);
            }
        }

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
                res.status(401);
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
        this.router.get('/currentUser',this.getUser);
    }

}

// Create the AuthController, and export its configured Express.Router
const authController = new AuthController( );
authController.init();

export default authController.router;
