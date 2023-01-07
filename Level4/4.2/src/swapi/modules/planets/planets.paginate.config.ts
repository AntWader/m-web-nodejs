import { PaginateConfig } from "nestjs-paginate";
import { Planet } from "src/swapi/entities/planet.entity";

export const planetPaginateConfig: PaginateConfig<Planet> = {
    sortableColumns: ['id', 'name',],
    nullSort: 'last',
    searchableColumns: ['name',],
    defaultSortBy: [['id', 'DESC']],
    defaultLimit: 5,
};