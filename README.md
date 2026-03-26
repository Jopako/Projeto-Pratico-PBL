<div align="center">
  <h1>Projeto-Pratico-PBL</h1>
  <p>Alunos: João Paulo Kowalski & Samuel Castilho Pereira </p>
</div>

## 1) Quais campos cada objeto de venda tem? O que cada um representa? 

- Id: representa um index de identificação para cada produto.
- Produto: Identifica o produto.
- Valor: Exibe o valor do produto.
- Categoria: Define a área que o produto pertence.
- Data: Data em que o produto foi vendido.
- Vendedor: Nome do funcionário que realizou a venda do produto.

### Que perguntas de negócio poderíamos responder com esses dados?

-Qual valor total da compra por Cliente?

 O valor total gasto por _Id de cliente levando em consideração _Valor  e quantidade de _Produto

-É possível conceber comissões para o vendedor?

 Sim, conforme quão recorrente o nome é apresentado é possível calcular sua comissão.

-Quando foi efetuada a venda de um produto específico/vendedor/categoria?

 É possível visualizar através da _Data 

-Será possível identificar a categoria a que cada produto pertence?

 Sim, com os campos _Categoria e _Produto.

-Qual a Categoria mais rentável?
 
  Dividir a soma de vendas da _Categoria pelo valor total geral de todas as vendas.

### Se fosse resolver isso com um loop for, como seria? Escreva o pseudocódigo. 

```java
List<String> vendedores = new ArrayList<String>();

vendedores.add("João");
vendedores.add("João");
vendedores.add("João");
vendedores.add("Samuel");

String nomeProcurado = "João";
int contador = 0;

for(String vendedor : vendedores)
	if(vendedor.equals(nomeProcurado))
{
contador++;
}

System.out.println("O vendedor " + nomeProcurado + " aparece " +contador+ " vezes na lista de vendas.");

  }
}
```


### Quais problemas esse código imperativo teria — testabilidade, reaproveitamento, clareza?

O código imperativo seria um fator de atraso nas necessidades que o problema apresenta, com um gasto computacional e linhas de código demasiadas para o tamanho do problema. Pouco reaproveitamento, e baixa testabilidade.

## 2) Implemente as funções de filtragem. Implemente as duas funções abaixo. 

### Como escrever funções que retornam outras funções em JavaScript e por que isso é útil para composição?

Utilizando return, fazendo uma função retornar outra função: 
```js
function a(b)
 {
 return b();
 }
```

Ou usando uma arrow function. 
```js
const somatoria = (x) => (y) => x + y;
```

- Facilita a reutilização, aproveita uma função que recebe vários argumentos, fazendo vários argumentos receberem uma função. 

