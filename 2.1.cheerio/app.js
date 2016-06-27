'use strict'

var Alelo = require('./alelo.js')
  , Slack = require('./slack.js')
  , account = require('../account.js')
  ;

const alelo = new Alelo(account.alelo.cpf, account.alelo.password);

alelo.login()
  .then(function(res){
    return alelo.validateCredentials(res.request, res.j);
  })
  .then(function(res){
    return alelo.getCardInfo(res.request, res.j);
  })
  .then(function(saldo){
    var slack = new Slack(account.slack.token);
    var msg   = `Ícaro, seu saldo é: ${saldo}`;
    slack.sendMessage(account.slack.user, msg);
  })
  
  .catch(function(err){
    console.log(err);
  });