import { Router } from "express";
import pool from "../db";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Ruta protegida KPIs
router.get("/kpis", authMiddleware, async (req, res) => {
  try {
    // Ventas totales
    const [ventas]: any = await pool.query("SELECT SUM(total_amount) AS totalVentas FROM orders");

    // Número de órdenes
    const [ordenes]: any = await pool.query("SELECT COUNT(*) AS totalOrdenes FROM orders");

    // Ticket promedio
    const ticketPromedio = ventas[0].totalVentas / (ordenes[0].totalOrdenes || 1);

    // Top 5 productos por cantidad vendida
    const [topProductos]: any = await pool.query(`
      SELECT p.name, SUM(oi.quantity) AS totalVendido
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      GROUP BY p.name
      ORDER BY totalVendido DESC
      LIMIT 5
    `);

    res.json({
      data: {
        totalVentas: ventas[0].totalVentas || 0,
        totalOrdenes: ordenes[0].totalOrdenes || 0,
        ticketPromedio: ticketPromedio || 0,
        topProductos: topProductos || [],
      },
      error: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: "Error al obtener KPIs" });
  }
});

//filtros por fecha
router.get("/kpis-filtered", authMiddleware, async (req, res) => {
  const { from, to } = req.query;

  try {
    let whereClause = "";
    const params: any[] = [];
    if (from) {
      whereClause += " order_date >= ?";
      params.push(from);
    }
    if (to) {
      whereClause += from ? " AND order_date <= ?" : " order_date <= ?";
      params.push(to);
    }

    const [ventas]: any = await pool.query(`SELECT SUM(total_amount) AS totalVentas FROM orders ${whereClause}`, params);
    const [ordenes]: any = await pool.query(`SELECT COUNT(*) AS totalOrdenes FROM orders ${whereClause}`, params);

    const ticketPromedio = ventas[0].totalVentas / (ordenes[0].totalOrdenes || 1);

    const [topProductos]: any = await pool.query(`
      SELECT p.name, SUM(oi.quantity) AS totalVendido
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      JOIN orders o ON oi.order_id = o.id
      ${whereClause ? "WHERE " + whereClause.replace(/order_date/g, "o.order_date") : ""}
      GROUP BY p.name
      ORDER BY totalVendido DESC
      LIMIT 5
    `, params);

    res.json({
      data: {
        totalVentas: ventas[0].totalVentas || 0,
        totalOrdenes: ordenes[0].totalOrdenes || 0,
        ticketPromedio: ticketPromedio || 0,
        topProductos: topProductos || [],
      },
      error: null,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: "Error al obtener KPIs filtrados" });
  }
});

router.get("/sales-by-day", authMiddleware, async (req, res) => {
  try {
    const [rows]: any = await pool.query(`
      SELECT DATE(order_date) AS fecha, SUM(total_amount) AS total
      FROM orders
      GROUP BY DATE(order_date)
      ORDER BY DATE(order_date) ASC
    `);
    res.json({ data: rows, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: "Error al obtener ventas por día" });
  }
});

// Top productos (barra)
router.get("/top-products", authMiddleware, async (req, res) => {
  try {
    const [rows]: any = await pool.query(`
      SELECT p.name, SUM(oi.quantity) AS total_vendido
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      GROUP BY p.name
      ORDER BY total_vendido DESC
      LIMIT 5
    `);
    res.json({ data: rows, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: "Error al obtener top productos" });
  }
});

// Métodos de pago (dona)
router.get("/payment-methods", authMiddleware, async (req, res) => {
  try {
    const [rows]: any = await pool.query(`
      SELECT payment_method, COUNT(*) AS cantidad
      FROM orders
      GROUP BY payment_method
    `);
    res.json({ data: rows, error: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, error: "Error al obtener métodos de pago" });
  }
});

//dashboard
// router.get('/dashboard/kpis', async (req, res) => {
//   try {
//     const [salesRows]: any = await pool.query('SELECT SUM(total_amount) as totalSales, COUNT(*) as totalOrders FROM orders');
//     const [avgTicketRows]: any = await pool.query('SELECT AVG(total_amount) as avgTicket FROM orders');
//     const [topProductsRows]: any = await pool.query('SELECT p.name, SUM(oi.quantity) as quantity FROM order_items oi JOIN products p ON oi.product_id = p.id GROUP BY p.name ORDER BY quantity DESC LIMIT 5');

//     res.json({
//       data: {
//         totalSales: salesRows[0].totalSales || 0,
//         totalOrders: salesRows[0].totalOrders || 0,
//         avgTicket: avgTicketRows[0].avgTicket || 0,
//         topProducts: topProductsRows
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Error al obtener KPIs' });
//   }
// });

export default router;
