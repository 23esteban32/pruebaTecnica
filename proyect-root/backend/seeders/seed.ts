import fs from "fs";
import { pool } from "../src/db";

interface Customer { name: string; email: string }
interface Product { name: string; sku: string; price: number; category: string }
interface OrderItem { product_sku: string; quantity: number; unit_price: number }
interface Order { customer_email: string; order_date: string; status: string; payment_method: string; total_amount: number; items: OrderItem[] }

async function seed() {
  const data = JSON.parse(fs.readFileSync("./seeders/seed.json", "utf-8"));

  try {
    // Insertar clientes
    for (const c of data.customers as Customer[]) {
      await pool.query("INSERT INTO customers (name, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=name", [c.name, c.email]);
    }

    // Insertar productos
    for (const p of data.products as Product[]) {
      await pool.query("INSERT INTO products (name, sku, price, category) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name", [p.name, p.sku, p.price, p.category]);
    }

    // Insertar órdenes y items
    for (const o of data.orders as Order[]) {
      // Obtener customer_id
      const [customerRows]: any = await pool.query("SELECT id FROM customers WHERE email = ?", [o.customer_email]);
      const customer_id = customerRows[0].id;

      const [orderResult]: any = await pool.query(
        "INSERT INTO orders (customer_id, order_date, status, payment_method, total_amount) VALUES (?, ?, ?, ?, ?)",
        [customer_id, o.order_date, o.status, o.payment_method, o.total_amount]
      );
      const order_id = orderResult.insertId;

      // Insertar items
      for (const item of o.items) {
        const [productRows]: any = await pool.query("SELECT id FROM products WHERE sku = ?", [item.product_sku]);
        const product_id = productRows[0].id;

        await pool.query(
          "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
          [order_id, product_id, item.quantity, item.unit_price]
        );
      }
    }

    console.log("Seed completado ");
    process.exit(0);

  } catch (error) {
    console.error("Error en seed:", error);
    process.exit(1);
  }
}

seed();
