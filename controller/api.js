/**
 * @Author Leonardo Cruz
*/
const https = require('https');
const http = require('http');
const request = require('request');

class Api { 
    //POST
    GerarSessaoPost = async(req) => {
        const qs = require('qs')

        let telefone = req.body.telefone.split(' '); 
        let senderAreaCode = telefone[0].replace(/[()]/g, '')
        let phonenumber = telefone[1].replace(/[-]/g, '')
        
        let cpf = req.body.cpf.replace(/[-.]/g, '');

        let valor = req.body.valor.replace(/[,]/g, '.')

        const emailToken = {
          email: 'SEU E-MAIL',
          token: 'SEU TOKEN',
          currency: 'BRL',
          itemId1: '10',
          itemDescription1: 'Doação pelo site.',
          itemAmount1: valor,
          itemQuantity1: '1',
          senderName: req.body.nome,
          senderEmail: req.body.email,
          senderAreaCode: senderAreaCode,
          phonenumber: phonenumber,
          senderCPF: cpf,
          reference: 'referenciateste'
        }

        var options = {
            url: 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout',
            method: 'POST',
            body: qs.stringify(emailToken),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
        };
          
        
        return new Promise((success, error) => {
          request(options, (erro, response, body) => {
            console.log(response.statusCode);
            if(response.statusCode == 200) {  
                success(body);
            } else{
                error(erro);
            }
          });
        });
    }
}
module.exports = Api;