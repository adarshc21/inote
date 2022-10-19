require('dotenv').config()
const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT|| 5000

app.use(cors())

connectToMongo();

// Parse Request to Json
app.use(express.json());

app.get('/', (req, res) => {
  res.send("HELLO WORLD")
})

// Available Routes
app.use("/v1/api/auth", require("./routes/auth") );
app.use("/v1/api/notes", require("./routes/notes") );

app.listen(port, () => {
  console.log(`iNote app listening on port ${port}`)
})