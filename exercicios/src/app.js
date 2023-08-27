const express = require('express');

const app = express();
app.use(express.json());
const fs = require('fs').promises;
const path = require('path');

const moviesPath = path.resolve(__dirname, './movies.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(moviesPath);
    return JSON.parse(data); //Se colocar um console.log englobando isso, da p ver no terminal
  } catch (error) {
    console.log(`Arquivo não pode ser lido: ${error}`);
  }
};

// readFile();

app.get('/movies/:ids', async (req, res) => {
  try {
    const { ids } = req.params;
    const movies = await readFile();
    const moviesId = movies.find((movie) => movie.id === Number(ids));
    res.status(200).json(moviesId);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await readFile();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});

app.get('/movies/search', async (req, res) => {
  try {
    const { q } = req.query;
    const movies = await readFile();
    if(q) {
      const moviesSearch = movies.filter((movie) => movie.movie.includes(q));
      return res.status(200).json(moviesSearch);
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});

app.post('/movies', async (req, res) => {
  try {
    const { movie, price } = req.body;
    const movies = await readFile();
    const newMovie = {
      id: movies[movies.length - 1].id + 1,
      movie,
      price,
    };
    const allMovies = JSON.stringify([...movies, newMovie]);
    await fs.writeFile(moviesPath, allMovies);
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
});

app.put('/movies/:ids', async (req, res) => {
  try {
    const { ids } = req.params;
    const { movie, price } = req.body;
    const movies = await readFile();
    const moviesId = movies.findIndex((movie) => movie.id === Number(ids));
    movies[moviesId] = { id: Number(ids), movie, price };
    const updateMovies = JSON.stringify(movies, null, 2);
    await fs.writeFile(moviesPath, updateMovies);
    res.status(200).json(movies[moviesId]);
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})

app.delete('/movies/:ids', async (req, res) => {
  try {
    const { ids } = req.params;
    const movies = await readFile();
    const moviesId = movies.filter((movie) => movie.id !== Number(ids));
    const updateMovies = JSON.stringify(moviesId, null, 2);
    await fs.writeFile(moviesPath, updateMovies);
    // res.status(204).json(movies[moviesId]);
    res.status(204).end();
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
})
module.exports = app;


// app.delete('/movies/:ids', async (req, res) => {
//   try {
//     const { ids } = req.params;
//     const movies = await readFile();
//     const moviesId = movies.findIndex((movie) => movie.id === Number(ids));
//     movies.splice(moviesId, 1);
//     const updatedMovies = JSON.stringify(movies, null, 2);
//     await fs.writeFile(moviesPath, updatedMovies);
//     // res.status(204).json(movies[moviesId]);
//     res.status(204).end();
//   } catch (err) {
//     res.status(500).send({ message: err.message })
//   }
// })