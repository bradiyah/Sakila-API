"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailable = exports.getFilms = void 0;
const db_1 = require("../database/db");
//Lógica de getFilms
const getFilms = async (_req, res) => {
    try {
        //Llamamos a getDbPool para comprobar conexion
        const db = (0, db_1.getDbPool)();
        const [rows] = await db.query('SELECT film_id, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating FROM film;');
        res.json(rows);
    }
    catch (error) {
        console.error('Error al obtener films:', error);
        res.status(500).json({ message: 'Error al obtener films', error });
    }
};
exports.getFilms = getFilms;
//Lógica de de getAvailable
const getAvailable = async (_req, res) => {
    //Llamamos a getDbPool para comprobar conexion
    const db = (0, db_1.getDbPool)();
    try {
        const [rows] = await db.query(`
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
        res.status(500).json({ message: 'Error al consultar datos', error });
    }
};
exports.getAvailable = getAvailable;
