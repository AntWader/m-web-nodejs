import { Injectable } from '@nestjs/common';

// user entity
export type User = {
    userId: number,
    username: string,
    password: string,
};

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            username: 'admin',
            password: 'admin',
            roles: ['admin', 'user'],
        },
        {
            userId: 2,
            username: 'user',
            password: 'password',
            roles: ['user'],
        },
    ];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
