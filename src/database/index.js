import mySQL from 'mysql2'

const db = mySQL.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nanofabdatabase"
})

export default db