"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTop5 = exports.getFilms = void 0;
const db_1 = require("../database/db");
const getFilms = async (_req, res) => {
    try {
        const [rows] = await db_1.db.query("SELECT film_id, title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating FROM film LIMIT 20");
        res.json(rows);
    }
    catch (error) {
        console.error("Error al obtener films:", error);
        res.status(500).json({ message: "Error al obtener films", error });
    }
};
exports.getFilms = getFilms;
const getTop5 = async (_req, res) => {
    try {
        const [rows] = await db_1.db.query(`
      SELECT a.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) AS total_peliculas
      FROM actor a
      JOIN film_actor fa ON a.actor_id = fa.actor_id
      GROUP BY a.actor_id, a.first_name, a.last_name
      ORDER BY total_peliculas DESC
      LIMIT 5;
    `);
        res.json(rows);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al consultar películas disponibles", error });
    }
};
exports.getTop5 = getTop5;
