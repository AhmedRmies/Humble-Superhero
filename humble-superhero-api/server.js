const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors());

let superheroes = [];
let nextId = 1;

app.post('/superheroes', (req, res) => {
  const { name, superpower, humilityScore } = req.body;

  // Validation
  if (!name || !superpower || humilityScore === undefined) {
    return res.status(400).json({ error: 'Name, superpower, and humilityScore are required.' });
  }

  if (typeof humilityScore !== 'number' || humilityScore < 1 || humilityScore > 10) {
    return res.status(400).json({ error: 'Humility score must be a number between 1 and 10.' });
  }

  const newSuperhero = {
    id: nextId++,
    name,
    superpower,
    humilityScore,
  };

  superheroes.push(newSuperhero);
  res.status(201).json(newSuperhero);
});

app.get('/', (req, res) => {
  res.send('Welcome to Humble Superhero API');
});

app.get('/superheroes', (req, res) => {
  const sortedSuperheroes = superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  res.json(sortedSuperheroes);
});

// Export the app for testing
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
