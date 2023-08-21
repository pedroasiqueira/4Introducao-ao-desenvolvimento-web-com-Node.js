const teams = require('../utils/teams');

const existingId = (req, res, next) => {
  const id = Number(req.params.id);

  if(teams.some((element) => element.id === id)){
    next();
  } else {
    res.status(404).json({ message: 'Time não encontrado'});
  }
}

module.exports = existingId;
