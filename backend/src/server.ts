import express from 'express';
import produtosRoutes from './routes/produtos';
import './database/init';

const app = express();

app.use(express.json());

app.use('/produtos', produtosRoutes);

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Barraca da Domingas funcionando!'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});