const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.port;

const connection = require("./configuration/configurationDB");


//* start Routes paths *//
const userRoutes = require("./modules/users/routes/user.routes");
const noteRoutes = require("./modules/notes/routes/note.routes")
//* end Routes paths *//
app.use(express.json());
connection();

app.use(userRoutes);
app.use(noteRoutes);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))