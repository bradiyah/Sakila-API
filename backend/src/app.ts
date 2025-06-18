import express from "express";
import { db } from "./database/db";
import cors from "cors";
import filmRoutes from "./routes/filmRoutes";
import path from "path"; // agregado para el favicon
import dbRoutes from "./routes/dbRoutes";

const app = express();

// ...

app.use("/api/db", dbRoutes);

//Esto permite servir favicon.ico, imágenes, etc.
app.use(express.static(path.join(__dirname, "../public")));

// Middleware
app.use(cors());
app.use(express.json());

// Usar rutas
app.use("/api/films", filmRoutes);

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, "../../frontend/public"))); // CSS, imágenes, etc.
app.use("/dist", express.static(path.join(__dirname, "../../frontend/dist"))); // JS compilado

// Ruta para el frontend (index.html)
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/public/index.html"));
});

export default app;
