import { Inject, Injectable } from "@nestjs/common";
import * as fs from 'fs/promises';

@Injectable()
export class DatabaseCreateService {
    constructor(@Inject('BACKUP_PATH') private backupPath: string ) { }

    async readEntityArray(entityName: string): Promise<Record<string, any>[]> {
        const entityPath = `${this.backupPath}/swapi.${entityName}.json`

        const rawdata_people = await fs.readFile(entityPath, 'utf8');
        const peopleData = JSON.parse(rawdata_people);

        console.log(`complete reading file: swapi.${entityName}.json`);

        return peopleData;
    }
}