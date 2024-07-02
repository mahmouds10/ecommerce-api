// Import modules
import express from 'express';

// Import routes
import customerRouter from './Src/Modules/Customers/customers.routes.js';

// Import database connection
import { db_connection } from './DB/db.connection.js';

// Connect to database
db_connection


// Create express Server
const app = express()
app.listen(3000,()=>console.log("Server is running on port 3000"));


// Parese Body
app.use(express.json());

// Use routes
app.use('/Customers' , customerRouter);