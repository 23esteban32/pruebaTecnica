import { Router } from "express";
import pool from "../db";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
//generador de token
export const generateToken = (payload: any) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || "secretKey",
    { expiresIn: "1h" }
  );
};

import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// Ruta protegida prueba
router.get("/me", authMiddleware, async (req, res) => {
  res.json({
    message: "Ruta protegida accesible",
    user: (req as any).user,
  });
});


// Crear usuario (Registro)
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)",
      [email, passwordHash, role || "user"]
    );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// validacion jwt
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son requeridos" });
  }

  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no registrado" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    };


    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});




export default router;
