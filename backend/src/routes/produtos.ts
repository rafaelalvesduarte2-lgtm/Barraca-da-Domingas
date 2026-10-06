import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    mensagem: 'Rota de produtos funcionando!'
  });
});

export default router;