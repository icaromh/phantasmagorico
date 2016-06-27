Esse repositório serve para guardar os scripts usados na talk [O Phantasmagórico mundo da Automação](https://speakerdeck.com/icaromh/o-phantasmagorico-mundo-da-automacao) do FrontInSM 2016

## 1.curl

Script em Shell para visualizar o valor corrente do dolar. Printa no terminal uma arte em ascii

Para executar: 

`sh dolar.sh`


## 2.0.cheerio

Script em NodeJS usando os módulos cheerio e request.
Printa no terminal o valor do dólar em uma arte ascii. 
Feito para demonstrar a diferença entre a curl e o módulo request.

Instalar dependências

`cd 2.0.cheerio && npm i` 

Executar

`node app.js` 


## 2.1.cheerio

Script em NodeJS usando os módulos cheerio e request. Utiliza as chamadas do site da Alelo para buscar o valor do saldo do cartão principal.
Após buscar o saldo no cartão envia uma mensagem no Slack com o valor.

Instalar dependências

`cd 2.1.cheerio && npm i` 

Executar

`node app.js`

**Obs: usa os dados de account.js**


## 3.0.nightmare

Script usando nightmarejs que abre o Instagram, loga com um usuário definido, navega até outro usuário, curte a última foto e manda uma mensagem no slack avisando.

Instalar dependências

`cd 3.0.nightmare && npm i` 

Executar

`node app.js`

**Obs: usa os dados de account.js**


## 3.1.nightmare

Testes de funcionalidade do Instagram. 
- Testa o login
- Teste se exibe uma mensagem de falha ao errar o login.


Instalar dependências

`cd 3.1.nightmare && npm i` 

`npm i -g mocha` 


Executar

`npm test`

**Obs: usa os dados de account.js**