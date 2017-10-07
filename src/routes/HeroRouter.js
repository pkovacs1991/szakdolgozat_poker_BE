"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Heroes = require('../data');
var HeroRouter = /** @class */ (function () {
    /**
     * Initialize the HeroRouter
     */
    function HeroRouter() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    HeroRouter.prototype.getAll = function (req, res, next) {
        res.send(Heroes);
    };
    /**
     * GET Hero by id.
     */
    HeroRouter.prototype.getOne = function (req, res, next) {
        var query = parseInt(req.params.id);
        var hero = Heroes.find(function (hero) { return hero.id === query; });
        if (hero) {
            res.status(200)
                .send({
                message: 'Success',
                status: res.status,
                hero: hero
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the given id.',
                status: res.status
            });
        }
    };
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    HeroRouter.prototype.init = function () {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    };
    return HeroRouter;
}());
exports.HeroRouter = HeroRouter;
// Create the HeroRouter, and export its configured Express.Router
var heroRoutes = new HeroRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
