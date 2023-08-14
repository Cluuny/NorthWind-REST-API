import { SERVER_PORT } from "./config/config.js"
import app from "./src/app.js"
app.listen(SERVER_PORT, (err) => {
    if (err) console.log(err.message)
    console.log(`Listening on PORT -> ${SERVER_PORT}`)
})