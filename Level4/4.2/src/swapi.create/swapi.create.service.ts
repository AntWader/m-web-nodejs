import { Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';

export const SWAPI_ENTITY_PATH = 'uploads/swapi'

@Injectable()
export class DatabaseCreateService {
    constructor(@Inject('BACKUP_PATH') private backupPath: string | undefined) { }

    async readEntityArray(entityName: string): Promise<Record<string, any>[]> {
        // change path if backupPath was specified
        const path = this.backupPath ? this.backupPath : SWAPI_ENTITY_PATH;

        const entityPath = `${path}/swapi.${entityName}.json`

        const rawdata_people = await fs.readFile(entityPath, 'utf8');
        const peopleData = JSON.parse(rawdata_people);

        console.log(`complete reading file: swapi.${entityName}.json`);

        return peopleData;
    }
}