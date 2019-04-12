const express = require('express');
const router = express.Router();

let gamesData = [
  {
    id: 1,
    title: 'Pacman',
    genre: 'Arcade',
    releaseYear: 1980
  },
  {
    id: 2,
    title: 'Crysis',
    genre: 'First-person Shooter',
    releaseYear: 2007
  }
];

router.use(express.json());

router.get('/', (req, res) => {
  res.json(gamesData);
});

router.post('/', (req, res) => {
  const newGame = { id: ++gamesData.length, ...req.body};
  const { title, genre, releaseYear } = newGame;

  if (title && genre) {
    res.json([...gamesData, newGame]);
  }
  res.status(422).json({
    message: 'A title and genre field are required. Please try again.'
  });
});

module.exports = router;
