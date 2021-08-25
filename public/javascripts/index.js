
$(document).ready(function () {
    
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };
    $('#celular').mask(SPMaskBehavior, spOptions);
    $('#cpf').mask('000.000.000-00', {reverse: true});
    $('#valor').mask('#.##0,00', {reverse: true});

    $('.formulario').submit(function(event) {
        var form = $(this);
        $('.info-conteudo .loading').addClass('ativo');
        $.ajax({
            url: "/token",
            data: {
                nome: form.find('input#nome').val(),
                email: form.find('input#email').val(),
                telefone: form.find('input#celular').val(),
                cpf: form.find('input#cpf').val(),
                valor: form.find('input#valor').val(),
            },
            type: 'POST',
            dataType: 'text',
            success: function(response) {
               if(response != 'erro') {
                    var code = response;
                    var callback = {
                        success : function(transactionCode) {
                            console.log("Compra feita com sucesso, código de transação: " + transactionCode);
                        },
                        abort : function() {
                            console.log("abortado");
                        }
                    };
                    var isOpenLightbox = PagSeguroLightbox(code, callback);
                    $('.info-conteudo .loading').removeClass('ativo');
                    if (!isOpenLightbox){
                        location.href="https://pagseguro.uol.com.br/v2/checkout/payment.html?code=" + code;
                        console.log("Redirecionamento")
                    }
               }
            },
            error: function (error) {
                console.log(error); 
            }
        });
        return false;
    });
});