// Função para calcular juros simples
function calcularJurosSimples(preco, meses) {
  // Fórmula: valor final = preço * (1 + taxa * tempo)
  const taxa = 0.05; // 5% ao mês
  const valorFinal = preco * (1 + taxa * meses);
  return valorFinal.toFixed(2); // Arredonda para 2 casas decimais
}

// Exemplo de uso:
const preco1 = 100;
const parcelas1 = 6;
console.log("Juros Simples:", calcularJurosSimples(preco1, parcelas1)); 
// Saída: "Juros Simples: 130.00"
