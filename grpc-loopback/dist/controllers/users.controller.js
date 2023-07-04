"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const context_1 = require("@loopback/context");
const client_1 = tslib_1.__importDefault(require("../client"));
let UserController = class UserController {
    constructor(req) {
        this.req = req;
    }
    async getUsers() {
        return new Promise((resolve, reject) => {
            client_1.default.getUsers(null, (err, data) => {
                if (!err) {
                    resolve(data);
                }
                else {
                    console.error(err);
                    reject({
                        msg: 'There is an issue',
                    });
                }
            });
        });
    }
    async addUser(user) {
        if (!user || !user.name || !user.email || !user.age) {
            return {
                message: 'Invalid user data',
            };
        }
        return new Promise((resolve, reject) => {
            client_1.default.addUser(user, (err, data) => {
                if (!err) {
                    console.log(data);
                    resolve({
                        message: 'Data added successfully',
                    });
                }
                else {
                    console.error(err);
                    reject({
                        msg: 'There is an issue',
                    });
                }
            });
        });
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
tslib_1.__decorate([
    (0, rest_1.post)('/add'),
    tslib_1.__param(0, (0, rest_1.requestBody)({ description: 'User object' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, (0, context_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map