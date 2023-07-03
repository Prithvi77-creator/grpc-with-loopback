"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
const application_1 = require("./application");
const express_1 = tslib_1.__importDefault(require("express"));
const server_1 = require("./server");
tslib_1.__exportStar(require("./application"), exports);
tslib_1.__exportStar(require("./server"), exports);
async function main(options = {}) {
    var _a;
    const app = new application_1.GrpcLoopbackApplication(options);
    const grpcServer = new server_1.SERVER();
    await app.boot();
    await app.start();
    // Create a separate Express server
    const expressApp = (0, express_1.default)();
    expressApp.use(express_1.default.json());
    expressApp.use(express_1.default.urlencoded({ extended: true }));
    const url = app.restServer.url;
    console.log(`Try ${url}/ping`);
    // Start the gRPC server
    grpcServer.startServer();
    // Start the Express server
    const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
    expressApp.listen(port, () => {
        console.log(`Express server is running on port ${port}`);
    });
    return app;
}
exports.main = main;
if (require.main === module) {
    // Run the application
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: process.env.HOST,
            // The `gracePeriodForClose` provides a graceful close for http/https
            // servers with keep-alive clients. The default value is `Infinity`
            // (don't force-close). If you want to immediately destroy all sockets
            // upon stop, set its value to `0`.
            // See https://www.npmjs.com/package/stoppable
            gracePeriodForClose: 5000,
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    main(config).catch((err) => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map