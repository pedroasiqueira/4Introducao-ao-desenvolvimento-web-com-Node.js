const readline = require('readline-sync');

const imc = (peso, altura) => console.log(peso/altura**2);

const weight = readline.questionInt('What’s your weight? ');
const height = readline.questionInt('What’s your height? ');

imc(weight, height);