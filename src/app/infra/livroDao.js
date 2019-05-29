class livroDao {
  constructor(db) {
    this.db = db;
  }
  //Le todos os  livros no bd
  lista() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * from livros", (erro, resultados) => {
        if (erro) return reject("Nao foi possivel listar os livros");

        return resolve(resultados);
      });
    });
  }
  //Insercao de um novo livro
  adiciona(livro) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
      INSERT INTO LIVROS (
              titulo,
              preco,
              descricao
          ) values (?, ?, ?)
      `,
        [livro.titulo, livro.preco, livro.descricao],
        function(err) {
          if (err) {
            console.log(err);
            return reject("Nao foi possivel adicionar o livro");
          }
          resolve();
        }
      );
    });
  }
}

module.exports = livroDao;
