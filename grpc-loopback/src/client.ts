import { loadPackageDefinition, credentials, ServiceClientConstructor } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const PROTO_PATH = './proto/user.proto';

const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition);
const UserService = protoDescriptor.UserService as ServiceClientConstructor;

const client = new UserService(
  'localhost:3001',
  credentials.createInsecure()
);

export default client;