import db from './database';

db.exec(`
  CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_nome TEXT NOT NULL,
    endereco TEXT NOT NULL,
    forma_pagamento TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Recebido',
    total REAL NOT NULL
  )
`);

console.log('Tabela de pedidos pronta!');