import validator from './validator.js';

// Achar os elementos no HTML
// Elementos do formulário
const numerodocartao = document.getElementById('numerodocartao')
const mensageminvalido = document.getElementById('mensageminvalido')
const validade = document.getElementById('validade')
const nome = document.getElementById('nome')
const codigodeseguranca = document.getElementById('codigodeseguranca')
// Elementos do cartão
const cartaonumero = document.getElementById('cartaonumero')
const cartaonome = document.getElementById('cartaonome')
const cartaovalidade = document.getElementById('cartaovalidade')
const cartaocvv = document.getElementById('cartaocvv')

// Implementar os metodos de event listener do input
numerodocartao.addEventListener('input', function(event) {
    // Pegar o input usando o event
    let input = event.target

    // Pegar o valor do input aplicar a mascara de espaços
    input.value = mascaras.mascaracartao(input.value)

    // Depois de aplicar a mascara verificar se já temos todos os números do cartão
    if (input.value.length === 19) {
        // Verifica se o cartão é válido
        if (validator.isValid(input.value)) {
            // Se ele é válido aplica a mascara de # para mostrar apenas os 4 digitos
            input.value = validator.maskify(input.value)
            // Adiciona os espaços em branco novamente pq o maskify remove os espaços
            input.value = mascaras.mascaracartao(input.value)
            // Esconde a mensagem de cartão inválido
            mensageminvalido.setAttribute('hidden', '')
        } else {
            // Caso seja invalido mostra mensagem de cartão inválido
            mensageminvalido.removeAttribute('hidden')
        }
    }

    if (input.value.length === 0) {
        cartaonumero.innerHTML = "0000 0000 0000 0000"
    } else {
        cartaonumero.innerHTML = input.value.replace(/#/g, '*')
    }
})

nome.addEventListener('input', function(event) {
    let input = event.target

    input.value = mascaras.mascaranome(input.value)

    if (input.value.length == 0) {
        cartaonome.innerHTML = "NOME DO TITULAR"
    } else {
        cartaonome.innerHTML = input.value
    }
})

validade.addEventListener('input', function(event) {
    let input = event.target

    input.value = mascaras.mascaravalidade(input.value)

    if (input.value.length == 5) {
        cartaovalidade.innerHTML = input.value
    } else {
        cartaovalidade.innerHTML = "00/00"
    }
})

codigodeseguranca.addEventListener('input', function(event) {
    let input = event.target

    input.value = mascaras.mascaracvv(input.value)

    if (input.value.length == 0) {
        cartaocvv.innerHTML = "000"
    } else {
        cartaocvv.innerHTML = input.value
    }
})

// Criar as mascaras (usar o validator como referencia de como criar um objeto com funções)
const mascaras = {
    // Adiciona um espaço em branco a cada 4 digitos
    mascaracartao: function(numerodocartao) {
        return numerodocartao
            .replace(/[^0-9#]/g, '')
            .replace(/(\d{4}|\#{4})(\d|\#)/, '$1 $2')
            .replace(/(\d{4}|\#{4})(\d|\#)/, '$1 $2')
            .replace(/(\d{4}|\#{4})(\d)/, '$1 $2')
    },

    mascaranome: function(nome) {
        return nome
            .replace(/[^a-zA-ZÀ-ú ]+/g, '')
    },

    mascaravalidade: function(validade) {
        return validade
            .replace(/[^0-9]/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
    },

    mascaracvv: function(cvv) {
        return cvv
            .replace(/[^0-9]/g, '')
    }
};
