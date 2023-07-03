import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

interface User {
  name: string;
  email: string;
  age: number;
}

export class SERVER {
  private PROTO_PATH = './proto/user.proto';
  private packageDefinition: any;
  private userProto: any;
  private server: grpc.Server;
  private users: User[];

  constructor() {
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

  public   startServer() {
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
      getUsers: (_: any, callback: (arg0: null, arg1: { users: User[] }) => void) => {
        callback(null, { users: this.users });
      },
      addUser: (call: { request: any }, callback: (arg0: null, arg1: any) => void) => {
        const user = call.request;
        this.users.push(user);
        callback(null, user);
      },
    });
   }
}

// const serverInstance = new SERVER();
// serverInstance.startServer();
