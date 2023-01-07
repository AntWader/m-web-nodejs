import { PaginateConfig } from "nestjs-paginate";
import { Species } from "src/swapi/entities/species.entity";

export const speciesPaginateConfig: PaginateConfig<Species> = {
    sortableColumns: ['id', 'name',],
    nullSort: 'last',
    searchableColumns: ['name',],
    defaultSortBy: [['id', 'DESC']],
    defaultLimit: 5,
};