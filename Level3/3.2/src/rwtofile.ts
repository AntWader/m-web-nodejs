import * as fs from 'fs';
import * as path from 'path';

export function writeJSONtoF(relevantPath: string, data: object) {
    fs.writeFileSync(path.join(__dirname, relevantPath), JSON.stringify(data),);
}

export function readJSONfromF(relevantPath: string) {
    return JSON.parse(fs.readFileSync(path.join(__dirname, relevantPath), 'utf-8'));
}