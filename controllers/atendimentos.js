module.exports = (app) => {
  app.get("/atendimento", (req, res) =>
    res.send("Você está na rota de atendimento e está realizando um GET")
  );
};
