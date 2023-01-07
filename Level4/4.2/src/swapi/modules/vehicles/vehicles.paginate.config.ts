import { PaginateConfig } from "nestjs-paginate";
import { Vehicle } from "src/swapi/entities/vehicle.entity";

export const vehiclePaginateConfig: PaginateConfig<Vehicle> = {
    sortableColumns: ['id', 'name',],
    nullSort: 'last',
    searchableColumns: ['name',],
    defaultSortBy: [['id', 'DESC']],
    defaultLimit: 5,
};