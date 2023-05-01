const validator = {

  isValid: function(numerodocartao) {
    // Remove espaços em branco e reverte a string para facilitar o cálculo
    numerodocartao = numerodocartao.replace(/\s/g, '').split('').reverse().join('');

    // Verifica se a entrada contém apenas dígitos numéricos
    if (!/^[0-9]+$/.test(numerodocartao)) {
      return false;
    }

    let sum = 0

    for (let i=0; i<numerodocartao.length; i++) {
      // Transformar o caractere da posição i em inteiro
      let digito = parseInt(numerodocartao.charAt(i))
      
      // Verificar se é impar
      if (i%2 === 1) {
        // Se for par multiplica por 2
        digito *= 2
        // Verificar se é maior que 9
        if (digito > 9) {
          // Isso é a mesma coisa que somar os digitos
          digito -= 9
        }
      }
      // Se for par não faz nada

      // Isso é a msm coisa que isso sum = sum + digito
      sum += digito
    }

    // Retorna true somente se for divisivel por 10
    return sum%10 === 0
  },

  maskify: function(numerodocartao) {
    // Trocar o espaço em branco por vázio
    numerodocartao = numerodocartao.replace(/\s/g, '')

    if (numerodocartao.length <= 4) {
      // Não há nada para mascarar
      return numerodocartao;
    } else {
      // Obter os últimos quatro dígito
      const quatroultimos = numerodocartao.slice(-4);
      // Criar uma string mascarada com "#" para os dígitos não finais
      return "*".repeat(numerodocartao.length - 4) + quatroultimos;
    }
  }
};

export default validator;
