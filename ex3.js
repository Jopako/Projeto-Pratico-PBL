const fs = require("fs")

const produtos = JSON.parse(fs.readFileSync("./produtos.json", "utf-8"));

const resumir = produtos.map(({produto, valor, categoria}) => ({produto, valor, categoria}))

console.log(resumir)

const totalPorCategoria = resumir
    .reduce((acc, {categoria, valor}) => 
        {acc[categoria] = (acc[categoria] || 0 ) + valor;
            return acc;
        }, {});

console.log(totalPorCategoria)

const listaPorCategoria = Object.entries(totalPorCategoria)
    .map(([categoria, total]) => ({categoria, total}));

const ordenarPorValor = listaPorCategoria
        .toSorted((a, b) => b.total - a.total);

console.log(ordenarPorValor)






