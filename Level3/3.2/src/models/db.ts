import mysql from "mysql";

const dbConfig = {
    HOST: "85.10.205.173",
    USER: "nodejs32test",
    PASSWORD: "Ant88Woker",
    DB: "nodejs32test"
};

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

export const db = connection;