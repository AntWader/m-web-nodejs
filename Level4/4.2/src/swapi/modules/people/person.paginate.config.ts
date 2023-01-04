import { PaginateConfig } from "nestjs-paginate";
import { Person } from "src/swapi/entities/person.entity";

export const personPaginateConfig: PaginateConfig<Person> = {
  sortableColumns: ['id', 'name',],
  nullSort: 'last',
  searchableColumns: ['name',],
  defaultSortBy: [['id', 'DESC']],
  defaultLimit: 10,
};