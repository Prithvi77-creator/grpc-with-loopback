"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HellodsDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'test',
    connector: 'grpc',
    spec: './protos/user.proto',
    validate: false,
    host: 'localhost',
    port: 50051,
    remotingEnabled: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let HellodsDataSource = class HellodsDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
HellodsDataSource.dataSourceName = 'hellods';
HellodsDataSource.defaultConfig = config;
HellodsDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.hellods', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], HellodsDataSource);
exports.HellodsDataSource = HellodsDataSource;
//# sourceMappingURL=grpc.datasource.js.map