import { Request, Response } from 'express';
import { getDbPool } from '../database/db';


//Lógica de getFilms
export const getFilms = async (_req: Request, res: Response) => {
  try {
    //Llamamos a getDbPool para comprobar conexion
    const db = getDbPool();
    const [rows] = await db.query('SELECT film_id, title, description, release_year, rental_duration, rental_rate, length, replacement_cost, rating FROM film;');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener films:', error);
    res.status(500).json({ message: 'Error al obtener films', error });
  }
};

//Lógica de de getAvailable
export const getAvailable = async (_req: Request, res: Response) => {
  //Llamamos a getDbPool para comprobar conexion
  const db = getDbPool();
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
  } catch (error) {
    res.status(500).json({ message: 'Error al consultar datos', error });
  }
}
