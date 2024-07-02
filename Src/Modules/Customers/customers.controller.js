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
};

// *  Customers haven't made any orders
export const getCustomersWithoutOrder = (req, res) => {
  const query = `
  SELECT c.id, c.first_name, c.last_name
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id
  WHERE o.id IS NULL
`;

  db_connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// * Get Customer with Most Items Purchased
export const mostItemsPurchased = (req, res) => {
  const query = `
    SELECT c.id, c.first_name, c.last_name, SUM(oi.quantity) AS total_items
FROM customers c
JOIN orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY c.id
ORDER BY total_items DESC
LIMIT 1;
  `;
  db_connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!results.length) return res.json({ message: "No items purchased" });
    res.json(results[0]);
  });
};

// * Get most spending customers
export const mostSpending = (req, res) => {
  const limit = parseInt(req.params.limit, 10) || 10;

  if (limit <= 0) {
    return res.status(400).json({ error: "Limit must be a positive integer" });
  }
  const query = `
    SELECT c.id, c.first_name, c.last_name, SUM(o.total_amount) AS total_spent
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    GROUP BY c.id
    ORDER BY total_spent DESC
    LIMIT ${limit}
  `;
  db_connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    !results.length
      ? res.json({ message: "No customers spent any money" })
      : res.json(results);
  });
};

// * Get customers with atleast num of orders
export const minimumOrders = (req, res) => {
  const limit = parseInt(req.params.limit, 10) || 10;

  if (limit <= 0) {
    return res.status(400).json({ error: "Limit must be a positive integer" });
  }
  const query = `
        SELECT c.id, c.first_name, c.last_name, COUNT(o.id) AS total_orders
        FROM customers c
        JOIN orders o ON c.id = o.customer_id
        GROUP BY c.id
        HAVING total_orders >= ${limit}
    `;

  db_connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    !results.length
      ? res.json({ message: `No customers made atleast ${limit} order` })
      : res.json(results);
  });
};

// * Get percentage of multi-order customers
export const multiOrderPercentage = (req, res) => {
  const totalCustomersQuery =
    "SELECT COUNT(*) AS total_customers FROM customers";
  const multipleOrdersQuery = `
      SELECT COUNT(DISTINCT customer_id) AS customers_with_multiple_orders
      FROM orders
      GROUP BY customer_id
      HAVING COUNT(id) > 1
  `;

  db_connection.query(totalCustomersQuery, (err, totalCustomersResult) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const totalCustomers = totalCustomersResult[0].total_customers;

    db_connection.query(multipleOrdersQuery, (err, multipleOrdersResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const customersWithMultipleOrders = multipleOrdersResult.length;
      const percentage = (customersWithMultipleOrders / totalCustomers) * 100;

      res.json({ 
        customersWithMultipleOrders,
        totalCustomers,
        percentage: percentage.toFixed(2) });
    });
  });
};

// * Get customer with earliest order
export const earliestOrder = (req, res) => {
  const query = `
        SELECT c.id, c.first_name, c.last_name, MIN(o.order_date) AS earliest_order_date
        FROM customers c
        JOIN orders o ON c.id = o.customer_id
        GROUP BY c.id
        ORDER BY earliest_order_date ASC
        LIMIT 1
    `;

    db_connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
      results.length? res.json(results[0]): res.json({message: "No orders done yet"});
    });
}