import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { Request as RequestType } from "express";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { ROUTER_FILMS_PATH, ROUTER_PEOPLE_PATH, ROUTER_PLANETS_PATH, ROUTER_SPECIES_PATH, ROUTER_STARSHIPS_PATH, ROUTER_VEHICLES_PATH } from "../router/router.module";
import { CreateFilmDto } from "../swapi/dto/create-film.dto";
import { CreatePersonDto } from "../swapi/dto/create-person.dto";
import { CreatePlanetDto } from "../swapi/dto/create-planet.dto";
import { CreateSpeciesDto } from "../swapi/dto/create-species.dto";
import { CreateStarshipDto } from "../swapi/dto/create-starship.dto";
import { CreateVehicleDto } from "../swapi/dto/create-vehicle.dto";
import { FilmsService } from "../swapi/modules/films/films.service";
import { PeopleService } from "../swapi/modules/people/people.service";
import { PlanetsService } from "../swapi/modules/planets/planets.service";
import { SpeciesService } from "../swapi/modules/species/species.service";
import { StarshipsService } from "../swapi/modules/starships/starships.service";
import { VehiclesService } from "../swapi/modules/vehicles/vehicles.service";
import { DatabaseCreateService } from "./swapi.create.service";

@UseGuards(RolesGuard)
@Roles('admin')
@Controller()
export class DatabaseCreateController {
    constructor(
        @Inject('BACKUP_PATH') private backupPath: string,
        private readonly databaseCreateService: DatabaseCreateService,
        private readonly filmsService: FilmsService,
        private readonly peopleService: PeopleService,
        private readonly planetsService: PlanetsService,
        private readonly speciesService: SpeciesService,
        private readonly starshipsService: StarshipsService,
        private readonly vehiclesService: VehiclesService
    ) { }

    @Get()
    async getFile(@Req() req: RequestType) {
        // generate console massage about request
        process.stdout.write(` -> attempt to read entities data from ${this.backupPath} (in project root)`);

        // FIRST create entities
        const films: CreateFilmDto[] = await this.databaseCreateService.readEntityArray('films') as CreateFilmDto[];
        for (const ent of films) {
            await this.filmsService.create(ent);
            console.log(`successfully created film: episode #${ent.episode_id}, tittle - ${ent.title}`)
        }

        const people: CreatePersonDto[] = await this.databaseCreateService.readEntityArray('people') as CreatePersonDto[];
        for (const ent of people) {
            await this.peopleService.create(ent);
            console.log(`successfully created person: name - ${ent.name}`)
        }

        const planets: CreatePlanetDto[] = await this.databaseCreateService.readEntityArray('planets') as CreatePlanetDto[];
        for (const ent of planets) {
            await this.planetsService.create(ent);
            console.log(`successfully created planet: name - ${ent.name}`)
        }

        const species: CreateSpeciesDto[] = await this.databaseCreateService.readEntityArray('species') as CreateSpeciesDto[];
        for (const ent of species) {
            await this.speciesService.create(ent);
            console.log(`successfully created species: name - ${ent.name}`)
        }

        const starships: CreateStarshipDto[] = await this.databaseCreateService.readEntityArray('starships') as CreateStarshipDto[];
        for (const ent of starships) {
            await this.starshipsService.create(ent);
            console.log(`successfully created starship: name - ${ent.name}`)
        }

        const vehicles: CreateVehicleDto[] = await this.databaseCreateService.readEntityArray('vehicles') as CreateVehicleDto[];
        for (const ent of vehicles) {
            await this.vehiclesService.create(ent);
            console.log(`successfully created vehicle: name - ${ent.name}`)
        }

        // SECOND update url values
        const filmsCreated = await this.filmsService.findAll();
        for (const ent of filmsCreated) {
            // const id = filmsCreated.find(element => element.title == ent.title)?.id;
            await this.filmsService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_FILMS_PATH}/${ent.id}` });
            console.log(`successfully updated url value for film: episode #${ent.episode_id}, tittle - ${ent.title}`)
        }

        const peopleCreated = await this.peopleService.findAll();
        for (const ent of peopleCreated) {
            await this.peopleService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_PEOPLE_PATH}/${ent.id}` });
            console.log(`successfully updated url value for person: name - ${ent.name}`)
        }

        const planetsCreated = await this.planetsService.findAll();
        for (const ent of planetsCreated) {
            await this.planetsService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_PLANETS_PATH}/${ent.id}` });
            console.log(`successfully updated url value for planet: name - ${ent.name}`)
        }

        const speciesCreated = await this.speciesService.findAll();
        for (const ent of speciesCreated) {
            await this.speciesService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_SPECIES_PATH}/${ent.id}` });
            console.log(`successfully updated url value for species: name - ${ent.name}`)
        }

        const starshipsCreated = await this.starshipsService.findAll();
        for (const ent of starshipsCreated) {
            await this.starshipsService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_STARSHIPS_PATH}/${ent.id}` });
            console.log(`successfully updated url value for starship: name - ${ent.name}`)
        }

        const vehiclesCreated = await this.vehiclesService.findAll();
        for (const ent of vehiclesCreated) {
            await this.vehiclesService.update(ent.id, { url: `${req.protocol}://${req.get('Host')}/${ROUTER_VEHICLES_PATH}/${ent.id}` });
            console.log(`successfully updated url value for vehicle: name - ${ent.name}`)
        }


        return `swapi db successfully created!`;
    }
}