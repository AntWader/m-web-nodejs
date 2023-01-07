import { PaginateConfig } from "nestjs-paginate";
import { Gender } from "src/swapi/entities/gender.entity";

export const genderPaginateConfig: PaginateConfig<Gender> = {
  sortableColumns: ['id', 'gender',],
  nullSort: 'last',
  searchableColumns: ['gender',],
  defaultSortBy: [['id', 'DESC']],
  defaultLimit: 5,
};