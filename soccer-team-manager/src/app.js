const express = require('express');

const app = express();
app.use(express.json());

const teams = [
  {
    id: 1,
    name: 'São Paulo Futebol Clube',
    initials: 'SPF',
  },
  {
    id: 2,
    name: 'Clube Atlético Mineiro',
    initials: 'CAM',
  },
];

// Listando os times:
app.get('/teams', (req, res) => res.status(200).json({ teams }));
// Listando time pelo id:
app.get('/teams/:id', (req, res) => {
  const { id } = req.params;
  const team = teams.find((teamm) => teamm.id === Number(id));
  if (!team) {
    return res.status(404).json({ message: 'Team not found' });
  }

  res.status(200).json({ team });
});

// Cadastrando times:
app.post('/teams', (req, res) => {
  const newTeam = { ...req.body };
  teams.push(newTeam);
  res.status(201).json({ team: newTeam });
});

// Editando times:
app.put('/teams/:ids', (req, res) => {
  const { ids } = req.params;
  const { name, initials } = req.body;
  const updateTeam = teams.find((team) => team.id === Number(ids));
  if (!updateTeam) {
    return res.status(404).json({ message: 'Team not found' });
  }
  updateTeam.name = name;
  updateTeam.initials = initials;
  res.status(200).json({ updateTeam });
});

// Deletando times:
app.delete('/teams/:ids', (req, res) => {
  const { ids } = req.params;
  const arrayPosition = teams.findIndex((team) => team.id === Number(ids));
  teams.splice(arrayPosition, 1);
  res.status(200).end();
});

module.exports = app;