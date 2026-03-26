const fs = require("fs")

const produtos = JSON.parse(fs.readFileSync("./produtos.json", "utf-8"));

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



const resumir = produtos.map(({produto, valor, categoria}) => ({produto, valor, categoria}))

const totalPorCategoria = resumir
    .reduce((acc, {categoria, valor}) => 
        {acc[categoria] = (acc[categoria] || 0 ) + valor;
    return acc;
  }, {});

const ordenarPorValor = Object.entries(totalPorCategoria)
    .map(([categoria, total]) => ({categoria, total}))
    .toSorted((a, b) => b.total - a.total);


//TESTES COM ASSERT
console.assert(filtrarPorValorMinimo(800)(vendas).length === 2, "2 itens maior que 800")
console.assert(filtrarPorValorMinimo(-1)(vendas).length === 4, "quatro valores maiores que -1")
console.assert(filtrarPorValorMinimo(100)(vendasVazio).length === 4, "quatro valores maiores que 100 da lista vazia")

console.assert(filtrarPorCategoria('perfiféricos')(vendas).length === 1, "um valor da categoria periféricos")
console.assert(filtrarPorCategoria('moveis')(vendas).length === 1, "um valor da categoria moveis")
console.assert(filtrarPorCategoria('moveis')(vendasVazio).length === 1, "um valor da categoria moveis da lista vazia")



console.assert(resumir.length === 50, "resumir deve ter 50 itens");
console.assert(resumir[0].vendedor === undefined, "resumir não deve conter vendedor");
console.assert(resumir[0].produto !== undefined, "resumir deve conter produto");
console.assert(resumir.length === 10, "resumir não tem 10 itens, tem 50");
console.assert(resumir[0].vendedor !== undefined, "resumir não contém vendedor");

console.assert(totalPorCategoria['tech'] === 7700, "total de tech deve ser 7700");
console.assert(totalPorCategoria['periféricos'] === 1000, "total de periféricos deve ser 1000");
console.assert(totalPorCategoria['tech'] === 0, "tech não soma 0");
console.assert(totalPorCategoria['inexistente'] === 500, "categoria inexistente não existe");

console.assert(ordenarPorValor[0].total >= ordenarPorValor[1].total, "deve estar em ordem decrescente");
console.assert(ordenarPorValor[0].total <= ordenarPorValor[1].total, "primeiro item tem total MAIOR que o segundo");