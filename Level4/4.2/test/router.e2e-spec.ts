import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { DatabaseModule } from '../src/database/database.module';
import { TestDatabaseModule } from './database';
import * as session from 'express-session';
import * as passport from 'passport';
import { RouterModule, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AuthModule } from '../src/auth/auth.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';
import { LoggingInterceptor } from '../src/middleware/logging.interceptor';
import { TransformInterceptor } from '../src/middleware/transform.interceptor';
import { ROUTER_AUTH_PATH, ROUTER_CREATE_DB_PATH, ROUTER_FILMS_PATH, ROUTER_PEOPLE_PATH, ROUTER_GENDERS_PATH, ROUTER_PLANETS_PATH, ROUTER_SPECIES_PATH, ROUTER_STARSHIPS_PATH, ROUTER_VEHICLES_PATH, ROUTER_IMAGES_PATH } from '../src/router/router.module';
import { DatabaseCreateModule } from '../src/swapi.create/swapi.create.module';
import { FilmsModule } from '../src/swapi/modules/films/films.module';
import { GendersModule } from '../src/swapi/modules/genders/genders.module';
import { ImagesModule } from '../src/swapi/modules/images/images.module';
import { PeopleModule } from '../src/swapi/modules/people/people.module';
import { PlanetsModule } from '../src/swapi/modules/planets/planets.module';
import { SpeciesModule } from '../src/swapi/modules/species/species.module';
import { StarshipsModule } from '../src/swapi/modules/starships/starships.module';
import { VehiclesModule } from '../src/swapi/modules/vehicles/vehicles.module';
import { CreatePersonDto } from 'src/swapi/dto/create-person.dto';

type AuthType = { username: string, password: string };
const authUser: AuthType = { username: "user", password: "password" }
const authAdmin: AuthType = { username: "admin", password: "admin" }

const db = TestDatabaseModule;

describe('RouterController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AuthModule,
                DatabaseCreateModule.register({ db: db, backupPath: 'test/backup' }),
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
                {
                    provide: APP_PIPE,
                    useClass: ValidationPipe
                }
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

    describe('/login (POST) test', () => {
        it('/login (POST) should authorize with response status 201', async () => {
            const response = await request(app.getHttpServer())
                .post('/login')
                .send(authUser)

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({
                data: {
                    userId: expect.any(Number),
                    username: authUser.username,
                    roles: expect.arrayContaining<string>([]),
                }
            });
        });
    })

    // creates DB records if films table is empty
    describe('/create (GET) test', () => {
        it('/create (GET) should authorize and create db content from /backup', async () => {
            const server = await app.getHttpServer()

            // check if records already exists
            const films = await attachAuth(request(server).get('/films'), server, authUser);

            // if films data don't exist, then other data tables also probably empty and need to be created...
            if (films.body.data.length < 1) {
                const response = await attachAuth(request(server).get('/create'), server, authAdmin);

                expect(response.status).toEqual(200);
                expect(response.body).toEqual({ data: expect.any(String) });
            }
        });
    })

    /**
     * Get connect.sid=... cookie and adds it to request.
     * 
     * @param req request
     * @param httpServer yourApp.getHttpServer()
     * @param auth { username: "username", password: "password" }
     * @returns request with attached cookie
     */
    async function attachAuth(req: request.Test, httpServer: any, auth: AuthType) {
        const getCookie = await request(httpServer).post('/login')
            .send(auth)
        const cookies = getCookie.headers['set-cookie']?.pop().split(';')[0];

        req.cookies = cookies;
        return req;
    }

    describe('/people (GET) test', () => {
        it('/people (GET) should authorize and show all people', async () => {
            const server = await app.getHttpServer()

            const response = await attachAuth(request(server).get('/people'), server, authUser);

            //console.log(response.request.url)

            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expect.any(Object) });
        });

        it('/people (GET) should response with forbidden status 403', async () => {
            const server = await app.getHttpServer()

            const response = await attachAuth(request(server).get('/people'), server, { username: '', password: '' });

            //console.log(response.originalUrl)

            expect(response.status).toEqual(403);
        });
    })

    describe('/people (POST) test', () => {
        const testPerson: CreatePersonDto = {
            "name": "Test Skywalker",
            "height": "172",
            "mass": "77",
            "hair_color": "blond",
            "skin_color": "fair",
            "eye_color": "blue",
            "birth_year": "19BBY",
            "gender": "male",
            "homeworld": { id: 1 },
            "films": [
                { "id": 1 }
            ],
            "species": [
                { "id": 1 }
            ],
            "vehicles": [
                { "id": 1 }
            ],
            "starships": [
                { "id": 1 }
            ],
            "created": new Date('2014-12-09T13:50:51.644000Z'),
            "edited": new Date('2014-12-20T21:17:56.891000Z'),
            "url": "https://testurl/people/1/"
        }

        it('/people (POST) add new person', async () => {
            const server = await app.getHttpServer()

            const response = await attachAuth(request(server).post('/people').send(testPerson), server, authAdmin);

            expect(response.status).toEqual(201);
            expect(response.body).toEqual({ data: expect.any(Object) });
        });
    })

    describe('/people (PATCH) test', () => {
        const patched = { url: "https://new/people/1/" };

        it('/people (PATCH) should change first person', async () => {
            const server = await app.getHttpServer()

            const people = await attachAuth(request(server).get('/people'), server, authUser);
            const patchId: number = people.body.data[people.body.data.length - 1].id;

            const response = await attachAuth(request(server).patch(`/people/${patchId}`).send(patched), server, authAdmin);

            expect(response.status).toEqual(200);
            expect(response.body).toEqual({ data: expect.objectContaining(patched) });
        });
    })

    describe('/people (DELETE) test', () => {
        it('/people (DELETE) should delete first person', async () => {
            const server = await app.getHttpServer()

            const people = await attachAuth(request(server).get('/people'), server, authUser);
            const length = people.body.data.length;
            const deleteId: number = people.body.data[people.body.data.length - 1].id;

            const response = await attachAuth(request(server).delete(`/people/${deleteId}`), server, authAdmin);
            console.log(response.body)

            expect(response.status).toEqual(200);

            const newPeople = await attachAuth(request(server).get('/people'), server, authUser);

            expect(newPeople.body.data.length).toEqual(length - 1);
        });
    })
});
