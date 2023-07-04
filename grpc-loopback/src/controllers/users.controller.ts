import { get, post, Request, Response, RestBindings,requestBody } from '@loopback/rest';
import { inject } from '@loopback/context';
import client from '../client';

interface User {
  name: string;
  email: string;
  age: number;
}

interface UsersResponse {
  users: User[];
}

export class UserController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/')
  async getUsers(): Promise<UsersResponse> {
    return new Promise<UsersResponse>((resolve, reject) => {
      client.getUsers(null, (err: any, data: UsersResponse) => {
        if (!err) {
          resolve(data);
        } else {
          console.error(err);
          reject({
            msg: 'There is an issue',
          });
        }
      });
    });
  }

  @post('/add')
  async addUser(@requestBody({ description: 'User object' }) user: User): Promise<{ message: string }> {
    if (!user || !user.name || !user.email || !user.age) {
      return {
        message: 'Invalid user data',
      };
    }

    return new Promise<{ message: string }>((resolve, reject) => {
      client.addUser(user, (err: any, data: User) => {
        if (!err) {
          console.log(data);
          resolve({
            message: 'Data added successfully',
          });
        } else {
          console.error(err);
          reject({
            msg: 'There is an issue',
          });
        }
      });
    });
  }
}
