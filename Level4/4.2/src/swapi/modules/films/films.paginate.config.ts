import { PaginateConfig } from "nestjs-paginate";
import { Film } from "src/swapi/entities/film.entity";

export const filmPaginateConfig: PaginateConfig<Film> = {
    sortableColumns: ['id', 'title',],
    nullSort: 'last',
    searchableColumns: ['title',],
    defaultSortBy: [['id', 'DESC']],
    defaultLimit: 1,
};