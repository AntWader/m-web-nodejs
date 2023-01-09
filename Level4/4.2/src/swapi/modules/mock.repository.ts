import { entityType } from "./repository.service.exports";

export class MockRepository {
    entitiesList: entityType[];
    createEntityNumber: number;
    constructor(createEntityNumber: number, createEntityTemplatesCallback: (value: number, index: number) => entityType) {
        this.createEntityNumber = createEntityNumber;
        this.entitiesList = [...Array(this.createEntityNumber).keys()].map(createEntityTemplatesCallback);
    }

    metadata = { targetName: 'TestEntity' }

    create = jest.fn().mockImplementation((dto) => dto)

    save = jest.fn().mockImplementation(async (entity) => Promise.resolve({
        id: 0,
        ...entity
    }))

    find = jest.fn(async (options) => {
        return this.entitiesList;
    })

    findOne = jest.fn(async (options: { where: Record<string, any> }) => {
        if (options.where.id in [...this.entitiesList.keys()]) {
            return this.entitiesList[options.where.id];
        } else {
            return undefined;
        }
    })

    remove = jest.fn(async (entity: { id: number }) => {
        if (entity.id in [...this.entitiesList.keys()]) {
            return this.entitiesList[entity.id];
        } else {
            return undefined;
        }
    })
}