import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseModule } from '../src/database/database.module';
import { TestDatabaseModule } from './database';
import * as session from 'express-session';
import * as passport from 'passport';
import { RouterModule, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';
import { LoggingInterceptor } from '../src/middleware/logging.interceptor';
import { TransformInterceptor } from '../src/middleware/transform.interceptor';
import { ROUTER_AUTH_PATH, ROUTER_CREATE_DB_PATH, ROUTER_FILMS_PATH, ROUTER_PEOPLE_PATH, ROUTER_GENDERS_PATH, ROUTER_PLANETS_PATH, ROUTER_SPECIES_PATH, ROUTER_STARSHIPS_PATH, ROUTER_VEHICLES_PATH, ROUTER_IMAGES_PATH } from '../src/router/router.config';
import { DatabaseCreateModule } from '../src/swapi.create/swapi.create.module';
import { FilmsModule } from '../src/swapi/modules/films/films.module';
import { GendersModule } from '../src/swapi/modules/genders/genders.module';
import { ImagesModule } from '../src/swapi/modules/images/images.module';
import { PeopleModule } from '../src/swapi/modules/people/people.module';
import { PlanetsModule } from '../src/swapi/modules/planets/planets.module';
import { SpeciesModule } from '../src/swapi/modules/species/species.module';
import { StarshipsModule } from '../src/swapi/modules/starships/starships.module';
import { VehiclesModule } from '../src/swapi/modules/vehicles/vehicles.module';

type AuthType = { username: string, password: string };
const authData: AuthType = { username: "user", password: "password" }

const db = TestDatabaseModule;

describe('RouterController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                DatabaseCreateModule.register({ db: db }),
                FilmsModule.register({ db: db }), PeopleModule.register({ db: db }), GendersModule.register({ db: db }), PlanetsModule.register({ db: db }), SpeciesModule.register({ db: db }), StarshipsModule.register({ db: db }), VehiclesModule.register({ db: db }), ImagesModule.register({ db: db }),
                RouterModule.register([
                    {
                        path: ROUTER_AUTH_PATH,
                        module: AuthModule,
                    },
                    {
                        path: ROUTER_CREATE_DB_PATH,
                        module: DatabaseCreateModule,
                    },
                    {
                        path: ROUTER_FILMS_PATH,
                        module: FilmsModule,
                    },
                    {
                        path: ROUTER_PEOPLE_PATH,
                        module: PeopleModule,
                        children: []
                    },
                    {
                        path: ROUTER_GENDERS_PATH,
                        module: GendersModule,
                    },
                    {
                        path: ROUTER_PLANETS_PATH,
                        module: PlanetsModule,
                    },
                    {
                        path: ROUTER_SPECIES_PATH,
                        module: SpeciesModule,
                    },
                    {
                        path: ROUTER_STARSHIPS_PATH,
                        module: StarshipsModule,
                    },
                    {
                        path: ROUTER_VEHICLES_PATH,
                        module: VehiclesModule,
                    },
                    {
                        path: ROUTER_IMAGES_PATH,
                        module: ImagesModule,
                    },
                ]),
            ],
            providers: [
                {
                    provide: APP_INTERCEPTOR,
                    useClass: TransformInterceptor,
                },
                {
                    provide: APP_INTERCEPTOR,
                    useClass: LoggingInterceptor,
                },
                {
                    provide: APP_FILTER,
                    useClass: HttpExceptionFilter,
                },
            ],
        }).overrideProvider(DatabaseModule).useValue(TestDatabaseModule).compile();

        app = moduleFixture.createNestApplication();

        // use sessions
        app.use(
            session({
                secret: 'my-secret',
                resave: false,
                saveUninitialized: false,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());

        await app.init();
    });

    describe('POST test', () => {
        it('/login (POST) should authorize with response status 201', async () => {
            const response = await request(app.getHttpServer())
                .post('/login')
                .send(authData)

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                data: {
                    userId: expect.any(Number),
                    username: authData.username,
                    roles: expect.arrayContaining<string>([]),
                }
            });
        });
    })

    describe('GET test', () => {
        it('/films (GET) should authorize with response status 200', async () => {
            const server = await app.getHttpServer()

            const response = await attachAuth(request(server).get('/films'), server, authData);

            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expect.any(Object) });
        });

        it('/films (GET) should response with forbidden status 403', async () => {
            const server = await app.getHttpServer()

            const response = await attachAuth(request(server).get('/films'), server, { username: '', password: '' });

            expect(response.status).toEqual(403);
        });
    })

    async function attachAuth(req: request.Test, httpServer: any, auth: AuthType) {
        const getCookie = await request(httpServer).post('/login')
            .send(auth)
        const cookies = getCookie.headers['set-cookie']?.pop().split(';')[0];

        req.cookies = cookies;
        return req;
    }

});
