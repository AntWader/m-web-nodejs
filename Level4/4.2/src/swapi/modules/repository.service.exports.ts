import { BadRequestException } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from "typeorm";


export type entityType = Record<string, any>;
export type repositoryType = Repository<entityType>;
export type relationType = {
    repository: repositoryType,
    property: string,
    column: string,
    create?: boolean,
    nullable?: boolean
};

export async function createEntity(
    entityRepository: repositoryType,
    dto: entityType,
    relations?: relationType[],
) {
    let entityProperties: Partial<entityType>;
    let relationsProperties: Partial<entityType>;

    if (relations) {
        entityProperties = filterProperty(dto, relations.map(relation => relation.property));
        relationsProperties = await fillRelationsDto(dto, relations);
    } else {
        entityProperties = dto;
        relationsProperties = {};
    }

    //console.log({ ...entityProperties, ...relationsProperties });

    let entity = entityRepository.create({ ...entityProperties, ...relationsProperties })
    const result = await entityRepository.save(entity);

    return result;

    //return `This action adds a new ${entityRepository.metadata.targetName}.`;
}

/**
 * Changes properties values with 'unknown' value to null value.
 * 
 * @param dto object with properties to change
 * @returns object with properties with 'unknown' values changed to null
 */
function filterUnknown(dto: entityType) {
    let filtered = {};

    for (const key in dto) {
        if (dto.hasOwnProperty(key)) {
            if (dto[key] === 'unknown') { dto[key] = null; }
            filtered[key as keyof Object] = dto[key];
        }
    }

    return filtered;
}

/**
 * Removes properties from object.
 * 
 * @param dto object with properties to remove
 * @param prop properties list to remove from object
 * @returns object without selected properties
 */
function filterProperty(dto: entityType, prop: string[]) {

    const filtered = Object.keys(dto)
        .filter(key => !prop.includes(key))
        .reduce((obj, key) => {

            obj[key as keyof Object] = dto[key];
            return obj;
        }, {});

    return filtered;
}

async function fillRelationsDto(
    dto: entityType,
    config: relationType[],
) {

    let newObj: entityType = {};
    for (let i = 0; i < config.length; i++) {
        const propertyName = config[i].property;
        let propertyValue = dto[propertyName];

        if (propertyValue) {
            // creates search config, with entity search by id or by column value
            let search = (entityValue: any) => entityValue.id ? { id: entityValue.id } : { [config[i].column]: entityValue };

            if (Array.isArray(propertyValue)) {
                newObj[propertyName] = [];
                for (let j = 0; j < propertyValue.length; j++) {
                    let findEntity = await findOrCreateRepository(config[i], { where: search(propertyValue[j]) });
                    newObj[propertyName].push(findEntity);
                }
            } else {
                newObj[propertyName] = await findOrCreateRepository(config[i], { where: search(propertyValue) });
            }
        }
    }

    return newObj;
}

/**
 * Finds first match entity instance or create new. 
 * If find option defined as {id:number} and entity was not found, throws BadRequestException!
 * 
 * @param rep Repository which is supposed to work with entity objects
 * @param findOption conditions by which entity should be queried, example {where:{id:1}}
 * @returns entity instance
 */
async function findOrCreateRepository(
    relation: relationType,
    findOption: { where: entityType }
) {
    const rep = relation.repository;
    const create = relation.create;
    const nullable = relation.nullable;

    let findRep: any = await rep.findOne(findOption);

    if (findRep) {
        return findRep
    } else {
        if (findOption.where.id) throw new BadRequestException(`${rep.metadata.targetName} with id:${findOption.where.id} not found.`);

        if (create) {
            return rep.create(findOption.where);
        } else if (!nullable) {
            throw new BadRequestException(`${rep.metadata.targetName} with ${JSON.stringify(findOption.where)} not found.`);
        }
    }
}

