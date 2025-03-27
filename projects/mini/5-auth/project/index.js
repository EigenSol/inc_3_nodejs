require("dotenv").config()
const app = require("./src/app")

const PORT = process.env.PORT || 1578

app.listen(PORT, () => {
    console.log(`Server is running on port http://127.0.0.1:${PORT}`)
})