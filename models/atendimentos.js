const moment = require('moment')

const conexao = require('../infraestrutura/conexao.js')

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD-MM-YYYY').format('YYYY/MM/DD HH:MM:SS')
    const dataEhvalida = moment(data).isSameOrAfter(dataCriacao)
    const clienteEhValido = atendimento.cliente.length >= 5
    const validacoes = [
      {
        nome: 'data',
        valida: dataEhvalida,
        mensagem: 'Data deve ser maior ou igual a data atual.'
      },
      {
        nome: 'cliente',
        valida: clienteEhValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres.'
      },
    ]
    const erros = validacoes.filter(campo => !campo.valida)
    const existemErros = erros.length
    if(existemErros) {
      res.status(400).json(erros)
    } else {
      const atendimentoDatado = {...atendimento, data, dataCriacao}
      const sql = 'INSERT INTO atendimentos SET ?'
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if(erro) {
          res.status(400).json(erro)
        } else {
          res.status(200).json(resultados)
        }
      })  
    }
  }
  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'
    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }
  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
    conexao.query(sql, (erro, resultados) => {
      if(erro) {
        res.status(400).json(erro)
      } else {
        const atendimento = resultados[0]
        res.status(200).json(atendimento)
      }
    })
  }
}

module.exports = new Atendimento