import db from './database';

db.exec(`
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    ativo INTEGER NOT NULL DEFAULT 1
  )
`);

console.log('Banco de dados e tabela de produtos prontos!');