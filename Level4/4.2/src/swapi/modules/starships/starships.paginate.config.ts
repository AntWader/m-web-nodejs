import { PaginateConfig } from "nestjs-paginate";
import { Starship } from "src/swapi/entities/starship.entity";

export const starshipPaginateConfig: PaginateConfig<Starship> = {
    sortableColumns: ['id', 'name',],
    nullSort: 'last',
    searchableColumns: ['name',],
    defaultSortBy: [['id', 'DESC']],
    defaultLimit: 5,
};