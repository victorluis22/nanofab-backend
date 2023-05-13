import app from "./app.js";
import 'dotenv/config'

app.listen(process.env.PORT || 5000)
console.log(`Servidor aberto`)