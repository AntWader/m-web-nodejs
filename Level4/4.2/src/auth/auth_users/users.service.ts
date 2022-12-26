import { Injectable } from '@nestjs/common';
import { User, users as usersData } from './users.list';

@Injectable()
export class UsersService {
    private readonly users = [...usersData];

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
