import { CreateFilmDto } from "../dto/create-film.dto";
import { CreatePersonDto } from "../dto/create-person.dto";
import { CreatePlanetDto } from "../dto/create-planet.dto";
import { CreateSpeciesDto } from "../dto/create-species.dto";
import { CreateStarshipDto } from "../dto/create-starship.dto";
import { CreateVehicleDto } from "../dto/create-vehicle.dto";

export const mockFilm: CreateFilmDto | { id: number } = {
    id: 0,
    title: "test",
    episode_id: 0,
    opening_crawl: "test",
    director: "test",
    producer: "test",
    release_date: new Date(),
    characters: [],
    planets: [],
    starships: [],
    vehicles: [],
    species: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockPerson: CreatePersonDto | { id: number } = {
    id: 0,
    name: "test",
    height: "test",
    mass: "test",
    hair_color: "test",
    skin_color: "test",
    eye_color: "test",
    birth_year: "test",
    gender: 'gender',
    homeworld: 'http',
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockPlanet: CreatePlanetDto | { id: number } = {
    id: 0,
    name: "test",
    rotation_period: 0,
    orbital_period: 0,
    diameter: 0,
    climate: "test",
    gravity: "test",
    terrain: "test",
    surface_water: 0,
    population: 0,
    species: [],
    residents: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: "http"
}

export const mockStarship: CreateStarshipDto | { id: number } = {
    id: 0,
    name: "test",
    model: "test",
    manufacturer: "test",
    cost_in_credits: 0,
    length: 0,
    max_atmosphering_speed: 0,
    crew: "test",
    passengers: 0,
    cargo_capacity: 0,
    consumables: "test",
    hyperdrive_rating: 0,
    MGLT: 0,
    starship_class: "test",
    pilots: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockVehicle: CreateVehicleDto | { id: number } = {
    id: 0,
    name: "test",
    model: "test",
    manufacturer: "test",
    cost_in_credits: 0,
    length: 0,
    max_atmosphering_speed: 0,
    crew: "test",
    passengers: 0,
    cargo_capacity: 0,
    consumables: "test",
    vehicle_class: "test",
    pilots: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockSpecies: CreateSpeciesDto | { id: number } = {
    id: 0,
    name: "test",
    classification: "test",
    designation: "test",
    average_height: 0,
    skin_colors: "test",
    hair_colors: "test",
    eye_colors: "test",
    average_lifespan: 0,
    homeworld: 'planet',
    language: "test",
    people: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}
