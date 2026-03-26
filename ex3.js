const fs = require("fs")

const produtos = JSON.parse(fs.readFileSync("./produtos.json", "utf-8"));

const resumir = produtos.map(({produto, valor, categoria}) => ({produto, valor, categoria})) // mapeia o array para um novo array com apenas os campos desejados

console.log(resumir)

const totalPorCategoria = resumir
    .reduce((acc, {categoria, valor}) => 
        {acc[categoria] = (acc[categoria] || 0 ) + valor; // soma os valores por categoria ou cria a categoria se não existir
            return acc;
        }, {});

console.log(totalPorCategoria)

const ordenarPorValor = Object.entries(totalPorCategoria)
    .map(([categoria, total]) => ({categoria, total})) // transforma o objeto em array
    .toSorted((a, b) => b.total - a.total); //ordena o array por valor

console.log(ordenarPorValor)






