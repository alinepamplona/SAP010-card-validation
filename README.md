# Card Validation

## Índice

* [1. Introdução](#1-Introdução)
* [2. Resumo do site](#2-resumo-do-site)
* [3. Interface e experiência do usuário](#3-interface-e-experiência-do-usuário)
* [4. Sintetize do algoritmo Luhn](#4-sintetize-do-algoritmo-luhn)
* [5. Implementação do objeto validator](#5-implementação-do-objeto-validator)
* [6. Acesse o projeto](#6-acesse-o-projeto)

***

## 1. Introdução

O projeto Card Validation é uma das primeiras atividades propostas pelo Bootcamp Laboratória, que tem como objetivo desafiar as alunas a desenvolver habilidades iniciais e aprender conceitos básicos de programação web, incluindo a estruturação de páginas HTML, estilização com CSS e programação de interações com JavaScript.

### Os objetivos gerais deste projeto são os seguintes

* Trabalhar com base em um boilerplate, a estrutura básica de um projeto em diferentes
  pastas (através de módulos em JS).
* Conhecer as ferramentas de manutenção e melhoria do código (linters e testes
  unitários).
* Aprenda sobre objetos, estruturas, métodos e iteração (loops) em JavaScript
* Implementar controle de versão com git (e a plataforma github)

## 2. Resumo do site

O propósito desse site foi criar um formulário de validação de cartões de crédito, onde o usuário pode inserir os dados do seu cartão e verificar se as informações fornecidas são válidas ou não, utilizando o algoritmo Luhn, o qual é amplamente aplicado na indústria de pagamentos como uma medida de segurança para prevenir fraudes e erros de digitação em transações financeiras.

## 3. Interface e experiência do usuário

O site oferece uma interface simples e intuitiva ao usuário para inserir o número do cartão de crédito que deseja validar de forma segura. Em segundos, o algoritmo Luhn será aplicado e o resultado da validação será exibido.

![Página de validação](https://github.com/alinepamplona/SAP010-card-validation/blob/daf16816a8ce81c29f8fda405b84a665e1f92b3d/pagina_de_validacao.png?raw=true)

## 4. Sintetize do algoritmo Luhn

Esse algoritmo é simples. Obtemos o inverso do número a ser verificado (que contém apenas dígitos [0-9]); todos os números que ocupam uma posição impar devem ser multiplicados por dois; se esse número for maior ou igual a 10, devemos adicionar os dígitos do resultado; o número a verificar será válido se a soma de seus dígitos finais for um múltiplo de 10.

```
// Variável para guardar o valor da soma
let sum = 0

for (let i=0; i<numerodocartao.length; i++) {
  // Transformar o caractere da posição i em inteiro
  let digito = parseInt(numerodocartao.charAt(i))
  
  // Verificar se é impar
  if (i%2 === 1) {
    // Se for impar multiplica por 2
    digito *= 2
    // Verificar se é maior que 9
    if (digito > 9) {
      // Isso é a mesma coisa que somar os digitos
      digito -= 9
    }
  }
  // Se for par não faz nada

  // Adiciona à soma
  sum += digito
}
```

## 5. Implementação do objeto validator

O objeto Validator contém duas funções: isValid e maskify. A função isValid é usada para validar números de cartão de crédito, enquanto a função maskify é usada para mascarar números de cartão de crédito.

A função isValid verifica se um número de cartão de crédito é válido usando o algoritmo de Luhn.

A função maskify é usada para mascarar os números de cartão de crédito, substituindo os dígitos não finais por "*" e exibindo apenas os últimos quatro dígitos do número.

Esse objeto foi utilizado como uma ferramenta para implementação do site.

## 6. Acesse o projeto

O projeto está disponível para acesso pelo GitHub Pages, através do Link:

https://alinepamplona.github.io/SAP010-card-validation