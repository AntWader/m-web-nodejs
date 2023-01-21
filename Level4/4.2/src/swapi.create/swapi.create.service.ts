import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';

export const SWAPI_ENTITY_PATH = 'uploads/swapi'

@Injectable()
export class DatabaseCreateService {
    async readEntityArray(entityName: string, enyityPath?: string): Promise<Record<string, any>[]> {
        const entityPath = `${SWAPI_ENTITY_PATH}/swapi.${entityName}.json`

        const rawdata_people = await fs.readFile(entityPath, 'utf8');
        const peopleData = JSON.parse(rawdata_people);

        console.log(`complete reading file: swapi.${entityName}.json`);

        return peopleData;
    }
}