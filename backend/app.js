
const fs = require("node:fs/promises");
const bodyParser = require("body-parser");

const express = require('express');
const { list } = require("postcss");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.post('/auth/login', async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  let usersData;
  const user = await checkCredentials(req.body);

  if (user)
  {
    const data = await fs.readFile("./data/success.json");
    usersData = JSON.parse(data);
  } else {
    const data = await fs.readFile("./data/error.json");
    usersData = JSON.parse(data);
  }
  res.status(200).json(usersData);
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

const checkCredentials = async (credentials, ) => {
  const fileContent = await fs.readFile("./data/users.json");
  const usersData = JSON.parse(fileContent);
  const isUserFound = usersData.findIndex(data => 
    data.username === credentials.username && data.password === credentials.password
  );
  return isUserFound > -1;
}
