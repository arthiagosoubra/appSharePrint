$(document).ready(function () {

    $('body.hortifrutibrasileiros .warning.pay').hide(); //
    $('body.ifruts .warning.pay').hide();
    $('body.mesturafemenina .warning.pay').hide();

    
    $('#copypix').click(function() {
        generatePixCode();
        copypaypixToClipboard();
        exibirAviso('Código do PIX foi copiado');
    });

    $('.warning.update').show();

});

var dataAtual = new Date();
var numeroMes = dataAtual.getMonth();
var mes = numeroMes + 1;


function generatePixCode() {
    paypix = '00020126360014BR.GOV.BCB.PIX0114+5583986612160520400005303986540520.005802BR5923THIAGO SOUTO BRASILEIRO6009SAO PAULO62130509pixcartao';
    var crc16 = pegaCRC16(paypix);
    paypix += '6304' + crc16.toString(16).toUpperCase();
    document.getElementById('copypix').disabled = false;
}

function copypaypixToClipboard() {
    var tempInput = document.createElement("input");
    tempInput.value = paypix;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}
function pegaCRC16(paypix) {
    paypix += '6304';
    var polinomio = 0x1021;
    var resultado = 0xFFFF;
    var length = paypix.length;
    for (var offset = 0; offset < length; offset++) {
        resultado ^= (paypix.charCodeAt(offset) << 8);

        for (var bitwise = 0; bitwise < 8; bitwise++) {
            if ((resultado <<= 1) & 0x10000) {
                resultado ^= polinomio;
            }
            resultado &= 0xFFFF;
        }
    }
    return resultado;
}
