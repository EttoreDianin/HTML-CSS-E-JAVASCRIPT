let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let editIndex = -1;

function salvarLocalStorage() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

function calcularJuros(preco, meses) {
  return (preco * (1 + 0.05 * meses)).toFixed(2);
}

function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const meses = parseInt(document.getElementById("meses").value);

  if (!nome || isNaN(preco) || isNaN(meses)) {
    alert("Preencha todos os campos");
    return;
  }

  const novoProduto = { nome, preco, meses };

  if (editIndex === -1) {
    produtos.push(novoProduto);
  } else {
    produtos[editIndex] = novoProduto;
    editIndex = -1;
  }

  salvarLocalStorage();
  renderizarTabela();
  limparCampos();
}

function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("meses").value = "";
}

function editarProduto(index) {
  const p = produtos[index];
  document.getElementById("nome").value = p.nome;
  document.getElementById("preco").value = p.preco;
  document.getElementById("meses").value = p.meses;
  editIndex = index;
}

function removerProduto(index) {
  produtos.splice(index, 1);
  salvarLocalStorage();
  renderizarTabela();
}

function filtrarProdutos() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(filtro));
  renderizarTabela(filtrados);
}

function renderizarTabela(lista = produtos) {
  const tabela = document.getElementById("tabela-produtos");
  tabela.innerHTML = "";

  lista.forEach((p, i) => {
    const juros = calcularJuros(p.preco, p.meses);
    tabela.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>${p.meses}</td>
        <td>R$ ${juros}</td>
        <td>
          <button onclick="editarProduto(${i})">Editar</button>
          <button onclick="removerProduto(${i})">Excluir</button>
        </td>
      </tr>
    `;
  });
}

renderizarTabela();
