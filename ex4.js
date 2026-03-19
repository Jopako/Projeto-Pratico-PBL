const vendas = [
  { item: 'Notebook', preco: 1000, categoria: 'tech' },
  { item: 'Cadeira', preco: 150, categoria: 'moveis' },
  { item: 'Mouse', preco: 50, categoria: 'tech' },
  { item: 'Monitor', preco: 600, categoria: 'tech' }
];

const vendasVazio = []

const filtrarPorValorMinimo = (min) =>
{
	return (vendas) => vendas.filter(item => item.preco >= min);
};

const  filtrarPorCategoria = (categoria) =>
{
	return (vendas) => vendas.filter(item => item.categoria === categoria);
} 

console.assert( 
  filtrarPorValorMinimo(1000)(vendas).length === 2, "2 itens maior que 1000"
); 

console.assert( 
  filtrarPorValorMinimo(-1)(vendas).length === 4, "quatro valores maior que -1"
);

console.assert(
    filtrarPorValorMinimo(100)(vendasVazio).length === 4, "quatro valores maior que 100"
)

console.assert(
    filtrarPorCategoria('perfiféricos')(vendas).length === 1, "um valor da categoria periféricos"
)