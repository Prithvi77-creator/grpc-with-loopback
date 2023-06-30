const PROTO_PATH = "./protos/user.proto"

import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

async function main() {

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition)

const server = new grpc.Server()

let users =[{
    name : "Yash",
    email : "test@gmail.com",
    age : 12
}]

server.addService(userProto.UserService.service , {
    getUsers : (_ , callback) => {
        callback(null, {users})
    },
    addUser: (call , callback) => {
        const user = call.request;
        users.push(user)
        callback(null, user);
    },
});


server.bindAsync(
    "127.0.0.1:30043",
    grpc.ServerCredentials.createInsecure(),
    () => {
        server.start();
        console.log("server started on 127.0.0.1:30043");
    }
    );
}

module.exports = server;
