/**
 * @Author Leonardo Cruz
*/
var express = require('express');
var convert = require('xml-js');
var router = express.Router();

const Api = require('../controller/api');


let api = new Api;

let idGeradoSessao;

(async() => {
  //Gerando uma sessão
  //const gerandoSessao = await api.GerarSessaoPost();
  //const jsonSessao = convert.xml2json(gerandoSessao,{compact: true, spaces: 4});
  //console.log(JSON.parse(jsonSessao));
})();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    title: 'Página Inicial',
    tituloLista: 'Faça Sua Doação',
  });
});

/* POST home page. */
router.post('/token', function(req, res, next) {
  (async() => {
    //Gerando uma sessão
    const gerandoSessao = await api.GerarSessaoPost(req);
    const jsonSessao = convert.xml2json(gerandoSessao,{compact: true, spaces: 4});
    if (typeof JSON.parse(jsonSessao).checkout.code._text !== 'undefined') {
      res.send(JSON.parse(jsonSessao).checkout.code._text);
    } else {
      res.send('erro');
    }
  })();
});

module.exports = router;
