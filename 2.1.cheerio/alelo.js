'use strict'

var request = require('request')
  , btoa    = require("btoa")
  ;

const URLS = {
  cardList : 'https://www.meualelo.com.br/meualelo.services/rest/user/card/preference/list',
  credenciais : 'https://www.meualelo.com.br/meualelo.services/rest/login/credentials',
  login : 'https://www.meualelo.com.br/meualelo.services/rest/login/authenticate'
};

const headers = {
    'User-Agent' : 'User-Agent:Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
    'Content-Type':'application/json',
    'X-Requested-With':'XMLHttpRequest'
};

request.defaults({jar: true});

class Alelo {
  
  constructor(cpf, pwd){
    this.cpf = cpf;
    this.pwd = btoa(pwd);
    this.captchaResponse = '';
  }

  login(){
    let j   = request.jar();
    request = request.defaults({jar: j});
      
    return new Promise((resolve, reject) => {
      let credentials = JSON.stringify({
          pwd : this.pwd,
          cpf : this.cpf,
          captchaResponse : this.captchaResponse
        });
        
      request({
        url : URLS.login,
        method : 'POST',
        headers : headers,
        body : credentials
      }, 
      (err, res, body) => {
        if(err) throw new Error(err);
        resolve({
          'j' : j,
          'request' : request
        });  
          
      });
    });
  }
  
  validateCredentials(request, j){
    
    return new Promise((resolve, reject) => {
      request({
          url : URLS.credenciais,
          method : "GET",
          jar: j,
          headers : headers,
      }, 
      (err, res, body) => {
        if(err) throw new Error(err);
        body = JSON.parse(body);

        if(body.alertCode && body.alertCode === "1"){
          throw new Error("Login Failed");
        }

        resolve({
          'j' : j,
          'request' : request
        });
        
      });  
    });
  }
  
  getCardInfo(request, j){
    return new Promise((resolve, reject) => {
      request({
        url : URLS.cardList,
        method : "GET",
        jar: j,
        headers : headers
      }, 
      function(err, res, body){
        if(err) throw new Error(err);
        
        let info = JSON.parse(body);
        if(info.cardList[0])
          resolve(info.cardList[0].balance);
        else
          reject('Não encontrou as informações :(');
      });
    });
  }
  
};

module.exports = Alelo;