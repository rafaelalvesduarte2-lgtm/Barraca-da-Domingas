import { useState } from "react"

function App() {
  const [tela, setTela] = useState("login")
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [carrinho, setCarrinho] = useState([])

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

  function entrar(event) {
    if (event) {
      event.preventDefault()
    }

    setTela("cardapio")
  }

  function abrirCriarConta(event) {
    if (event) {
      event.preventDefault()
    }

    setTela("criarConta")
  }

  function voltarLogin(event) {
    if (event) {
      event.preventDefault()
    }

    setTela("login")
  }

  function abrirDetalhes(produto) {
    setProdutoSelecionado(produto)
    setTela("detalhes")
  }

  function voltarCardapio(event) {
    if (event) {
      event.preventDefault()
    }

    setTela("cardapio")
    setProdutoSelecionado(null)
  }

  function adicionarAoCarrinho() {
    if (!produtoSelecionado) {
      return
    }

    const produtoExistente = carrinho.find(
      (produto) => produto.nome === produtoSelecionado.nome
    )

    if (produtoExistente) {
      setCarrinho(
        carrinho.map((produto) =>
          produto.nome === produtoSelecionado.nome
            ? {
                ...produto,
                quantidade: (produto.quantidade || 1) + 1
              }
            : produto
        )
      )
    } else {
      setCarrinho([
        ...carrinho,
        {
          ...produtoSelecionado,
          quantidade: 1
        }
      ])
    }

    setTela("cardapio")
    setProdutoSelecionado(null)
  }

  function removerDoCarrinho(nomeProduto) {
    setCarrinho(
      carrinho.filter((produto) => produto.nome !== nomeProduto)
    )
  }

  function abrirCarrinho(event) {
    if (event) {
      event.preventDefault()
    }

    setTela("carrinho")
  }

  function calcularTotal() {
    return carrinho.reduce((total, produto) => {
      const valor = Number(
        produto.preco
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      )

      const quantidade = produto.quantidade || 1

      return total + valor * quantidade
    }, 0)
  }

  function quantidadeTotal() {
    return carrinho.reduce(
      (total, produto) => total + (produto.quantidade || 1),
      0
    )
  }

  return (
    <div className="menu-page">

      {tela === "login" && (
        <main className="menu-content">

          <h1>Barraca da Domingas</h1>

          <h2>Seu pastel, do seu jeito!</h2>

          <h2>Bem-vindo!</h2>

          <p>Entre para fazer seu pedido.</p>

          <form onSubmit={entrar}>

            <label>Email:</label>

            <input
              type="email"
              placeholder="Digite seu Email"
            />

            <label>Senha:</label>

            <input
              type="password"
              placeholder="Digite sua senha"
            />

            <button type="submit">
              Entrar
            </button>

          </form>

          <a href="#">
            Esqueceu sua senha?
          </a>

          <p>
            Não possui conta?{" "}
            <a href="#" onClick={abrirCriarConta}>
              Criar conta
            </a>
          </p>

        </main>
      )}

      {tela === "criarConta" && (
        <main className="menu-content">

          <h1>Barraca da Domingas</h1>

          <h2>Criar conta</h2>

          <p>Preencha seus dados para criar sua conta.</p>

          <form onSubmit={voltarLogin}>

            <label>Nome:</label>

            <input
              type="text"
              placeholder="Digite seu nome"
            />

            <label>Email:</label>

            <input
              type="email"
              placeholder="Digite seu email"
            />

            <label>Telefone:</label>

            <input
              type="tel"
              placeholder="Digite seu telefone"
            />

            <label>Senha:</label>

            <input
              type="password"
              placeholder="Digite sua senha"
            />

            <button type="submit">
              Criar conta
            </button>

          </form>

          <button onClick={voltarLogin}>
            ← Voltar para login
          </button>

        </main>
      )}

      {tela !== "login" && tela !== "criarConta" && (
        <header className="menu-header">

          <h1>Barraca da Domingas</h1>

          <nav>

            <a href="#" onClick={voltarCardapio}>
              Cardápio
            </a>

            <a href="#">
              Meus pedidos
            </a>

            <a href="#" onClick={abrirCarrinho}>
              🛒 Carrinho ({quantidadeTotal()})
            </a>

          </nav>

        </header>
      )}

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

              <button
                className="add-cart-button"
                onClick={adicionarAoCarrinho}
              >
                Adicionar ao carrinho
              </button>

            </div>

          </div>

        </main>
      )}

      {tela === "carrinho" && (
        <main className="menu-content">

          <button onClick={voltarCardapio}>
            ← Voltar ao cardápio
          </button>

          <h2>Meu Carrinho</h2>

          <p>Confira os produtos adicionados</p>

          {carrinho.length === 0 ? (

            <p>Seu carrinho está vazio.</p>

          ) : (

            <div>

              {carrinho.map((produto) => {

                const valor = Number(
                  produto.preco
                    .replace("R$ ", "")
                    .replace(".", "")
                    .replace(",", ".")
                )

                const quantidade = produto.quantidade || 1
                const subtotal = valor * quantidade

                return (
                  <div
                    key={produto.nome}
                    className="product-card"
                    style={{ marginBottom: "20px" }}
                  >

                    <h3>{produto.nome}</h3>

                    <p>{produto.descricao}</p>

                    <strong>{produto.preco}</strong>

                    <p>
                      Quantidade:{" "}
                      <strong>{quantidade}</strong>
                    </p>

                    <p>
                      Subtotal:{" "}
                      <strong>
                        R$ {subtotal.toFixed(2).replace(".", ",")}
                      </strong>
                    </p>

                    <button
                      onClick={() => removerDoCarrinho(produto.nome)}
                    >
                      Remover
                    </button>

                  </div>
                )
              })}

              <div style={{ marginTop: "30px" }}>

                <h3>
                  Total: R$ {calcularTotal().toFixed(2).replace(".", ",")}
                </h3>

              </div>

            </div>
          )}

        </main>
      )}

    </div>
  )
}

export default App