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
};
