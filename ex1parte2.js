//todas as func vão parar dentro do pipe, como se fosse uma esteira
// (...) é o Spread/rest. 
//O Spread é usado na execução, ele pega os itense e "desempacota"
// O rest pega os restos dos argumentos e coloca num array
// ou seja, ele faz pipe(func1,func2,func3) e trasnforma estes items espalhados numa array pipe = [func1,func2,func3]
const pipe = (...funcoes) => (valorInicial) => 
  funcoes.reduce((acc, fn) => fn(acc), valorInicial);

//usamos o reduce,  e vai acumulando as funções

//func1
const filtrarPorValorMinimo = (min) => {
  return (vendas) => vendas.filter(item => item.preco >= min);
};

//func2
const filtrarPorCategoria = (categoria) => {
  return (vendas) => vendas.filter(item => item.categoria === categoria);
};

//func3
const calcularTotal = (lista) => 
  lista.reduce((soma, produto) => soma + produto.preco, 0);

//DADOS
const vendas = [
  { item: 'Notebook', preco: 1000, categoria: 'tech' },
  { item: 'Cadeira', preco: 150, categoria: 'moveis' },
  { item: 'Mouse', preco: 50, categoria: 'tech' },
  { item: 'Monitor', preco: 600, categoria: 'tech' }
];



//Aqui criamos a função para passar os valores para o PIPE
const analiseTechCara = pipe(
  filtrarPorCategoria('tech'),   // 1º: Filtra só o que é tech
  filtrarPorValorMinimo(500),    // 2º: Pega o resultado anterior e filtra acima de 500
  calcularTotal                  // 3º: Pega o resultado anterior e soma tudo
);

const resultado = analiseTechCara(vendas);
console.log(`Total da análise: R$ ${resultado}`); 

