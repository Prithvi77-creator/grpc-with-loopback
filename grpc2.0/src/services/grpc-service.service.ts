import {inject, Provider} from '@loopback/core';
import {TestDataSource} from '../datasources/grpc.datasource';
import {grpc} from '@grpc/grpc-js'
import {protoLoader} from '@grpc/proto-loader'
const PROTO_PATH = "./protos/user.proto"


export class Test implements Provider<any> {
  constructor(
    // hellods must match the name property in the datasource json file
    @inject('datasources.')
    protected dataSource: TestDataSource = new TestDataSource(),
  ) { }
  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true,
});

const userProto = grpc.loadPackageDefinition(this.packageDefinition)

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
