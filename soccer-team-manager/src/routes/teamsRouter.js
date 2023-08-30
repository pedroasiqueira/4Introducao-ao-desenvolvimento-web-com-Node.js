const express = require('express');
const validateTeam = require('../middlewares/validateTeam');
const existingId = require('../middlewares/existingId');
const teams = require('../utils/teams');
const apiCredentials = require('../middlewares/apiCredentials');

const router = express.Router();

let nextId = 3;

router.get('/', (req, res) => res.json(teams));

router.use(apiCredentials);

// Listando times pelo id
router.get('/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  if (team) {
    res.json(team);
  } else {
    res.sendStatus(404);
  }
}); 


// Arranja os middlewares para chamar validateTeam primeiro
router.post('/', validateTeam, (req, res) => {
  if (
    // confere se a sigla proposta está inclusa nos times autorizados
    !req.teams.teams.includes(req.body.sigla)
    // confere se já não existe um time com essa sigla
    && teams.every((t) => t.sigla !== req.body.sigla)
  ) {
    return res.status(422).json({ message: 'Já existe um time com essa sigla'});
  }
  const team = { id: nextId, ...req.body };
  teams.push(team);
  nextId += 1;
  res.status(201).json(team);
});

router.put('/:id', existingId, validateTeam, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index = teams.indexOf(team);
  const updated = { id, ...req.body };
  teams.splice(index, 1, updated);
  res.status(201).json(updated);
});
// Como estava antes dos middleware tá na parte final

// Deletando times
router.delete('/:id', existingId, (req, res) => {
  const id = Number(req.params.id);
  const team = teams.find(t => t.id === id);
  const index = teams.indexOf(team);
  teams.splice(index, 1);
  res.sendStatus(204);
});

// se ninguém respondeu, vai cair neste middleware
router.use((req, res) => res.sendStatus(404));

// Antes do middleware:
// // Cadastrando times
// app.post('/teams', (req, res) => {
//   const requiredProperties = ['nome', 'sigla'];
//   if (requiredProperties.every((property) => property in req.body)) {
//     const team = { id: nextId, ...req.body };
//     teams.push(team);
//     nextId += 1;
//     res.status(201).json(team);
//   } else {
//     res.sendStatus(400);
//   }
// });
// // Editando times
// app.put('/teams/:id', (req, res) => {
//   const id = Number(req.params.id);
//   const requiredProperties = ['nome', 'sigla'];
//   const team = teams.find(t => t.id === id);
//   if (team && requiredProperties.every((property) => property in req.body)) {
//     const index = teams.indexOf(team);
//     const updated = { id, ...req.body };
//     teams.splice(index, 1, updated);
//     res.status(201).json(updated);
//   } else {
//     res.sendStatus(400);
//   }
// });

module.exports = router;