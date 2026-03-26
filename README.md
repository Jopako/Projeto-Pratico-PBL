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

## 4)

### Funções de filtragem (curried)
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
| `totalPorCategoria['tech'] === 7700` | ✅ Notebook (3200) + Ultrabook (4500) = 7700 |
| `totalPorCategoria['periféricos'] === 1000` | ✅ Mouse (150) + Teclado (450) + Webcam (280) + Mousepad (120) = 1000 |
| `totalPorCategoria['tech'] === 0` | Assertion failed: Tech soma 7700, não 0 |
| `totalPorCategoria['inexistente'] === 500` | Assertion failed: Categoria não existe, retorna undefined |

#### `ordenarPorValor`
| Teste | Esperado |
|---|---|
| `ordenarPorValor[0].total >= ordenarPorValor[1].total` | Primeiro item tem o maior total |
| `ordenarPorValor[0].total <= ordenarPorValor[1].total` | Assertion failed: Está em ordem decrescente, primeiro é maior |

