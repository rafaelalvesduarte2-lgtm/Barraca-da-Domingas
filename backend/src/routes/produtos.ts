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

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco } = req.body;

  if (!nome || preco === undefined) {
    return res.status(400).json({
      mensagem: 'Nome e preço são obrigatórios.'
    });
  }

  const resultado = db.prepare(`
    UPDATE produtos
    SET nome = ?, descricao = ?, preco = ?
    WHERE id = ?
  `).run(nome, descricao || null, preco, id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      mensagem: 'Produto não encontrado.'
    });
  }

  res.json({
    mensagem: 'Produto atualizado com sucesso!'
  });
});

router.patch('/:id/desativar', (req, res) => {
  const { id } = req.params;

  const resultado = db.prepare(`
    UPDATE produtos
    SET ativo = 0
    WHERE id = ?
  `).run(id);

  if (resultado.changes === 0) {
    return res.status(404).json({
      mensagem: 'Produto não encontrado.'
    });
  }

  res.json({
    mensagem: 'Produto desativado com sucesso!'
  });
});

export default router;