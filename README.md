# Ecommerce API

This project provides an API for managing customers, products, and orders in an ecommerce application. The API supports operations such as adding customers, placing orders, and retrieving various analytics.

## Table of Contents

-   [Project Description](#project-description)
-   [Setup Instructions](#setup-instructions)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Database Setup](#database-setup)
-   [API Documentation](#api-documentation)
    -   [Customers](#customers)
    -   [Orders](#orders)
    -   [Products](#products)
-   [Usage](#usage)
    -   [Running the Server](#running-the-server)
    -   [Importing Postman Collection](#importing-postman-collection)
-   [License](#license)

## Project Description

The Ecommerce API is a backend service that manages the core functionality of an ecommerce platform. It includes endpoints for:

-   Customer registration and management.
-   Order placement and management.
-   Product management and sales analytics.

## Setup Instructions

### Prerequisites

To run this project, you will need the following installed on your machine:

-   [Node.js](https://nodejs.org/) (version 14.x or higher)
-   XAMPP (for MySQL server)

### Installation

1.  **Clone the repository**:
    
    ```bash 
    git clone https://github.com/mahmouds10/ecommerce-api.git
    cd ecommerce-api
     ``` 
2.  **Install the dependencies**:
    
    ```bash 
    npm install
     ``` 
    

### Database Setup

1.  **Start XAMPP** and ensure the MySQL service is running.
    
2.  **Create the database**:
    
    -   Open phpMyAdmin or your preferred MySQL client.
    -   Execute the SQL script `ecommerce_db.sql` to set up the database schema and sample data. You can find this script in the project root directory.
    
    ```sql
    `-- In phpMyAdmin or MySQL CLI
    source path/to/ecommerce_db.sql; 
    ```

## API Documentation

### Customers

-   **Signup**: `POST /Customers/signup`
    
    -   Request body:
        
        ```json         
        {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john.doe@example.com",
          "phone": "1234567890"
        }
    -   Description: Register a new customer with unique email.
-   **Login**: `POST /Customers/login`
    
    -   Request body:
        
       ``` json
        {
          "email": "john.doe@example.com"
        }
       ```
    -   Description: Login an existing customer using their email.
-   **Remove Customer**: `DELETE /Customers/removeCustomer?id=2`
    
    -   URL Parameter: `id` (Customer ID to be removed)
    -   Description: Remove a customer by their ID.
-   **Customers with No Orders**: `GET /Customers/noOrders`
    
    -   Description: List all customers who have not made any orders.
-   **Customer with Most Purchased Items**: `GET /Customers/mostItems`
    
    -   Description: Find the customer who has purchased the most items in total.
-   **Top Spending Customers**: `GET /Customers/mostspend`
    
    -   Description: List the top 10 customers who have spent the most money.
-   **Customers with At Least N Orders**: `GET /Customers/minOrders`
    
    -   Description: List all customers who have made at least a specified number of orders. Defaults to 10.
-   **Multi-Order Customers Percentage**: `GET /Customers/multiOrderPercentage`
    
    -   Description: Find the percentage of customers who have made more than one order.
-   **Customer with Earliest Order**: `GET /Customers/earliestOrder`
    
    -   Description: Find the customer who made the earliest order.

### Orders

-   **Add Order**: `POST /Orders/addOrder`
    
    -   Request body:
        
        ```json
        {
          "customer_id": 10,
          "order_items": [
            {
              "product_id": 8,
              "quantity": 2,
              "unit_price": 50.00
            },
            {
              "product_id": 11,
              "quantity": 3,
              "unit_price": 10.00
            }
          ]
        }
        ```       
    -   Description: Add a new order for a customer.
-   **Average Order Value**: `GET /Orders/averageValeu`
    
    -   Description: Calculate the average order value.

### Products

-   **Add Product**: `POST /Products/addProduct`
    
    -   Request body:
        
        ```json
        {
          "product_name": "Body Lotion",
          "category": "Beauty",
          "unit_price": "40.00"
        }   
        ```      
    -   Description: Add a new product.
-   **Revenue by Category**: `GET /Products/revenue`
    
    -   Description: Get the revenue for each product category.
-   **Number of Items Sold per Product**: `GET /Products/sales`
    -   Description: Count the items sold for each product.

## Usage

### Running the Server

1.  **Start the MySQL server** through XAMPP.
2.  **Run the API server**:
    
   ``` bash
 npm start 
 ```
    
   The server will start on `http://localhost:3000` by default.

### Importing Postman Collection

To test the API endpoints, you can import the provided Postman collection:


1.  Open [Postman](https://www.postman.com/).
2.  Click on `Import` in the top left corner.
3.  Select the attached `Ecommerce.postman_collection.json` file.
4.  The collection named "Ecommerce" will be added to your Postman, allowing you to easily test the API endpoints.
