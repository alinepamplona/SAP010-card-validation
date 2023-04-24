import validator from './validator.js';

// Achar os elementos no HTML
const numerodocartao = document.getElementById('numerodocartao')
const mensageminvalido = document.getElementById('mensageminvalido')
const valordoado = document.getElementById("valordoado")
const validade = document.getElementById("validade")

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
  });

// TODO: Implementar o event listener dos outros inputs
valordoado.addEventListener('input', function(event) {
    let input = event.target

    input.value = mascaras.mascaravalor(input.value)
});

validade.addEventListener('input', function(event) {
    let input = event.target

    input.value = mascaras.mascaravalidade(input.value)
});

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

    // TODO: Fazer a mascara para a validade
    mascaravalor: function(valordoado) {
        return valordoado
            .replace(/[^0-9]/g, '')
    },

    mascaravalidade: function(validade) {
        return validade
            .replace(/[^0-9]/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
    },
};
