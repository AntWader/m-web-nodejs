import express from "express";
import bodyParser from "body-parser";

const app = express()
const port = 3005

// create application/json parser
let jsonParser = bodyParser.json()

type itemType = { id: number, text: string, checked: boolean };

type dataType = {
  items: itemType[];
} & Record<string, any>;

let data = { items: [{ id: 0, text: '...', checked: true }] } as dataType;
let currentId: number = 0;

//console.log(data.items);

app.get('/api/v1/items', jsonParser, (req, res) => {
  console.log("get: ")
  console.log(req.body)
  res.send(data)
})

app.post('/api/v1/items', jsonParser, (
  req: { body: { text: itemType["text"] } } & Record<string, any>,
  res
) => {
  console.log("post: ")
  console.log(req.body)

  currentId++;
  data.items.push({ id: currentId, text: req.body.text, checked: true });

  res.send({ id: currentId })
})

app.put('/api/v1/items', jsonParser, (
  req: { body: itemType } & Record<string, any>,
  res
) => {
  console.log("put: ")
  console.log(req.body)

  if (req.body.id > currentId || req.body.id < 0) {
    res.send({ "ok": false })
  } else {
    data.items.forEach((element, index) => {
      if (element.id === req.body.id) {
        data.items[index] = req.body;
      }
    });

    res.send({ "ok": true });
  }
})

app.delete('/api/v1/items', jsonParser, (
  req: { body: { id: itemType["id"] } } & Record<string, any>, 
  res
  ) => {
  console.log("delete: ")
  console.log(req.body)

  if (req.body.id > currentId || req.body.id < 0) {
    res.send({ "ok": false })
  } else {
    data.items.forEach((element, index) => {
      if (element.id === req.body.id) {
        delete data.items[index];
      }
    });

    res.send({ "ok": true });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}/api`)
})