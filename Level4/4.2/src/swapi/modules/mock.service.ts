import { entityType } from "./repository.service.exports";

// const entitiesNum = 20;

// const entitiesList = [...Array(entitiesNum).keys()].map((_, i) => {
//     return { id: i, url: `url #${i}` }
// });

type testDtoType = Record<string, any>;

// Error response
export const notOk = { ok: false };

// export const mockService = {
//     create: jest.fn(async (dto: testDtoType) => {
//         return {
//             id: 0,
//             ...dto
//         }
//     }),
//     findAll: jest.fn(async () => {
//         return entitiesList;
//     }),
//     getPage: jest.fn(async (query: { page: number }) => {
//         if (query.page > 0 && query.page < 2) {
//             return entitiesList.slice(0, 10);
//         } else {
//             return notOk;
//         }
//     }),
//     findOne: jest.fn(async (id: number) => {
//         if (id in [...entitiesList.keys()]) {
//             return entitiesList[id];
//         } else {
//             return notOk;
//         }
//     }),
//     update: jest.fn(async (id: number, dto: testDtoType) => {
//         if (id in [...entitiesList.keys()]) {
//             return {
//                 ...entitiesList[id],
//                 ...dto
//             };
//         } else {
//             return notOk;
//         }
//     }),
//     remove: jest.fn(async (id: number) => {
//         if (id in [...entitiesList.keys()]) {
//             return entitiesList[id];
//         } else {
//             return notOk;
//         }
//     }),
// }

export class MockService {
    entitiesList: entityType[];
    createEntityNumber: number;
    constructor(createEntityNumber: number, createEntityTemplatesCallback: (value: number, index: number) => entityType) {
        this.createEntityNumber = createEntityNumber;
        this.entitiesList = [...Array(this.createEntityNumber).keys()].map(createEntityTemplatesCallback);
    }

    create = jest.fn(async (dto: testDtoType) => {
        return {
            id: 0,
            ...dto
        }
    })

    findAll = jest.fn(async () => {
        return this.entitiesList;
    })

    getPage = jest.fn(async (query: { page: number }) => {
        if (query.page > 0 && query.page < 2) {
            return this.entitiesList.slice(0, 10);
        } else {
            return notOk;
        }
    })

    findOne = jest.fn(async (id: number) => {
        if (id in [...this.entitiesList.keys()]) {
            return this.entitiesList[id];
        } else {
            return notOk;
        }
    })

    update = jest.fn(async (id: number, dto: testDtoType) => {
        if (id in [...this.entitiesList.keys()]) {
            return {
                ...this.entitiesList[id],
                ...dto
            };
        } else {
            return notOk;
        }
    })

    remove = jest.fn(async (id: number) => {
        if (id in [...this.entitiesList.keys()]) {
            return this.entitiesList[id];
        } else {
            return notOk;
        }
    })
}