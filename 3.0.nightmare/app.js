'use strict'

var Nightmare  = require('nightmare')
  , vo         = require('vo')
  , fs         = require('fs')
  , request    = require('request')
  , account    = require('../account.js')
  , username   = account.instagram.username
  , password   = account.instagram.password
  , userToLike = process.argv[2] || "marciegottschalk"
  , Slack      = require('../2.1.cheerio/slack.js')
  ;

vo(run)(function(err, result) {
  if (err) throw err;
});

function *run() {
  let x = Date.now();

  console.log('Iniciando Electorn');
  let nightmare = Nightmare({ show: true });

  console.log("Esperando tela de login");
  yield nightmare
    .useragent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
    .goto('https://www.instagram.com/accounts/login/')
    .wait()
    .wait('form button');

  console.log(`Preenchendo dados de ${username}`);
  yield nightmare
    .evaluate(function(username, password){
      var event = new Event('input', { bubbles: true });
      document.querySelector('[name=username]').value = username;
      document.querySelector('[name=username]').dispatchEvent(event);
      document.querySelector('[name=password]').value = password;
      document.querySelector('[name=password]').dispatchEvent(event);
    }, username, password)
    .wait(600)
    .click('form button')
    .wait(600);

  console.log(`Navegando até ${userToLike}`);
  yield nightmare
    .goto(`https://instagram.com/${userToLike}/`)
    .wait();

  console.log(`Abrindo a primeira foto encontrada`);
  yield nightmare
    .click(`[href*="?taken-by=${userToLike}"]`) // clica na primeira foto
    .wait().wait(1000)
    .screenshot('./images/antes.png')
    
  console.log(`Verificando se a foto ja foi curtida`);
  let isLiked = yield nightmare
    .evaluate(function(){
      return document.querySelectorAll('.coreSpriteHeartFull').length;
    });
  console.log(`Foto curtida? ${isLiked}`);

  if(!isLiked){ // Se a foto nao foi curtida ainda
    console.log(`Curtindo a foto por você :)`);
    yield nightmare
      .evaluate(function(){
        document.querySelector('.coreSpriteHeartOpen').click();
      })
      .wait(300)
      .screenshot('./images/depois.png')

    console.log(`Pegando a URL da imagem`);
    var src = yield nightmare
      .evaluate(function(){
        return document.querySelector('[role="dialog"] article > div img').src
      });

    meAvisa(src);
  }

  console.log("done in " + (Date.now()-x) + "ms");
  yield nightmare.end();
}

function meAvisa(url){
  var slack = new Slack(account.slack.token);
  var msg   = `${url}
  Te liga magrão, tu curtiu essa foto! Comenta com ela depois.
  `;
  
  slack.sendMessage(account.slack.user, msg);
}

function downloadImage(src){
  console.log('Iniciando download da imagem');
  request({ url: src, encoding: 'binary'}, function(err, res, body){
    fs.writeFile('./images/foto.png', body, 'binary', function(err){
      console.log(`Imagem salva em foto.png`);
    });
  });
}