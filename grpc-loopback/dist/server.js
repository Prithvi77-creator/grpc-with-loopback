"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = void 0;
const tslib_1 = require("tslib");
const grpc = tslib_1.__importStar(require("@grpc/grpc-js"));
const protoLoader = tslib_1.__importStar(require("@grpc/proto-loader"));
class SERVER {
    constructor() {
        this.PROTO_PATH = './proto/user.proto';
        this.users = [
            {
                name: 'Yash',
                email: 'test@gmail.com',
                age: 12,
            },
        ];
        this.server = new grpc.Server();
        this.packageDefinition = protoLoader.loadSync(this.PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true,
        });
        this.userProto = grpc.loadPackageDefinition(this.packageDefinition);
    }
    startServer() {
        this.server.addService(this.userProto.UserService.service, {
            getUsers: (_, callback) => {
                callback(null, { users: this.users });
            },
            addUser: (call, callback) => {
                const user = call.request;
                this.users.push(user);
                callback(null, user);
            },
        });
        const bindAddress = '127.0.0.1:30043';
        this.server.bindAsync(bindAddress, grpc.ServerCredentials.createInsecure(), () => {
            this.server.start();
            console.log(`Server started on ${bindAddress}`);
        });
    }
}
exports.SERVER = SERVER;
const serverInstance = new SERVER();
serverInstance.startServer();
//# sourceMappingURL=server.js.map