import { useState } from "react"

function App() {
  const [tela, setTela] = useState("cardapio")
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  const produtos = [
    {
      nome: "Pastel de Frango",
      descricao: "Pastel recheado com frango",
      preco: "R$ 7,00"
    },
    {
      nome: "Pastel de Carne",
      descricao: "Pastel recheado com carne",
      preco: "R$ 7,00"
    },
    {
      nome: "Pastel de Queijo",
      descricao: "Pastel recheado com queijo",
      preco: "R$ 7,00"
    },
    {
      nome: "Pastel de Pizza",
      descricao: "Pastel recheado com queijo, presunto e tomate",
      preco: "R$ 7,00"
    },
    {
      nome: "Pastel de Frango com Queijo",
      descricao: "Pastel recheado com frango e queijo",
      preco: "R$ 7,00"
    },
    {
      nome: "Refrigerante 200 ml",
      descricao: "Refrigerante em embalagem de 200 ml",
      preco: "R$ 3,00"
    }
  ]

  function abrirDetalhes(produto) {
    setProdutoSelecionado(produto)
    setTela("detalhes")
  }

  function voltarCardapio() {
    setTela("cardapio")
    setProdutoSelecionado(null)
  }

  return (
    <div className="menu-page">

      <header className="menu-header">
        <h1>Barraca da Domingas</h1>

        <nav>
          <a href="#" onClick={voltarCardapio}>
            Cardápio
          </a>

          <a href="#">
            Meus pedidos
          </a>

          <a href="#">
            🛒 Carrinho
          </a>
        </nav>
      </header>

      {tela === "cardapio" && (
        <main className="menu-content">

          <h2>Cardápio</h2>

          <p>Escolha seus produtos</p>

          <div className="products">

            {produtos.map((produto) => (
              <div
                className="product-card"
                key={produto.nome}
              >

                <div className="product-image">
                  Imagem
                </div>

                <h3>{produto.nome}</h3>

                <p>{produto.descricao}</p>

                <strong>{produto.preco}</strong>

                <button
                  onClick={() => abrirDetalhes(produto)}
                >
                  Ver detalhes
                </button>

              </div>
            ))}

          </div>

        </main>
      )}

      {tela === "detalhes" && produtoSelecionado && (
        <main className="menu-content">

          <button onClick={voltarCardapio}>
            ← Voltar ao cardápio
          </button>

          <div className="product-detail">

            <div className="product-detail-image">
              Imagem do produto
            </div>

            <div className="product-detail-info">

              <h2>{produtoSelecionado.nome}</h2>

              <p>{produtoSelecionado.descricao}</p>

              <strong className="product-detail-price">
                {produtoSelecionado.preco}
              </strong>

              <button className="add-cart-button">
                Adicionar ao carrinho
              </button>

            </div>

          </div>

        </main>
      )}

    </div>
  )
}

export default App