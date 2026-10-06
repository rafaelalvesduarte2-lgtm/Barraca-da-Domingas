import { Router } from 'express';
import db from '../database/database';

const router = Router();

router.get('/', (req, res) => {
  const pedidos = db.prepare(`
    SELECT id, cliente_nome, endereco, forma_pagamento, status, total
    FROM pedidos
  `).all();

  res.json(pedidos);
});

router.post('/', (req, res) => {
  const {
    cliente_nome,
    endereco,
    forma_pagamento,
    total
  } = req.body;

  if (!cliente_nome || !endereco || !forma_pagamento || total === undefined) {
    return res.status(400).json({
      mensagem: 'Cliente, endereço, forma de pagamento e total são obrigatórios.'
    });
  }

  const resultado = db.prepare(`
    INSERT INTO pedidos (
      cliente_nome,
      endereco,
      forma_pagamento,
      total
    )
    VALUES (?, ?, ?, ?)
  `).run(
    cliente_nome,
    endereco,
    forma_pagamento,
    total
  );

  res.status(201).json({
    mensagem: 'Pedido criado com sucesso!',
    id: resultado.lastInsertRowid
  });
});

export default router;