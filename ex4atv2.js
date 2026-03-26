// O segredo funcional: O pipe agora é "curto-circuito"
// Se o acumulador (acc) chegar como null, ele ignora as próximas funções
const pipe = (...funcoes) => (valorInicial) => 
  funcoes.reduce((acc, fn) => (acc === null ? null : fn(acc)), valorInicial);

// Funções puras que retornam null (Nothing) em vez de arrays vazios
const filtrarPorCategoria = (categoria) => (vendas) => {
  const res = vendas.filter(item => item.categoria === categoria);
  return res.length > 0 ? res : null; // Se não achar nada, retorna o sinal de "parada"
};

const filtrarPorValorMinimo = (min) => (vendas) => {
  const res = vendas.filter(item => item.preco >= min);
  return res.length > 0 ? res : null;
};

const calcularTotal = (lista) => 
  lista.reduce((soma, produto) => soma + produto.preco, 0);

// --- EXECUÇÃO ---

const vendas = [
  { item: 'Notebook', preco: 1000, categoria: 'tech' },
  { item: 'Cadeira', preco: 150, categoria: 'moveis' }
];

// Caso onde 'filtrarPorCategoria' NÃO encontra nada:
const analiseCozinha = pipe(
  filtrarPorCategoria('cozinha'), // Retorna null
  filtrarPorValorMinimo(100),     // Nem será executada
  calcularTotal                   // Nem será executada
);

const resultado = analiseCozinha(vendas);

// Saída elegante sem erros de runtime
console.log(resultado === null ? "Pipeline parado: critério não encontrado." : `Total: ${resultado}`);