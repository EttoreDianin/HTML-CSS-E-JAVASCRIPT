
if (!localStorage.getItem("loggedIn") && !window.location.pathname.endsWith("login.html")) {
  window.location.href = "login.html";
}


const user = localStorage.getItem("loggedUser");
if (user && document.getElementById("user-info")) {
  document.getElementById("user-info").textContent = `Olá, ${user}`;
}


function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}


if (document.getElementById("produtos")) {
  fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => mostrarProdutos(data))
    .catch(() => alert("Erro ao carregar produtos."));
}

function mostrarProdutos(produtos) {
  const lista = document.getElementById("produtos");
  lista.innerHTML = "";

  produtos.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <a href="produto.html?id=${produto.id}">
        <img src="${produto.image}" alt="${produto.title}" />
        <h3>${produto.title}</h3>
        <p>${produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      </a>
      <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
    `;

    lista.appendChild(card);
  });
}


function adicionarAoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push(id);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Produto adicionado ao carrinho!");
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const container = document.getElementById("carrinho");
  const totalSpan = document.getElementById("total");

  if (!container || !totalSpan) return;

  container.innerHTML = "";
  let total = 0;


  const contagem = {};
  carrinho.forEach(id => contagem[id] = (contagem[id] || 0) + 1);

  const idsUnicos = [...new Set(carrinho)];

  idsUnicos.forEach(id => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(produto => {
        const qtd = contagem[id];
        const item = document.createElement("div");
        item.classList.add("item-carrinho");

        item.innerHTML = `
          <img src="${produto.image}" alt="${produto.title}" />
          <span>${produto.title}</span>
          <span>Qtd: ${qtd}</span>
          <span>Preço: R$ ${(produto.price * qtd).toFixed(2)}</span>
          <button onclick="removerDoCarrinho(${id})">Remover</button>
        `;

        total += produto.price * qtd;
        container.appendChild(item);
        totalSpan.textContent = `Total: R$ ${total.toFixed(2)}`;
      })
      .catch(() => alert("Erro ao carregar item do carrinho."));
  });
}

function removerDoCarrinho(id) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const index = carrinho.indexOf(id);
  if (index > -1) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
  }
}
