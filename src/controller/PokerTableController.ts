import {Router, Request, Response, NextFunction} from 'express';
import {PokerTableService} from "../service/PokerTableService";
import {NotAuthenticatedException} from "../exception/NotAuthenticatedException";
import {NotAuthoreizedException} from "../exception/NotAuthorizedException";
import {UniqueConstraintException} from "../exception/UniqueConstraintException";
import {NullConstraintException} from "../exception/NullConstraintException";

export class PokerTableController {
    router: Router;

    /**
     * Initialize the AuthController
     */
    constructor() {
        this.router = Router();

        this.init();

    }

    /**
     * Create a new Poker table.
     */
    public async postCreateTable(req: Request, res: Response, next: NextFunction) {
        let message;
        try {
            let newUser = await PokerTableService.createTable(req.body, req);
            if(newUser.id) {
                message = newUser;
            } else {
                message  = {
                    response: "Create Failed!"

                };
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Create Failed!, Not authenticated"

                };
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Create Failed!, Not Authorized"

                };
                res.status(403);
            }
            if (e instanceof UniqueConstraintException) {
                console.log('hello');
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
     * Update a Poker table.
     */
    public async putUpdateTable(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id;

        let message;
        const pokerTable = req.body;
        try {
            let response = await PokerTableService.updateTable(id, pokerTable, req);
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
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Modify Failed!, Not Authorized"

                };
                res.status(403);
            }
            if (e instanceof UniqueConstraintException) {
                console.log('hello');
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
     * Delete a Poker table.
     */
    public async deleteTable(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id;
        let message;
        try {
            let response = await PokerTableService.deletePokerTable(id, req);
            if (response) {
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
                res.status(401);
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
     * Get a Poker table by Id.
     */
    public async getTable(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;
        let message;
        try {
            let user = await PokerTableService.getTable(id, req);
            if(user) {
                message = user;
            } else {
                message  = {
                    response: "Poker Table not found!"

                };
                res.status(400);
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Poker Table get Failed!, Not authenticated"

                };
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Poker Table get Failed!, Not Authorized"

                };
                res.status(403);
            }
        }
        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Get all Poker table.
     */
    public async getTables(req: Request, res: Response, next: NextFunction) {


        let message;
        try {
            let user = await PokerTableService.getTables(req);
            message = user;
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Poker Tables get Failed!, Not authenticated"

                };
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Poker Tables get Failed!, Not Authorized"

                };
                res.status(403);
            }
        }
        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Join a user into a Poker table.
     */
    public async getJoinTable(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id;

        let message;
        try {
            let response = await PokerTableService.joinTable(id, req);
            if (response) {
                message = {
                    response: "Join Success!"
                };
            } else {
                message = {
                    response: "Join Failed!"

                };
                res.status(400);
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Join Failed!, Not authenticated"

                };
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Join Failed!, Not Authorized"

                };
                res.status(403);
            }
        }


        res.header('Content-type','application/json');
        res.send(message);

    }

    /**
     * Leave a user from a Poker table.
     */
    public async getLeaveTable(req: Request, res: Response, next: NextFunction) {

        const id = req.params.id;

        let message;
        try {
            let response = await PokerTableService.leaveTable(id, req);
            if (response) {
                message = {
                    response: "Leave Success!"
                };
            } else {
                message = {
                    response: "Leave Failed!"

                };
                res.status(400);
            }
        } catch (e) {
            if(e instanceof NotAuthenticatedException){
                message = {
                    response: "Leave Failed!, Not authenticated"

                };
                res.status(401);
            }
            if(e instanceof NotAuthoreizedException){
                message = {
                    response: "Leave Failed!, Not Authorized"

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
        this.router.get('/',this.getTables);
        this.router.get('/:id',this.getTable);
        this.router.post('/', this.postCreateTable);
        this.router.put('/:id',this.putUpdateTable);
        this.router.delete('/:id',this.deleteTable);
        this.router.get('/join/:id',this.getJoinTable);
        this.router.get('/leave/:id',this.getLeaveTable);
    }

}

// Create the AuthController, and export its configured Express.Router
const pokerTableController = new PokerTableController( );
pokerTableController.init();

export default pokerTableController.router;
