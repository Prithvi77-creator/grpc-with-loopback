/// <reference types="express" />
import { Request } from '@loopback/rest';
interface User {
    name: string;
    email: string;
    age: number;
}
interface UsersResponse {
    users: User[];
}
export declare class UserController {
    private req;
    constructor(req: Request);
    getUsers(): Promise<UsersResponse>;
    addUser(user: User): Promise<{
        message: string;
    }>;
}
export {};
