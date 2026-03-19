# Projeto-Pratico-PBL - ##João Paulo Kowalski & Samuel Castilho Pereira 

## 1) Quais campos cada objeto de venda tem? O que cada um representa? 

- Id: representa um index de identificação para cada produto.
- Produto: Identifica o produto.
- Valor: Exibe o valor do produto.
- Categoria: Define a área que o produto pertence.
- Data: Data em que o produto foi vendido.
- Vendedor: Nome do funcionário que realizou a venda do produto.

### Que perguntas de negócio poderíamos responder com esses dados?

- Qual valor total da compra por Cliente?
 O valor total gasto por _Id de cliente levando em consideração _Valor  e quantidade de _Produto

- É possível conceber comissões para o vendedor?
 Sim, conforme quão recorrente o nome é apresentado é possível calcular sua comissão.

- Quando foi efetuada a venda de um produto específico/vendedor/categoria?
 É possível visualizar através da _Data 

- Será possível identificar a categoria a que cada produto pertence?
 Sim, com os campos _Categoria e _Produto.

- Qual a Categoria mais rentável?
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

- Facilita a reutilização, aproveita uma função que recebe vários argumentos, fazendo vários argumentos receberem uma função. 

- Criação de pipelines, fazendo passar o valor de uma função diretamente para outra (f(a(b)).

- Redução de repetições, mais fáceis de usar, podem ser combinadas para realizar atividades mais complexas. 

```javascript
const vendas = [
  { item: 'Notebook', preco: 1000, cat: 'tech' },
  { item: 'Cadeira', preco: 150, cat: 'moveis' },
  { item: 'Mouse', preco: 50, cat: 'tech' },
  { item: 'Monitor', preco: 600, cat: 'tech' }
];

 // filtrarPorValorMinimo(min) → deve retornar uma função que recebe uma lista e filtra 

const filtrarPorValorMinimo = (min) =>
{
	return (vendas) => vendas.filter(item => item.preco <= min);
};

// filtrarPorCategoria(categoria) → mesma ideia, filtro por campo de texto 

const  filtrarPorCategoria = (categoria) =>
{

	return (vendas) => vendas.filter(item => item.categoria === categoria);

} 
```
