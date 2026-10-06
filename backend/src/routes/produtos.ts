import { Router } from 'express';
import db from '../database/database';

const router = Router();

router.get('/', (req, res) => {
  const produtos = db.prepare(`
    SELECT id, nome, descricao, preco, ativo
    FROM produtos
  `).all();

  res.json(produtos);
});

router.post('/', (req, res) => {
  const { nome, descricao, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      mensagem: 'Nome e preço são obrigatórios.'
    });
  }

  const resultado = db.prepare(`
    INSERT INTO produtos (nome, descricao, preco)
    VALUES (?, ?, ?)
  `).run(nome, descricao || null, preco);

  res.status(201).json({
    mensagem: 'Produto cadastrado com sucesso!',
    id: resultado.lastInsertRowid
  });
});

export default router;