const express = require("express");
const cors = require("cors");
const routes = require("./routes")
const auth_middleware = require("./middlewares/auth.middleware")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(auth_middleware)
app.use(process.env.BASE_PATH || "/api/v1", routes)


module.exports = app