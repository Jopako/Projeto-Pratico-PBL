const vendas = [
  { item: 'Notebook', preco: 1000, categoria: 'tech' },
  { item: 'Cadeira', preco: 150, categoria: 'moveis' },
  { item: 'Mouse', preco: 50, categoria: 'tech' },
  { item: 'Monitor', preco: 600, categoria: 'tech' }
];

const filtrarPorValorMinimo = (min) =>
{
	return (vendas) => vendas.filter(item => item.preco >= min);
};

const  filtrarPorCategoria = (categoria) =>
{
	return (vendas) => vendas.filter(item => item.categoria === categoria);
}

const resumir = (vendas) =>
	vendas.map(({ item, preco, categoria }) => ({
		produto: item,
		valor: preco,
		categoria
	}));

const totalPorCategoria = (resumir) =>
	resumir.reduce((acc, { categoria, valor }) => {
		acc[categoria] = (acc[categoria] || 0) + valor;
		return acc;
	}, {});

const pipe = (...fns) => (valor) =>
	fns.reduce((acc, fn) => fn(acc), valor); // pipe das 4 funções para transformar em array

const somaVendasTechAcimaDe100 = pipe(
	filtrarPorValorMinimo(100),
	filtrarPorCategoria('tech'),
	resumir,
	totalPorCategoria
);

console.log(somaVendasTechAcimaDe100(vendas))


const aplicarDesconto = (percentual) => (vendas) =>
  vendas.map(item => ({
    ...item,
    preco: item.preco * (1 - percentual / 100)
  }));

const somaTechComDesconto = pipe(
  filtrarPorValorMinimo(100),      // preço >= 100
  filtrarPorCategoria('tech'),      // só tech
  aplicarDesconto(10),             // aplica 10% de desconto
  resumir,                         // transforma para {produto, valor, categoria}
  totalPorCategoria                 // soma total por categoria
);

console.log(somaTechComDesconto(vendas));