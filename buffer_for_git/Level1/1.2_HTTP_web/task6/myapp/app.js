const express = require('express')
const app = express()
const port = 3000

let i = 0
app.get('/counter', (req, res) => {
  i++
  res.send(`<h1>Counter: ${i}</h1>`)
})

app.listen(port, () => {
  console.log(`Open the following link in your browser: http://localhost:${port}/counter`)
})