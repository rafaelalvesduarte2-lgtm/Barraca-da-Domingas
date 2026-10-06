import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API Barraca da Domingas funcionando!'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});