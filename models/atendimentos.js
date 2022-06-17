const moment = require('moment')

const conexao = require('../infraestrutura/conexao.js')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY/MM/DD HH:MM:SS')
    const atendimentoDatado = {...atendimento, data, dataCriacao}
    const sql = 'INSERT INTO atendimentos SET ?'

    conexao.query(sql, atendimentoDatado, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(201).json(resultados)
      }
    })
  }
}

module.exports = new Atendimento