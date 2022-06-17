const Atendimento = require('../models/atendimentos.js')

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.lista(res)
  });
  app.get(`/atendimentos/:id`, (req, res) => {
    const id = Number(req.params.id)
    Atendimento.buscaPorId(id, res)
  })
  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body
    Atendimento.adiciona(atendimento, res)
  })
};

