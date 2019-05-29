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
  // Le pelo Id do livro
  buscaPorId(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `SELECT * 
                  FROM livros 
                  WHERE id=?`,
        [id],
        (erro, livro) => {
          if (erro) {
            return reject("Nao foi possivel encontrar o livro");
          }
          return resolve(livro);
        }
      );
    });
  }
  // Atualiza livro no bd
  atualiza(livro) {
    return new Promise((resolve, reject) => {
      this.db.run(
        `
            UPDATE livros SET
            titulo = ?,
            preco = ?,
            descricao = ?
            WHERE id = ?
        `,
        [livro.titulo, livro.preco, livro.descricao, livro.id],
        erro => {
          if (erro) {
            return reject("Não foi possível atualizar o livro!");
          }

          resolve();
        }
      );
    });
  }
  // Deletar um livro do db
  remove(id) {
    return new Promise((resolve, reject) => {
      this.db.get(
        `
                DELETE 
                FROM livros
                WHERE id = ?
            `,
        [id],
        erro => {
          if (erro) {
            return reject("Não foi possível remover o livro!");
          }
          return resolve();
        }
      );
    });
  }
}

module.exports = livroDao;
