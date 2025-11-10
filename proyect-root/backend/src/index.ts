import express from "express";
import cors from "cors";
import { pool } from "./db";
import userRoutes from "./routes/users";
import dashboardRoutes from "./routes/dashboard.routes";


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS resultado");
    res.json({ mensaje: "MySQL funcionando", data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en la conexión a MySQL" });
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 AS result");
    res.json({ message: "Conectado a MySQL correctamente", result: rows });
  } catch (error) {
    res.status(500).json({ error: "Error al conectar a MySQL", details: error.message });
  }
});

app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
