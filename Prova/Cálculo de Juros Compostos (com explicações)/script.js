// Função para calcular juros compostos
function calcularJurosCompostos(preco, meses) {
  // Fórmula: valor final = preço * (1 + taxa)^tempo
  const taxa = 0.05; // 5% ao mês
  const valorFinal = preco * Math.pow((1 + taxa), meses);
  return valorFinal.toFixed(2); // Arredonda para 2 casas decimais
}

// Exemplo de uso:
const preco2 = 100;
const parcelas2 = 6;
console.log("Juros Compostos:", calcularJurosCompostos(preco2, parcelas2));
// Saída: "Juros Compostos: 134.01"
