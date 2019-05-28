class livroDao {
  constructor(db) {
    this.db = db;
  }

  lista() {
    return new Promise((resolve, reject) => {
      this.db.all("SELECT * from livros", (erro, resultados) => {
        if (erro) return reject("Nao foi possivel listar os livros");

        return resolve(resultados);
      });
    });
  }
}

module.exports = livroDao;
