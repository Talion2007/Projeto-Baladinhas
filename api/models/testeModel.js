const sqlite3 = require("sqlite3").verbose();
const dbPath = "./infra/database.db";

// Função para abrir conexão com o banco de dados
function openDbConnection() {
  let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Erro ao abrir o banco de dados:", err.message);
    }
  });
  return db;
}

// ============================
// CRUD BALADAS
// ============================

// Buscar todas as baladas
function getAllBaladas(callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM Baladas", [], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Buscar baladas por cidade
function getBaladasByCidade(cidade, callback) {
  const db = openDbConnection();
  db.all(
    "SELECT * FROM Baladas WHERE LOWER(cidade) = LOWER(?)",
    [cidade],
    (err, rows) => {
      db.close();
      callback(err, rows);
    }
  );
}

// Buscar baladas por data
function getBaladasByData(data, callback) {
  const db = openDbConnection();
  db.all("SELECT * FROM Baladas WHERE data_evento = ?", [data], (err, rows) => {
    db.close();
    callback(err, rows);
  });
}

// Buscar balada por ID
function getBaladaById(id, callback) {
  const db = openDbConnection();
  db.get("SELECT * FROM Baladas WHERE id = ?", [id], (err, row) => {
    db.close();
    callback(err, row);
  });
}

// Criar nova balada
// Criar nova balada
function createBalada(balada, callback) {
  const { cidade, endereco, data_evento, tipo } = balada; // sem 'nome'
  const db = openDbConnection();
  db.run(
    `INSERT INTO Baladas (cidade, endereco, data_evento, tipo) 
     VALUES (?, ?, ?, ?)`,
    [cidade, endereco, data_evento, tipo],
    function (err) {
      db.close();
      callback(err, { id: this.lastID });
    }
  );
}

// Atualizar balada
function updateBalada(id, balada, callback) {
  const { cidade, endereco, data_evento, tipo } = balada; // sem 'nome' e 'descricao'
  const db = openDbConnection();
  db.run(
    `UPDATE Baladas 
     SET cidade = ?, endereco = ?, data_evento = ?, tipo = ? 
     WHERE id = ?`,
    [cidade, endereco, data_evento, tipo, id],
    function (err) {
      db.close();
      callback(err, { changes: this.changes });
    }
  );
}

// Deletar balada
function deleteBalada(id, callback) {
  const db = openDbConnection();
  db.run("DELETE FROM Baladas WHERE id = ?", [id], function (err) {
    db.close();
    callback(err, { changes: this.changes });
  });
}

// ============================
// Exportando funções
// ============================
module.exports = {
  getAllBaladas,
  getBaladasByCidade,
  getBaladasByData,
  getBaladaById,
  createBalada,
  updateBalada,
  deleteBalada,
};
