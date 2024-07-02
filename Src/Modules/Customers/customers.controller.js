import { db_connection } from "../../../DB/db.connection.js";

// * Sign up
export const sugnUp = (req, res) => {
  const { firstName, lastName, email, phone } = req.body;
  const missingFields = [];
  if (!firstName) missingFields.push("firstName");
  if (!lastName) missingFields.push("lastName");
  if (!email) missingFields.push("email");
  if (!phone) missingFields.push("phone");

  if (missingFields.length) {
    return res.status(400).json({
      message: "The following fields are required:",
      missingFields: missingFields,
    });
  }

  const signUpQuery = `
    INSERT INTO customers(first_name, last_name, email, phone) values
     ('${firstName}','${lastName}','${email}','${phone}') 
    `;
  const selectQuery = `SELECT * from customers where email = '${email}' `;
  db_connection.query(selectQuery, (err, selectResult) => {
    if (err) {
      console.log("Select error");
      console.log(err);
      res.status(500).json({ message: "select error", error: err.message });
    } else {
      console.log("Selected customers successfully");
      console.log(selectResult);
      if (selectResult.length) {
        res.status(409).json({
          message: "Email already in use",
        });
      } else {
        db_connection.execute(
          signUpQuery,
          [firstName, lastName, email, phone],
          (err, result) => {
            if (err) {
              res.status(500).json({
                message: "SignUp query error",
                error: err.message,
              });
            } else {
              console.log(result);
              res.status(201).json({
                message: "User added successfully",
                user: {
                  firstName,
                  lastName,
                  email,
                  phone,
                },
              });
            }
          }
        );
      }
    }
  });
};

// * Login
export const login = (req, res) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({
      message: "email is required",
    });
  const query = `SELECT * FROM customers WHERE email = '${email}' `;
  db_connection.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Select query error", error: err.message });
    }
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }
    res.json({ message: "Logged in successfully", user: results[0] });
  });
};

// * Remove customer
export const removeCustomer = (req, res) => {
  const id = req.query.id;
  const deleteQuery = `
        delete from customers where id = ${id} 
    `;
  db_connection.execute(deleteQuery, (err, result) => {
    if (err) {
      console.log(err);
      res
        .status(400)
        .json({ message: "Remove query error", error: err.message });
    } else {
      if (result.affectedRows) {
        res.status(200).json({ message: "Customer deleted successfully" });
      } else {
        res.status(404).json({ message: "No customer found" });
      }
    }
  });
}