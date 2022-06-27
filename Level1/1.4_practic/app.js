const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile('13.html', { root: __dirname });
})

app.listen(port, () => {
  console.log(`Open the following link in your browser: http://localhost:${port}`)
})