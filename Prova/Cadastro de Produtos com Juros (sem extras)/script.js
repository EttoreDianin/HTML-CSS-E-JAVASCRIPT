let produtos = [];

function calcularJuros(preco, meses) {
  return (preco * (1 + 0.05 * meses)).toFixed(2);
}

function adicionarProduto() {
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const meses = parseInt(document.getElementById("meses").value);

  if (!nome || isNaN(preco) || isNaN(meses)) {
    alert("Preencha todos os campos corretamente");
    return;
  }

  produtos.push({ nome, preco, meses });
  renderizarTabela();
}

function removerProduto(index) {
  produtos.splice(index, 1);
  renderizarTabela();
}

function renderizarTabela() {
  const tbody = document.getElementById("tabela");
  tbody.innerHTML = "";
  produtos.forEach((p, i) => {
    const valorFinal = calcularJuros(p.preco, p.meses);
    tbody.innerHTML += `
      <tr>
        <td>${p.nome}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td>${p.meses}</td>
        <td>R$ ${valorFinal}</td>
        <td><button onclick="removerProduto(${i})">Remover</button></td>
      </tr>
    `;
  });
}
