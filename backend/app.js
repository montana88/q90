
const fs = require("node:fs/promises");
const bodyParser = require("body-parser");

const express = require('express');
const { list } = require("postcss");
const { log } = require("node:console");
const app = express();
const port = 3000;

app.use(bodyParser.json());
// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('auth/login', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/users.json");
  
  const usersData = JSON.parse(fileContent);
  console.log(usersList);
  console.log(req);
  res.status(200).json({ places: placesData });
})

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
