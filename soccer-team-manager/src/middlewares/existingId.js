const teams = require('../utils/teams');

const existingId = (req, res, next) => {
  const id = Number(req.params.id);

  if(teams.some((element) => element.id === id)){
    next();
  } else {
    res.sendStatus(404);
  }
}

module.exports = existingId;
