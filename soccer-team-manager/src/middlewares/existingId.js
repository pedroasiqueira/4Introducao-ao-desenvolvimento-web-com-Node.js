const teams = require('../utils/teams');

// const existingId = (req, res, next) => {
//   const id = Number(req.params.id);
//   if(teams.some((element) => element.id === id)){
//     next();
//   } else {
//     res.status(404).json({ message: 'Time não encontrado'});
//   }
// }

const existingId = (req, res, next) => {
  const id = Number(req.params.id);
  if(!teams.some((element) => element.id === id)){
    return res.status(404).json({ message: 'Time não encontrado'});
  }
  next();
}

module.exports = existingId;
