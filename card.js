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

// Adiciona as opções de mês
for (let i = 1; i <= 12; i++) {
  const option = document.createElement("option");
  if (i < 10) {
    option.value = "0"+i;
    option.text = "0"+i;
  } else {
    option.value = i;
    option.text = i;
  }
  validademes.appendChild(option);
}
// Define o ano atual como o limite inferior
const limiteInferior = new Date().getFullYear();
// Define o limite superior como 10 anos depois do limite inferior
const limiteSuperior = limiteInferior + 10;
// Adiciona as opções de ano
for (let i = limiteInferior; i <= limiteSuperior; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;
  validadeano.appendChild(option);
}

// Implementar os metodos de event listener do input
numerodocartao.addEventListener('input', function(event) {
  // Pegar o input usando o event
  const input = event.target

  // Pegar o valor do input aplicar a mascara de espaços
  input.value = mascaras.mascaracartao(input.value)

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
  const input = event.target

  input.value = mascaras.mascaranome(input.value)

  if (input.value.length === 0) {
    cartaonome.innerHTML = "NOME DO TITULAR"
  } else {
    cartaonome.innerHTML = input.value
  }
})

validademes.addEventListener('change', function() {
  let ano = "0000"
  if (validadeano.selectedIndex > 0) {
    ano = validadeano.value
  }
  cartaovalidade.innerHTML = this.value + "/" + ano
})

validadeano.addEventListener('change', function() {
  let mes = "00"
  if (validademes.selectedIndex > 0) {
    mes = validademes.value
  }
  cartaovalidade.innerHTML = mes + "/" + this.value
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

  mascaranome: function(nome) {
    return nome
      .replace(/[^a-zA-ZÀ-ú ]+/g, '')
  },

  mascaracvv: function(cvv) {
    return cvv
      .replace(/[^0-9]/g, '')
  }
};