export async function updateEntity(
    entityId: number,
    entityRepository: repositoryType,
    dto: entityType,
    relations?: relationType[],
) {
    //const filteredDto = filterUnknown(dto);

    let entity = await entityRepository.findOne({ where: { id: entityId } });
    let updateProperties: Partial<entityType>;
    let updateRelations: Partial<entityType>;

    if (relations) {
        updateProperties = filterProperty(dto, relations.map(relation => relation.property));
        updateRelations = await fillRelationsDto(dto, relations);
    } else {
        updateProperties = dto;
        updateRelations = {};
    }

    if (entity) {
        const result = await entityRepository.save(replaceProperties(entity, { ...updateProperties, ...updateRelations }));

        //console.log(result)
        return result;

        //return `This action updates ${entityRepository.metadata.targetName} with id:${entityId} and it\'s relations:${updateRelations}.`;
    } else throw new BadRequestException(`${entityRepository.metadata.targetName} with id:${entityId} not found.`);
}

function replaceProperties(entity: Record<string, any>, updateDto: Record<string, any>) {
    let updateKeys = Object.keys(updateDto);

    for (const [key, value] of Object.entries(entity)) {
        if (updateKeys.includes(key)) {
            entity[key] = updateDto[key];
        }
    }

    return entity;
}

export async function removeEntity(entityId: number, entityRepository: repositoryType,) {
    let entity = await entityRepository.findOne({ where: { id: entityId } });

    if (entity) {
        const result = await entityRepository.remove(entity)

        //console.log(result)
        return result;

        //return `This action removes entity ${entityRepository.metadata.targetName} with id:${entityId}.`;
    } else throw new BadRequestException(`${entityRepository.metadata.targetName} with id:${entityId} not found.`);
}

/**
 * Replaces relation entities objects by relationsConfig column value corresponding to property name within it.
 * 
 * @param obj entity object
 * @param relationsConfig relations config
 * @returns entity object with entity values replaced by entity first column (except id) value.
 */
export function flatten(obj: object, relationsConfig: relationType[]) {
    let flatObj: entityType = {};

    for (const [key, value] of Object.entries(obj)) {
        if (value) { // in case: value = null
            if (Array.isArray(value)) {
                flatObj[key as keyof object] = value.map(val => getEntityColumn(key, val, relationsConfig));
            } else {
                flatObj[key as keyof object] = getEntityColumn(key, value, relationsConfig);
            }
        } else {
            flatObj[key as keyof object] = value;
        }
    }

    return flatObj;
}

function getEntityColumn(key: string, value: any | entityType, relationsConfig: relationType[]) {
    for (const relation of relationsConfig) {
        if (key === relation.property) {
            return value[relation.column];
        }
    }

    return value;
}

export async function findAll(repository: repositoryType, config?: relationType[]) {
    const findAllOption: FindManyOptions = createFindAllOption(config);

    let entities = await repository.find(findAllOption);

    return entities;
}

/**
 * Creates options config for repository.find() method with respect to relations defined in config.
 * 
 * @param config config array of relation config info, such as [property]: relation column name, 
 * and [column]: main info column name.
 * @returns config for finding all entities with all specified in config relations.
 */
function createFindAllOption(config?: relationType[]) {
    const findOption: FindManyOptions = {
        relations: config ? config.map(rel => rel.property) : [],
        select: config ? config
            .reduce((obj, val) => {
                obj[val.property] = { id: true, [val.column]: true };
                return obj;
            }, {} as Record<string, Record<string, boolean> | boolean>) : {},
        relationLoadStrategy: 'query',
    }

    return findOption;
}

export async function findOne(id: number, repository: repositoryType, config?: relationType[]) {
    const findOneOption: FindOneOptions = { ...createFindAllOption(config), where: { id: id } }

    let entity = await repository.findOne(findOneOption);

    if (entity) {
        return entity;
    } else throw new BadRequestException(`${repository.metadata.targetName} with id:${id} not found.`);
}

export async function findAllEntities(repository: repositoryType, config?: relationType[]) {
    const result = await findAll(repository, config);

    if (config) {
        return result.map(entity => flatten(entity, config));
    }

    // if (config) {
    //     return result.map(entity => entity);
    // }

    return result;
}

export async function findOneEntity(id: number, repository: repositoryType, config?: relationType[]) {
    const result = await findOne(id, repository, config);

    if (config) {
        return flatten(result, config);
    }

    return result;
}