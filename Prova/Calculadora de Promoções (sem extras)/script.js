function calcularPromocao() {
  const nome = document.getElementById("produto").value;
  const preco = parseFloat(document.getElementById("preco").value);

  if (!nome || isNaN(preco)) {
    alert("Preencha corretamente os campos");
    return;
  }

  const desconto = 0.20;
  const precoFinal = (preco * (1 - desconto)).toFixed(2);

  document.getElementById("resultado").innerText =
    `Promoção: ${nome} de R$${preco.toFixed(2)} por R$${precoFinal} (20% OFF)`;
}
