import { db_connection } from "./../../../DB/db.connection.js";

export const addProduct = (req, res) => {
  const { product_name, category, unit_price } = req.body;
  const requiredFields = [];
  if (!product_name) requiredFields.push("product_name");
  if (!category) requiredFields.push("category");
  if (!unit_price) requiredFields.push("unit_price");
  if (requiredFields.length) {
    return res.status(400).json({
      message: "The following fields are required:",
      requiredFields: requiredFields,
    });
  }

  const query =
    "INSERT INTO products (product_name, category, unit_price) VALUES (?, ?, ?)";
  db_connection.query(
    query,
    [product_name, category, unit_price],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({
        message: "Product added successfully",
        product: {
          product_name,
          category,
          unit_price,
        },
      });
    }
  );
};

// * Get total revenue for each category
export const totalRevenueByCategory = (req, res) => {
    const query = `
        SELECT p.category, SUM(oi.quantity * oi.unit_price) AS total_revenue
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY p.category
    `;
    db_connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        results.length?res.json(results):res.json({message: "No category's products were sold"});
    });
};

// * Get total number of items sold for each product
export const itemsSoldPerProduct = (req, res) => {
    const query = `
        SELECT p.product_name, SUM(oi.quantity) AS total_items_sold
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        GROUP BY p.product_name
    `;

    db_connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        results.length?res.json(results):res.json({message: "No items sold"});
    });
};
