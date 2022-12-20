
// user entity
export type User = {
    userId: number,
    username: string,
    password: string,
    roles?: string[],
};

export const users: User[] = [
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