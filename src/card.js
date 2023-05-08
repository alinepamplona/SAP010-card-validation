import validator from './validator.js';

// Achar os elementos no HTML
// Elementos do formulário
const numerodocartao = document.getElementById('numerodocartao')
const validademes = document.getElementById('validademes')
const validadeano = document.getElementById('validadeano')
const nome = document.getElementById('nome')
const codigodeseguranca = document.getElementById('codigodeseguranca')
const botaodevalidacao = document.getElementById('validacao')
// Elementos do cartão
const cartaonumero = document.getElementById('cartaonumero')
const cartaonome = document.getElementById('cartaonome')
const cartaovalidade = document.getElementById('cartaovalidade')
const cartaocvv = document.getElementById('cartaocvv')

// Array com o nome dos meses para serem adicionados nos options do select
const meses = ["Jan", "Fev", "Mar", "Abril", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
for (let i = 0; i < meses.length ; i++) {
  const option = document.createElement("option")
  if (i < 9) {
    option.value = "0"+(i+1)
  } else {
    option.value = i+1
  }
  option.text = meses[i]
  validademes.appendChild(option)
}
//<select id="validademes">
//  <option value="">Mês</option>
//  <option value="01" text="Jan"></option>
//  <option value="02" text="Fev"></option>
//  ...
//  <option value="12" text="Dez"></option>
//</select>

// Define o ano atual como o limite inferior
const limiteInferior = new Date().getFullYear();
// Define o limite superior como 10 anos depois do limite inferior
const limiteSuperior = limiteInferior + 10;
// Adiciona as opções de ano
for (let i = limiteInferior; i <= limiteSuperior ; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  validadeano.appendChild(option);
}
//<select id="validadeano">
//  <option value="2023" text="2023"></option>
//  <option value="2024" text="2024"></option>
//  ...
//  <option value="2033" text="2033"></option>
//</select>


// Implementar os metodos de event listener do input
// objeto.atributo -> acessando um atributo Ex: String, Boolean, Integer, Objeto
// objeto.function() -> chama uma function do objeto, que pode ter um retorno ou não
// objeto.function(parametro1, parametro2)
// input.addEventListener(tipoDeEnvento->String, function(event){codigo para executar qndo acontecer o evento})
// qndo der um . é pq quero acessar os atributos ou funções do objeto (variavel)
numerodocartao.addEventListener('input', function(event) {
  // Pegar o input usando o event
  const input = event.target

  // Pegar o valor do input aplicar a mascara de espaços
  input.value = mascaras.mascaracartao(input.value)

  // Atribuindo o valor do input no span do cartão
  // No span o innerHTML é o atributo que muda o texto dele, diferente do input que usa o value
  cartaonumero.innerHTML = input.value

  // Se for vazio recoloca os 0s
  if (input.value.length === 0) {
    cartaonumero.innerHTML = "0000 0000 0000 0000"
    // Se o numero do cartão no input tiver até 12 digitos
    // troca os numeros por *
  } else if (input.value.length < 15) {
    cartaonumero.innerHTML = cartaonumero.innerHTML.replace(/\d/g, '*')
    // Se o numero do cartão no input tiver menos de 16 digitos e mais de 12
    // troca somente os 12 primeiros por *
  } else if (input.value.length < 19) {
    cartaonumero.innerHTML = cartaonumero.innerHTML.replace(/\d{4} \d{4} \d{4}/, '**** **** ****')
  } else {
    // Aplica a mascara de * para mostrar apenas os 4 digitos
    cartaonumero.innerHTML = validator.maskify(cartaonumero.innerHTML)
    // Adiciona os espaços em branco novamente pq o maskify remove os espaços
    cartaonumero.innerHTML = mascaras.mascaracartao(cartaonumero.innerHTML)
  }
})

nome.addEventListener('input', function(event) {
  // target é o objeto que recebeu o evento (input nesse caso)
  // criando uma variavel para guardar o target e ficar mais facil de acessar
  const input = event.target

  input.value = mascaras.mascaranome(input.value)

  if (input.value.length === 0) {
    cartaonome.innerHTML = "NOME DO TITULAR"
  } else {
    cartaonome.innerHTML = input.value
  }
})

// Adicionar uma escuta no evento de change no select do mes
// Toda vez que acontece uma mudança no select a function vai ser executada
validademes.addEventListener('change', function(event) {
  const select = event.target

  cartaovalidade.innerHTML = select.value + "/" + validadeano.value
})

validadeano.addEventListener('change', function(event) {
  const select = event.target

  cartaovalidade.innerHTML = validademes.value + "/" + select.value
})

codigodeseguranca.addEventListener('input', function(event) {
  const input = event.target

  input.value = mascaras.mascaracvv(input.value)

  if (input.value.length === 0) {
    cartaocvv.innerHTML = "000"
  } else {
    cartaocvv.innerHTML = input.value
  }
})

// Adicionar uma escuta no evento de click no botão de validação
// Toda vez que acontece um click no botão a function vai ser executada
botaodevalidacao.addEventListener('click', function() {
  // Mostrar o alert de valido ou não somente se os outros campos tb estiverem preenchidos
  if ((validademes.selectedIndex > 0 && validadeano.selectedIndex > 0)
            && (codigodeseguranca.value.length === 3)
            && (nome.value.length > 0)) {
    if (validator.isValid(numerodocartao.value)) {
      alert("Seu cartão é válido!")
    } else {
      alert("Seu cartão é inválido!")
    }
  } else {
    alert("Preencha corretamente todos os dados.")
  }
})

// Criar as mascaras (usar o validator como referencia de como criar um objeto com funções)
const mascaras = {
  // Adiciona um espaço em branco a cada 4 digitos
  mascaracartao: function(numerodocartao) {
    return numerodocartao
      .replace(/[^0-9*]/g, '')
      .replace(/(\d{4}|\*{4})(\d|\*)/, '$1 $2')
      .replace(/(\d{4}|\*{4})(\d|\*)/, '$1 $2')
      .replace(/(\d{4}|\*{4})(\d)/, '$1 $2')
  },
  // a regex está buscando todas as ocorrências de caracteres que não são letras ou espaços em branco e substituindo por uma string vazia.
  mascaranome: function(nome) {
    return nome
      .replace(/[^a-zA-ZÀ-ú ]+/g, '')
  },
  // essa regex troca não números por vazio por uma string vazia.
  mascaracvv: function(cvv) {
    return cvv
      .replace(/[^0-9]/g, '')
  }
};
