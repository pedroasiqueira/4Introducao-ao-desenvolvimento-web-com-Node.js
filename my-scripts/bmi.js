const readline = require('readline-sync');

const imc = (peso, altura) => {
  const alturaEmMetros = altura / 100;
  const alturaElevadaADois = alturaEmMetros ** 2;
  const formulaIMCResult = peso/alturaElevadaADois;
  const resultadoIMC = formulaIMCResult.toFixed(2);
  if(resultadoIMC < 18.5){
    return `Seu IMC é: ${resultadoIMC} => Magreza`
  } else if(resultadoIMC >= 18.5 && resultadoIMC <= 24.9){
    return `Seu IMC é: ${resultadoIMC} => Normal`
  } else if(resultadoIMC >= 25.0 && resultadoIMC <= 29.9){
    return `Seu IMC é: ${resultadoIMC} => Sobrepeso`
  } else if(resultadoIMC >= 30.0 && resultadoIMC <= 34.9){
    return `Seu IMC é: ${resultadoIMC} => Obesidade grau I`
  } else if(resultadoIMC >= 35.0 && resultadoIMC <= 39.9){
    return `Seu IMC é: ${resultadoIMC} => Obesidade grau II`
  }  else {
    return `Seu IMC é: ${resultadoIMC} => Obesidade graus III e IV`
  }
};

const weight = readline.questionFloat('What’s your weight? (kg) ');
const height = readline.questionInt('What’s your height? (cm) ');

console.log(imc(weight, height));