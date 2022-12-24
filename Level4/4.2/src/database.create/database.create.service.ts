import { Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';

const AWAPI_ENTITY_PATH = 'uploads/swapi'

@Injectable()
export class DatabaseCreateService {
    async readEntityArray(entityName: string): Promise<Record<string, any>[]> {
        const entityPath = `${AWAPI_ENTITY_PATH}/swapi.${entityName}.json`

        const rawdata_people = await fs.readFile(entityPath, 'utf8');
        const peopleData = JSON.parse(rawdata_people);

        console.log(`complete reading file: swapi.${entityName}.json`);

        return peopleData;
    }
}