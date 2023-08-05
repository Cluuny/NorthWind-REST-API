import { PORT } from "./config/config.js"
import app from "./src/app.js"
app.listen(PORT, (err) => {
    if (err) console.log(err.message)
    console.log(`Listening on PORT -> ${PORT}`)
})