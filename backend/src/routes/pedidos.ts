import { Router } from 'express';
import db from '../database/database';

const router = Router();

const statusPermitidos = [
  'Recebido',
  'Em preparo',
  'Saiu para entrega',
  'Entregue',
  'Cancelado'
];

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

router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!statusPermitidos.includes(status)) {
    return res.status(400).json({
      mensagem: 'Status inválido.'
    });
  }

  const resultado = db.prepare(`
    UPDATE pedidos
    SET status = ?
    WHERE id = ?
  `).run(status, id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      mensagem: 'Pedido não encontrado.'
    });
  }

  res.json({
    mensagem: 'Status do pedido atualizado com sucesso!'
  });
});

export default router;