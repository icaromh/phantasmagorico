require('mocha-generators').install();
var Nightmare  = require('nightmare')
  , expect     = require('chai').expect // jshint ignore:line
  , account    = require('../../account.js')
  ;

describe('Login', function() {
  this.timeout(90 * 1000);

  beforeEach(function() {
    nightmare = Nightmare();
  });

  afterEach(function*() {
    yield nightmare.end();
  });

  it('Deve logar e exibir 12 fotos', function* (done) {
    
    yield nightmare
      .goto('https://instagram.com/accounts/login/')
      .wait()
      .wait('form button')
      .evaluate(function(username, password){
        var event = new Event('input', { bubbles: true });
        $('[name=username]')[0].value = username;
        $('[name=username]')[0].dispatchEvent(event);
        $('[name=password]')[0].value = password;
        $('[name=password]')[0].dispatchEvent(event);
      }, account.instagram.username, account.instagram.password)
      .wait(600)
      .click('form button')
      .wait(600)
      .screenshot('test/login-success.png')
      .evaluate(function(){
        return document.querySelectorAll('main > section article').length
      })
      .end()
      .then(function(numPhotos) {
        expect(numPhotos).to.equal(12);
      });
  });

  it('Deve exibir uma mensagem de erro ao falhar login', function* (done) {

    yield nightmare
      .goto('https://instagram.com/accounts/login/')
      .wait()
      .wait('form button')
      .evaluate(function(username, password){
        var event = new Event('input', { bubbles: true });
        $('[name=username]')[0].value = username;
        $('[name=username]')[0].dispatchEvent(event);
        $('[name=password]')[0].value = password;
        $('[name=password]')[0].dispatchEvent(event);
      }, account.instagram.username, 'wrongpassword')
      .wait(600)
      .click('form button')
      .wait(600)
      .screenshot('test/login-error.png')
      .evaluate(function(){
        return document.getElementById('slfErrorAlert').innerHTML;
      })
      .end()
      .then(function(msg) {
        expect(msg).to.equal("Sua senha está incorreta. Confira-a.");
      });
  });

});
