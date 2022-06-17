const Atendimento = require('../models/atendimentos.js')
const moment = require('moment')
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
  app.patch(`/atendimentos/:id`, (req, res) => {
    const id = Number(req.params.id)
    const valores = req.body
    Atendimento.altera(id, valores, res)
  })
  app.delete('/atendimentos/:id', (req,res) => {
    const id = Number(req.params.id)
    Atendimento.deleta(id, res)
  })
};

