// Get an instance of mysql we can use in the app
import * as mysql from 'mysql'

// Create a 'connection pool' using the provided credentials
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.HOST,
    user            : "root",
    password        : process.env.PASSWORD,
    database        : process.env.DATABASE,
});

// Export it for use in our applicaiton
export { pool };