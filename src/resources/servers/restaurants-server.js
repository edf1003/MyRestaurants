/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const { readFile, writeFile } = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const filePath = '../data/restaurants.json';

app.get('/restaurants', (req, res) => {
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo');
    }
    res.json(JSON.parse(data));
  });
});

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body;
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo');
    }

    const restaurants = JSON.parse(data);
    restaurants.push(newRestaurant);

    writeFile(filePath, JSON.stringify(restaurants, null, 2), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send('Error al escribir en el archivo');
      }
      res.status(201).send('Restaurante agregado');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo');
    }

    const restaurants = JSON.parse(data);
    const updatedRestaurants = restaurants.filter(
      (restaurant) => restaurant.id !== id
    );

    writeFile(
      filePath,
      JSON.stringify(updatedRestaurants, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error(writeErr);
          return res.status(500).send('Error al escribir en el archivo');
        }
        res.status(200).send('Restaurante eliminado');
      }
    );
  });
});

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al leer el archivo');
    }

    const restaurants = JSON.parse(data);
    const restaurant = restaurants.find((r) => r.id === id);

    if (!restaurant) {
      return res.status(404).send('Restaurante no encontrado');
    }

    res.json(restaurant);
  });
});
