const express = require("express");
const cors = require("cors");
const routes = require("./routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(process.env.BASE_PATH || "/api/v1", routes)


module.exports = app