- Criação de pipelines, fazendo passar o valor de uma função diretamente para outra (f(a(b)).

- Redução de repetições, mais fáceis de usar, podem ser combinadas para realizar atividades mais complexas. 

```javascript
const vendas = [
  { item: 'Notebook', preco: 1000, categoria: 'tech' },
  { item: 'Cadeira', preco: 150, categoria: 'moveis' },
  { item: 'Mouse', preco: 50, categoria: 'tech' },
  { item: 'Monitor', preco: 600, categoria: 'tech' }
];

 // filtrarPorValorMinimo(min) → deve retornar uma função que recebe uma lista e filtra 

const filtrarPorValorMinimo = (min) =>
{
	return (vendas) => vendas.filter(item => item.preco >= min);
};

// filtrarPorCategoria(categoria) → mesma ideia, filtro por campo de texto 

const  filtrarPorCategoria = (categoria) =>
{

	return (vendas) => vendas.filter(item => item.categoria === categoria);

} 
```
## 3)

1. **`resumir`** — Extrai apenas `produto`, `valor` e `categoria` de cada item usando `.map()` com destructuring
2. **`totalPorCategoria`** — Agrupa e soma os valores por categoria usando `.reduce()`
3. **`ordenarPorValor`** — Ordena as categorias por total de forma decrescente usando `.toSorted()`

Para ordenar uma lista (array) sem mutar o array original em JavaScript, a melhor opção moderna é utilizar o método toSorted().

- sort() (Modifica o original): Ordena o array in-place (no local), ou seja, altera diretamente a referência da lista original e retorna o mesmo array ordenado.
- toSorted() (Não modifica o original): Este método cria uma cópia do array, ordena essa cópia e a retorna, mantendo o array original intacto.
- Nem todas as funções recebem a lista como último argumento, essa é uma característica de bibliotecas projetadas para facilitar o "currying" e a composição de funções. No JavaScript nativo, a estrutura varia. Em muitos casos de métodos que aceitam callbacks (como map, filter, reduce), porém, em funções focadas em imutabilidade e manipulação de dados, colocar a lista por último facilita o fluxo de dados (pipe ou compose).

## 4)

### Funções de filtragem
- **`filtrarPorValorMinimo(min)(lista)`** — Retorna itens com `preco >= min`
- **`filtrarPorCategoria(cat)(lista)`** — Retorna itens com `categoria === cat`

### Testes por função

#### `filtrarPorValorMinimo`
| Teste | Esperado |
|---|---|
| `filtrarPorValorMinimo(800)(vendas).length === 2` | Notebook (1000) e Monitor (600+) passam |
| `filtrarPorValorMinimo(-1)(vendas).length === 4` | Todos os 4 itens têm preço >= -1 |
| `filtrarPorValorMinimo(100)(vendasVazio).length === 4` | Assertion failed: Lista vazia retorna 0, não 4 |

#### `filtrarPorCategoria`
| Teste | Esperado |
|---|---|
| `filtrarPorCategoria('perfiféricos')(vendas).length === 1` | Assertion failed: Typo no nome da categoria, não encontra nenhum |
| `filtrarPorCategoria('moveis')(vendas).length === 1` | Cadeira é o único item da categoria moveis |
| `filtrarPorCategoria('moveis')(vendasVazio).length === 1` | Assertion failed: Lista vazia retorna 0, não 1 |

#### `resumir`
| Teste | Esperado |
|---|---|
| `resumir.length === 50` | 50 produtos mapeados |
| `resumir[0].vendedor === undefined` | Map extraiu só produto/valor/categoria |
| `resumir[0].produto !== undefined` | Campo produto foi mantido |
| `resumir.length === 10` | Assertion failed: São 50 itens, não 10 |
| `resumir[0].vendedor !== undefined` | Assertion failed: Vendedor foi removido pelo map |

#### `totalPorCategoria`
| Teste | Esperado |
|---|---|
| `totalPorCategoria['tech'] === 7700` | Notebook (3200) + Ultrabook (4500) = 7700 |
| `totalPorCategoria['periféricos'] === 1000` | Mouse (150) + Teclado (450) + Webcam (280) + Mousepad (120) = 1000 |
| `totalPorCategoria['tech'] === 0` | Assertion failed: Tech soma 7700, não 0 |
| `totalPorCategoria['inexistente'] === 500` | Assertion failed: Categoria não existe, retorna undefined |

#### `ordenarPorValor`
| Teste | Esperado |
|---|---|
| `ordenarPorValor[0].total >= ordenarPorValor[1].total` | Primeiro item tem o maior total |
| `ordenarPorValor[0].total <= ordenarPorValor[1].total` | Assertion failed: Está em ordem decrescente, primeiro é maior |



<div align="center">
  <h1>Composição e Pipeline</h1>
</div>



## 1) O que é composição de funções?: 

### O que é composição de funções? Em que situações ela elimina código desnecessário?

É o processo de empilhar funções, passando o resultado de uma função como entrada para outra.

Em termos matemáticos: f(x) e g(x) a composição deles seria f(g(x)).

Eliminando variáveis temporárias,que só serviriam para serem usadas na próxima linha. Reduz tamanho de código, reutiliza a lógica sem criar funções novas.

 ### Qual a diferença entre pipe e compose? Qual a ordem de execução em cada um?

A diferença entre Pipe e Compose é a ordem de execução da função, no momento de empilhamento de multiplas operações.

Pipe: Executa a função da esquerda para direita (ou do topo para baixo). É considerado mais intuitivo pois combina com a ordem natural de leitura e o fluxo dos dados.

Compose: Executa as funções da direita para a esquerda. Tem uma aproximação maior com a matemática tradicional. Assim como (f * g)(x) = f(g(x)), onde G é aplicado a X primeiro.

 ### Por que as funções do módulo 1 foram escritas com currying? O que isso permite? 

Porque dessa forma uma nova função sempre esperava pelo próximo argumento, sem retornar um resultado até que todos os argumentos sejam passados. Usando essa técnica, as funções se tornaram mais especializadas e puderam ser reutilizadas como argumento para as outras funções. No exercício 3 por exemplo, a função resumir serve de argumento para totalPorCategoria, que então serve de argumento para ordenarPorValor, cada uma responsável por uma parte do fluxo.

## 2) Implemente a função pipe do zero 

### Implemente pipe usando apenas reduce — sem loops
### Teste: pipe(f, g, h)(valor) deve ser equivalente a h(g(f(valor)))

 ```js 
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
```
### - O que acontece se você passar apenas uma função para o pipe?

O Rest (...funcoes) criará um array com apenas um item: [fn]. O reduce executará apenas uma vez, aplicando fn(valorInicial). O resultado será apenas o retorno dessa única função, sem erro algum.





