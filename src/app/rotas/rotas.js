const livroDao = require("../infra/livroDao");

const db = require("../../config/database");

module.exports = app => {
  app.get("/", function(req, resp) {
    resp.send(`
            <html>
                <head>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1> Casa do Código </h1>
                </body> 
            </html>
          `);
  });

  app.get("/livros", function(req, resp) {
    const LivroDao = new livroDao(db);
    LivroDao.lista()
      .then(livros =>
        resp.marko(require("../views/livros/lista/lista.marko"), {
          livros: livros
        })
      )
      .catch(erro => console.log(erro));
  });

  app.get("/livros/form", function(req, resp) {
    resp.marko(require("../views/livros/form/formulario.marko"));
  });

  app.post("/livros", function(req, resp) {
    console.log(req.body);
    const LivroDao = new livroDao(db);
    LivroDao.adiciona(req.body)
      .then(resp.redirect("/livros"))
      .catch(erro => console.log(erro));
  });
};

// material de apoio de algun metodos do node

/*
o método use() do Express pode receber dois parâmetros, sendo o primeiro 
uma string que define as URLs que serão atendidas pelo middleware e como segundo parâmetro uma função
*/
