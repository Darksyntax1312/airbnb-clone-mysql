const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();


const settings = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
};

const connection = mysql.createConnection(settings);

connection.connect((error)=>{
    if(error){
        console.log(error);
    }else{
        console.log("Connected to MYSQL successfully!")
    }
})

module.exports = connection;