// Função para calcular promoção com desconto fixo
function calcularPromocao(preco) {
  const desconto = 0.20; // 20% de desconto
  const valorFinal = preco * (1 - desconto); // Aplica o desconto
  return valorFinal.toFixed(2); // Arredonda para 2 casas decimais
}

// Exemplo de uso:
const preco3 = 80;
console.log("Preço com Promoção:", calcularPromocao(preco3));
// Saída: "Preço com Promoção: 64.00"
