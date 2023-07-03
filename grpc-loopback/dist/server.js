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
        this.server.bindAsync('0.0.0.0'.concat(':').concat("3001"), grpc.ServerCredentials.createInsecure(), () => {
            console.log(`Server started on ${'0.0.0.0'.concat(':').concat("3001")}`);
        });
        this.packageDefinition = protoLoader.loadSync(this.PROTO_PATH, {
            keepCase: true,
            longs: String,
            enums: String,
            arrays: true,
        });
        this.userProto = grpc.loadPackageDefinition(this.packageDefinition);
    }
    startServer() {
        // this.server.addService(this.userProto.UserService.service, {
        //   getUsers: (_: any, callback: (arg0: null, arg1: { users: User[] }) => void) => {
        //     callback(null, { users: this.users });
        //   },
        //   addUser: (call: { request: any }, callback: (arg0: null, arg1: any) => void) => {
        //     const user = call.request;
        //     this.users.push(user);
        //     callback(null, user);
        //   },
        // });
        this.server.start();
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
    }
}
exports.SERVER = SERVER;
// const serverInstance = new SERVER();
// serverInstance.startServer();
//# sourceMappingURL=server.js.map