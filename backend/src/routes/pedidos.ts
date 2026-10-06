import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de pedidos funcionando!'
  });
});

export default router;