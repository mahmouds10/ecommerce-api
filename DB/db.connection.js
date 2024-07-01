import mysql2 from 'mysql2';
export const db_connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_db'
});

db_connection.connect(err=>{
    if(err){
        console.log("Connection error: " + err);
    }
    else{
        console.log("Connection established successfully");
    }
})