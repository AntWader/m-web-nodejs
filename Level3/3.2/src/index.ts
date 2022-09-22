import express from "express";
import bodyParser from "body-parser";

import * as path from 'path';

const app = express();
const port = 3055;

// create application/json parser
let jsonParser = bodyParser.json();

// static frontend
app.use('/', express.static(path.join(__dirname, '../frontend/')));

enum button {
    "minus",
    "plus"
}

let counter = [0, 0];

app.post('*', jsonParser,
    (req, res) => {
        console.log(req.url);
        console.log(req.body);

        counter[req.body.button]++;

        res.send(counter);

    })

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/f_3055.html`);
})