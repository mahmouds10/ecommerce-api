import { db_connection } from "../../../DB/db.connection.js";

// * Add Order
export const addOrder = (req, res) => {
  const { customer_id, order_items } = req.body;
  const total_amount = order_items.reduce(
    (sum, item) => sum + item.quantity * item.unit_price,
    0
  );

  const orderQuery =
    "INSERT INTO orders (customer_id, total_amount) VALUES (?, ?)";
  db_connection.query(
    orderQuery,
    [customer_id, total_amount],
    (err, orderResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const orderId = orderResults.insertId;
      const orderItemsQuery =
        "INSERT INTO order_items (order_id, product_id, quantity, unit_price, customer_id) VALUES ?";
      const orderItemsData = order_items.map((item) => [
        orderId,
        item.product_id,
        item.quantity,
        item.unit_price,
        customer_id
      ]);

      db_connection.query(orderItemsQuery, [orderItemsData], (err, results) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const orderItemsResponse = order_items.map((item) => ({
          productID: item.product_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }));

        res.status(201).json({
          message: "Order created successfully",
          orderId,
          customer_id,
          order: orderItemsResponse,
        });
      });
    }
  );
};

// * Get average order
export const getAverageOrder = (req, res) => {
  const query = "SELECT AVG(total_amount) AS average_order_value FROM orders";
  db_connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    results[0].average_order_value == null
      ? res.status(200).json({ message: "No orders yet" })
      : res.status(200).json(results[0]);
  });
};