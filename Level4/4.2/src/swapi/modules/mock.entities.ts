import { Film } from "../entities/film.entity";
import { Gender } from "../entities/gender.entity";
import { Person } from "../entities/person.entity";
import { Planet } from "../entities/planet.entity";
import { Species } from "../entities/species.entity";
import { Starship } from "../entities/starship.entity";
import { Vehicle } from "../entities/vehicle.entity";

export const mockFilm: Film = {
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

export const mockPerson: Partial<Person> = {
    id: 0,
    images: [],
    name: "test",
    height: "test",
    mass: "test",
    hair_color: "test",
    skin_color: "test",
    eye_color: "test",
    birth_year: "test",
    gender: { id: 0 } as Gender,
    homeworld: { id: 0 } as Planet,
    films: [],
    species: [],
    vehicles: [],
    starships: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockPlanet: Planet = {
    id: 0,
    name: "test",
    rotation_period: "test",
    orbital_period: "test",
    diameter: "test",
    climate: "test",
    gravity: "test",
    terrain: "test",
    surface_water: "test",
    population: "test",
    species: [],
    residents: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockStarship: Starship = {
    id: 0,
    name: "test",
    model: "test",
    manufacturer: "test",
    cost_in_credits: "test",
    length: "test",
    max_atmosphering_speed: "test",
    crew: "test",
    passengers: "test",
    cargo_capacity: "test",
    consumables: "test",
    hyperdrive_rating: "test",
    MGLT: "test",
    starship_class: "test",
    pilots: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockVehicle: Vehicle = {
    id: 0,
    name: "test",
    model: "test",
    manufacturer: "test",
    cost_in_credits: "test",
    length: "test",
    max_atmosphering_speed: "test",
    crew: "test",
    passengers: "test",
    cargo_capacity: "test",
    consumables: "test",
    vehicle_class: "test",
    pilots: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}

export const mockSpecies: Species = {
    id: 0,
    name: "test",
    classification: "test",
    designation: "test",
    average_height: "test",
    skin_colors: "test",
    hair_colors: "test",
    eye_colors: "test",
    average_lifespan: "test",
    homeworld: { id: 0 } as Planet,
    language: "test",
    people: [],
    films: [],
    created: new Date(),
    edited: new Date(),
    url: ""
}
