"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grpc_js_1 = require("@grpc/grpc-js");
const proto_loader_1 = require("@grpc/proto-loader");
const PROTO_PATH = './proto/user.proto';
const packageDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});
const protoDescriptor = (0, grpc_js_1.loadPackageDefinition)(packageDefinition);
const UserService = protoDescriptor.UserService;
const client = new UserService('localhost:3001', grpc_js_1.credentials.createInsecure());
exports.default = client;
//# sourceMappingURL=client.js.map