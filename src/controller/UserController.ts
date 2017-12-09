import {Router, Request, Response, NextFunction} from 'express';
import {Session} from "express-session";
import {UserService} from "../service/UserService";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";
import {UniqueConstraintException} from "../exception/UniqueConstraintException";

export class UserController {
    router: Router;

    /**
     * Initialize the AuthController
     */
    constructor() {
        this.router = Router();

        this.init();

    }

    /**
     * Modify a user.
     */
    public async putModify(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        let message;
            const user = req.body;
        try {
            let response = await UserService.modifyUser(id, user, req);
            if (response) {
                message = {
                    response: "Modify Success!"
                };
            } else {
                message = {
                    response: "Modify Failed!"

                };
                res.status(400);
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Modify Failed!, Not authenticated"

                };
                res.status(403);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Modify Failed!, Not Authorized"

                };
                res.status(403);
            }
            if (e instanceof UniqueConstraintException) {
                message = e.message;
                res.status(400);
            }
        }


        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Delete a User by Id.
     */
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        let message;
         try {
            let response = await UserService.deleteUser(id, req);
            if(response) {
                message = {
                    response: "Delete Success!"
                };
            } else {
                message = {
                    response: "Delete Failed!"

                };
                res.status(400);
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Delete Failed!, Not authenticated"

                };
                res.status(403);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Delete Failed!, Not Authorized"

                };
                res.status(403);
            }
        }


        res.header('Content-type','application/json');
        res.send(message);


    }


    /**
     * Get the User by Id.
     */
    public async getUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        let message;

        try {
            let response = await UserService.getUser(id, req);
            if(!response) {
                message = {
                    response: "User not found"
                };
                res.status(400);
            } else {
                message = response;
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Not authenticated"

                };
                res.status(403);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Not Authorized"

                };
                res.status(403);
            }
        }




        res.header('Content-type','application/json');
        res.send(message);

    }


    /**
     * Get the Users.
     */
    public async getUsers(req: Request, res: Response, next: NextFunction) {
        let message;

        try {
            message = await UserService.getUsers( req);


        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Not authenticated"

                };
                res.status(403);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Not Authorized"

                };
                res.status(403);
            }
        }


        res.header('Content-type','application/json');
        res.send(message);

    }


    /**
     * Get the Users.
     */
    public async getResetBalance(req: Request, res: Response, next: NextFunction) {
        let message;

        try {
            let response = await UserService.resetBalance( req);
            if (response) {
                message = {
                    response: "Reset balance success!"
                };
            } else {
                message = {
                    response: "Reset balance Failed!"

                };
                res.status(400);
            }

        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Not authenticated"

                };
                res.status(403);
            }
        }


        res.header('Content-type','application/json');
        res.send(message);

    }




    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.put('/:id', this.putModify);
        this.router.delete('/:id',this.deleteUser);
        this.router.get('/resetBalance',this.getResetBalance);
        this.router.get('/:id',this.getUser);
        this.router.get('',this.getUsers);

    }

}

// Create the UserController, and export its configured Express.Router
const userController = new UserController( );
userController.init();

export default userController.router;