import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";


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

    let entity = entityRepository.create({ ...entityProperties, ...relationsProperties })
    await entityRepository.save(entity);

    return `This action adds a new ${entityRepository.metadata.targetName}.`;
}

/**
 * Removes properties from object.
 * 
 * @param dto object with properties to remove
 * @param prop properties list to remove from object
 * @returns object without selected properties
 */
function filterProperty(dto: Object, prop: string[]) {

    const filtered = Object.keys(dto)
        .filter(key => !prop.includes(key))
        .reduce((obj, key) => {
            //@ts-ignore
            obj[key] = dto[key];
            return obj;
        }, {});

    return filtered;
}

async function fillRelationsDto(
    dto: entityType,
    relations: relationType[],
) {

    let newObj: entityType = {};
    for (let i = 0; i < relations.length; i++) {
        //let repository = relations[i].repository;

        const propertyName = relations[i].property;
        let propertyValue = dto[propertyName];

        if (propertyValue) {
            // creates search config, with entity search by id or by column value
            let search = (entityValue: any) => entityValue.id ? { id: entityValue.id } : { [relations[i].column]: entityValue };

            if (Array.isArray(propertyValue)) {
                newObj[propertyName] = [];
                for (let j = 0; j < propertyValue.length; j++) {
                    let findEntity = await findOrCreateRepository(relations[i], { where: search(propertyValue[j]) });
                    newObj[propertyName].push(findEntity);
                }
            } else {
                newObj[propertyName] = await findOrCreateRepository(relations[i], { where: search(propertyValue) });
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
        await entityRepository.save(replaceProperties(entity, { ...updateProperties, ...updateRelations }));

        return `This action updates ${entityRepository.metadata.targetName} with id:${entityId} and it\'s relations:${updateRelations}.`;
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
        await entityRepository.remove(entity)

        return `This action removes a #${entityId} entity`;
    } else throw new BadRequestException(`${entityRepository.metadata.targetName} with id:${entityId} not found.`);
}