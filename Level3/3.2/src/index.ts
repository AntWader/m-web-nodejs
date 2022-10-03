import express from "express";

import * as path from 'path';

import { routerAdmin } from './routerAdmin';
import { routerLibrary } from './routerLibrary';

const app = express();
const port = 3000;

// static frontend
app.use('/', express.static(path.join(__dirname, '../frontend/')));

function checkUrl(req: express.Request, res: express.Response, next: () => void) {
    console.log(req.originalUrl);
    next();
}

app.use(checkUrl);

app.use('/', routerLibrary);

app.use('/admin', routerAdmin);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});