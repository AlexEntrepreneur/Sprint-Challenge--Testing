const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', (req, res) => {
  res.json([
    {
      title: 'Pacman',
      genre: 'Arcade',
      releaseYear: 1980
    },
    {
      title: 'Crysis',
      genre: 'First-person Shooter',
      releaseYear: 2007
    }
  ]);
});

router.post('/', (req, res) => {
  const newGame = req.body;
  const { title, genre, releaseYear } = newGame;

  if (title && genre) {
    res.json([
      {
        title: 'Pacman',
        genre: 'Arcade',
        releaseYear: 1980
      },
      {
        title: 'Crysis',
        genre: 'First-person Shooter',
        releaseYear: 2007
      },
      newGame
    ])
  }
  res.status(422).json({
    message: 'A title and genre field are required. Please try again.'
  });
});

module.exports = router;
