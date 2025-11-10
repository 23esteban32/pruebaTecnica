import { pool } from "../src/db";

async function verifySeed() {
  try {
    // Clientes
    const [customers]: any = await pool.query("SELECT * FROM customers");
    console.log("Clientes:", customers);

    // Productos
    const [products]: any = await pool.query("SELECT * FROM products");
    console.log("Productos:", products);

    // Órdenes
    const [orders]: any = await pool.query("SELECT * FROM orders");
    console.log("Órdenes:", orders);

    // Items de órdenes
    const [orderItems]: any = await pool.query("SELECT * FROM order_items");
    console.log("Items de órdenes:", orderItems);

    console.log("Verificación completa, todos los datos visibles arriba.");
    process.exit(0);
  } catch (error) {
    console.error("Error al verificar seed:", error);
    process.exit(1);
  }
}

verifySeed();
