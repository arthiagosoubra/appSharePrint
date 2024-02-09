

$(document).ready(function () {

        // VARIÁVEIS DE CLIENTES
        var titleColorLight = '#ffffff';
        var titleColorDark = '#313131';
    
        var metas = '<meta name="description" content="' + description + '">'+
                    '<title>' + title + '</title>';
    
        var link = 'https://arthiagosoubra.github.io/appSharePrint/clients/';
        var iconLink = link + website + '/';
        var iconLight = iconLink+'icon.svg';
        var iconDark = iconLink+'icon_dark.svg';
    
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        function toggleDarkMode() {
            const darkMode = darkModeMediaQuery.matches;
            $('body').toggleClass('dark-mode', darkMode);
    
            $('meta[name="msapplication-TileColor"]').remove();
            $('meta[name="theme-color"]').remove();
    
            if (darkMode) {
                $('head').append('<meta name="msapplication-TileColor" content="' + titleColorDark + '">' +
                                '<meta name="theme-color" content="' + titleColorDark + '">');
                                $('body.dark-mode header #logo').css('background-image', 'url('+iconDark+')');
            } else {
                $('head').append('<meta name="msapplication-TileColor" content="' + titleColorLight + '">' +
                                '<meta name="theme-color" content="' + titleColorLight + '">');
                                $('header #logo').css('background-image', 'url('+iconLight+')');
            }
            $('header #logo').css('background-size', bgSize + 'px');
        }
        $(metas).appendTo('head');
        $('head').append('<link rel="icon" href="' + link + website + '/favicon.ico" type="image/x-icon">');
        $('.header .data').html(data);
        $('.picIt .header .logo').html(logo);
        $('button.concluir').css('background','linear-gradient(45deg, '+ colorbutton + ')');
        $('.popup .foot button').css('background-color',color);
        $('input[type="text"]').css('caret-color',color);
    
        toggleDarkMode();
        darkModeMediaQuery.addListener(toggleDarkMode);

        ////

    function gerarDiv(item) {
        var newItem = $('<div class="item"><div class="line"></div></div>'); // Criar div interna
        newItem.find('.line').append('<div class="discr">' + item.discr + '</div>');
        newItem.find('.line').append('<div class="quant"><input type="text" inputmode="decimal" maxlength="6" placeholder="' + item.medida + '" /></div>');
        newItem.find('.line').append('<div class="punit"><input type="text" inputmode="decimal" maxlength="6" value="' + item.pUnit + '" /></div>');
        newItem.find('.line').append('<div class="valor">-</div>');
    
        var divs = $('section #list .item');
        var insertIndex = divs.length;
    
        divs.each(function (index) {
            var currentDiscr = $(this).find('.discr').text().toUpperCase();
            var newDiscr = item.discr.toUpperCase();
            if (newDiscr < currentDiscr) {
                insertIndex = index;
                return false;
            }
        });
    
        if (insertIndex === divs.length) {
            $('section #list').append(newItem);
        } else {
            divs.eq(insertIndex).before(newItem);
        }
    
        return newItem;
    };
    
    items.forEach(function (item) {
        gerarDiv(item);
    });
    

    var pressTimer;
    $('section #list').on("mousedown touchstart", '.item .line', function(event) {
        var $item = $(this);
        clearTimeout(pressTimer);
        pressTimer = window.setTimeout(function() {
            if ($item.hasClass('longClicked')) {
                    $item.removeClass('longClicked');
                    $item.find('.valor').text('-');
                    $item.find('.punit input').css('display', 'block');
                    $item.find('.quant input').css('display', 'block');
                    $item.find('.valor').css('display', 'block');
            } else {
                    $item.addClass('longClicked');
                    $item.find('.valor').text('em falta');
                    $item.find('.punit input').css('display', 'none');
                    $item.find('.quant input').css('display', 'none');
                    $item.find('.quant input').val('');
            }
            navigator.vibrate(50);
                    calcularResultado.call($item);
        }, 800);
    });

    $('.button.refresh').on("mousedown touchstart", function(event) {
        clearTimeout(pressTimer);
        pressTimer = window.setTimeout(function() {
            if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                  if (registration) {
                    registration.unregister().then(function() {
                      caches.keys().then(function(cacheNames) {
                        return $.when.apply($, $.map(cacheNames, function(cacheName) {
                          return caches.delete(cacheName);
                        }));
                      }).then(function() {
                        location.reload(true);
                      });
                    });
                  }
                });
              }
            navigator.vibrate(50);
        }, 800);
    });
    
    $('section #list, .button.refresh').on("mouseup touchend", '.item .line', function() {
        clearTimeout(pressTimer);
    });
    



        function isIOS() {
          return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
  
        // Verifica se é iOS e remove inputmode="numeric"
        if (isIOS()) {
          $('.item .list input').removeAttr('inputmode');
          $('.quant input').removeAttr('inputmode');
          $('.punit input').removeAttr('inputmode');
        }





// Definir formatCurrency fora da função calcularResultado
function formatCurrency(input) {
    input = input.replace(/\D/g, '');
    input = (input / 100).toFixed(2);
    return input;
}

$('#punit').on('input', function() {
    this.value = formatCurrency(this.value);
});
$('section #list').on('input', '.punit input', function() {
    this.value = formatCurrency(this.value);
});

$('section #list').on('input', '.quant input', function() {
    var valorAtual = $(this).val();
    var novoValor = valorAtual.replace(/,/g, '.');
    $(this).val(novoValor);
  });

function calcularResultado() {
    var $item = $(this);
    var theItem = $item.closest('.item .line');
    var inputValue1 = theItem.find('.quant input').val().replace(',', '.');
    var rawPixValue = theItem.find('.punit input').val();
    var inputValue2 = parseFloat(rawPixValue.trim().replace(',', '.')) || 0;

    var valor = parseFloat(inputValue1) * parseFloat(inputValue2);
    

    if ($(theItem).hasClass('longClicked')) {
        theItem.find('.valor').text('em falta');
    } else {
        theItem.find('.valor').text(valor.toFixed(2));

        if (isNaN(parseFloat(inputValue1)) || isNaN(parseFloat(inputValue2))) {
            theItem.find('.valor').text('-');
        }
        
        if (parseFloat(inputValue1) > 0) {
            theItem.addClass('active');
        } else {
            theItem.removeClass('active');
        }

    };
    atualizarTotal();
    atualizarContagemItens();
    updateCheckbox();
}


    function updateCheckbox() {
        var rawPixValue = $('.total').text();
        var total = parseFloat(rawPixValue.replace('R$', '').trim().replace(',', '.')) || 0;
        var pixCheckbox = $('#pixCheckbox');
        if (total < 1) {
            pixCheckbox.prop('disabled', true);
            $(".popup.concluir label").off('click').click(function() {
                exibirAviso('Nenhum valor na nota!');
            });
        } else {
            pixCheckbox.prop('disabled', false);
            $(".popup.concluir label").off('click');
        }
    }

    $('.total').on('change', updateCheckbox);

            

$('.popup.share .block div, header .button, button.concluir, .popup .foot button').addClass('click');


function exibirAviso(mensagem) {
    var avisoDiv = $('.aviso');

    avisoDiv.find('span').text(mensagem);

    avisoDiv.css({
        top: '-100px'
    }).animate({
        top: 0
    }, 200, function () {
        setTimeout(function () {
            avisoDiv.animate({
                top: '-100px'
            }, 200);
        }, 3000);
    });
}


$(document).on("click", "button.concluir:not(.off)", function() {
    abrirPopup(".popup.concluir", '.popup.concluir input');
});

$(document).on("click", "button.concluir.off", function() {
    exibirAviso('Nenhum item selecionado');
});

$('.quant input').on('change', function() {
    atualizarContagemItens();
});

function atualizarContagemItens() {
    var count = 0;
    $('.quant input').each(function() {
        var inputValue = parseFloat($(this).val().replace(',', '.'));
        if (!isNaN(inputValue) && inputValue > 0 ) {
            count++;
        }
    });
    $('.item .line').each(function() {
        if ($(this).hasClass('longClicked')) {
            count++;
        }
    });

    $('.itens').text(count);
    totalItens = count;

    var concluirButton = $('button.concluir');

    if (count >= 1 || $('.item .line').hasClass('longClicked')) {
        concluirButton.removeClass('off');
    } else {
        concluirButton.addClass('off');
    }
}
atualizarContagemItens();

$('.quant input, .punit input').on('input', calcularResultado);

$('.quant input, .punit input').on('input', function () { atualizarContagemItens(); });
    
    $('#search input').on('input', function () {
        var searchTerm = $(this).val().toLowerCase();
        $('.discr').each(function () {
            var discr = $(this).text().toLowerCase();
            var $item = $(this).closest('.item');
            if (discr.includes(searchTerm)) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    });


    function atualizarTotal() {
        var total = 0;
        $('.valor').each(function () {
            var valor = parseFloat($(this).text().replace(',', '.'));
            if (!isNaN(valor)) {
                total += valor;
            }
        });
        $('.total').text('R$ ' + total.toFixed(2).replace('.', ','));
    }

    $('#discr').on('input', function() {
        var valorInput = $(this).val();
        var capitalizedInput = capitalizeFirst(valorInput);
        
        $(this).val(capitalizedInput);
    
        if (capitalizedInput.length > 0) {
            $('button.addItem').removeClass('off');
        } else {
            $('button.addItem').addClass('off');
        }
    });

    $('section #list').on('input', '.quant input, .punit input', calcularResultado);

    $(".addItem, #punit").on("click keypress", function (event) {
        if ((event.type === "click" && event.target.tagName !== "INPUT") ||
            (event.type === "keypress" && event.which === 13)) {
            var medida = $("#unitType").val().toLowerCase();
            var discr = $("#discr").val();
            var discr = capitalizeFirst(discr);
            var pUnit = $("#punit").val();
            if (discr.trim() === "") {
                exibirAviso('Preencha o nome do produto!');
                $("#discr").focus();
                return;
            }
            var newItem = {
                medida: medida,
                discr: discr,
                pUnit: pUnit
            };
    
            var newItemElement = gerarDiv(newItem);
            newItemElement.prependTo('section #list');
    
            $("#unitType, #discr, #punit").val("");
            fecharPopup();
            atualizarContagemItens();
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    });

    $('.total').text('R$ 0,00');

    $('.quant input').on('input', function() {
        var valorAtual = $(this).val();
        var novoValor = valorAtual.replace(/,/g, '.');
        $(this).val(novoValor);
      });

    $(".button.refresh").click(function() {
        location.reload();
      });

    $('#search input').on('input', function() {
        if ($(this).val() === '') {
          $('#search button.i_close').hide();
        } else {
          $('#search button.i_close').show();
        }
      });

      $('#search button.i_close').on('click', function() {
        $('#search input').val('').focus();
        $(this).hide();
        $('.item').show();
      });

    function capitalize(str) {
        return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    }
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function fecharPopup() {
        var $popup = $(".popup:visible");
        var popupHeight = $popup.outerHeight();
        $popup.animate({
            top: -popupHeight
        }, 300, function () {
            $popup.hide();
        });
        $('.popup.share .hidden, .popup.share .none').fadeOut();
        $('.popup.share .block').fadeIn();
        $("#blur").fadeOut();
        window.history.back();
    }
    
    $("#blur, .popup .head button").on("click", fecharPopup);
    
    function abrirPopup(selector, inputSelector) {
        var $popup = $(selector);
        var popupHeight = $popup.outerHeight();
    
        $popup.css({
            top: -popupHeight,
            display: 'block'
        }).animate({
            top: 0
        }, 300);
    
        if (inputSelector) {
            $(inputSelector).focus();
        }
    
        $("#blur").fadeIn();
    }
    
    $("header .add").on("click", function () {
        abrirPopup(".popup.add", '.popup.add input#discr');
    });
    
    $("header .share").on("click", function () {
        abrirPopup(".popup.share");
    });
    

$('.popup.concluir input').on('input', function(){
        $('.popup.share input').val($(this).val());
      });
$('.popup.share input').on('input', function(){
        $('.popup.concluir input').val($(this).val());
      });
    
    function pegarNome() {
        var nome = $(".popup.concluir input").val();
        var nomeCliente = capitalize(nome);
        if (nomeCliente.trim() === "") {
            $("#cliente").text('Não informado');
        } else {
            $("#cliente").text(nomeCliente);
        }
    }

    
    function gerarTabela() {
        $('#tabela tr:not(.head)').remove();
        $('.item .line').each(function () {
            var $item = $(this);
            var inputValue1 = $item.find('.quant input').val().replace('.', ',');
    
            if (inputValue1.trim() !== "" || $item.hasClass('longClicked')) {
                var discr = $item.find('.discr').text();
                var value1type = $item.find('.quant input').attr('placeholder');
                var inputValue2 = $item.find('.punit input').val().replace('.', ',');
                var valor = $item.find('.valor').text().replace('.', ',').replace('em falta', 'falta');
    
                var newRow = $('<tr></tr>');

                if ($item.hasClass('longClicked')) {
                    newRow.append('<td class="left">-</td>');
                } else {
                    newRow.append('<td class="left">' + inputValue1 + " " + value1type + '</td>');
                }
    
                if ($('.picIt').hasClass('share')) {
                    $('.header .logo').html(logocolor);
                    if (discr.length > 15) {
                        if (discr.charAt(14) !== ' ') {
                            var newText = discr.substring(0, 14) + '.'; // Substitua o último caractere por um ponto
                            discr = newText; // Atribua a nova string de texto à variável discr
                        }
                    }
                } else {
                    if (discr.length > 12) {
                        if (discr.charAt(11) !== ' ') {
                            var newText = discr.substring(0, 11) + '.'; // Substitua o último caractere por um ponto
                            discr = newText; // Atribua a nova string de texto à variável discr
                        }
                    }
                }



                newRow.append('<td class="left">' + discr + '</td>');
                
                if (inputValue2 == valor || $item.hasClass('longClicked')) {
                    newRow.append('<td class="right">-</td>');
                } else {
                    newRow.append('<td class="right">' + inputValue2 + '</td>');
                }
                
                newRow.append('<td class="right">' + valor + '</td>');
    
                $('#tabela').append(newRow);
            }
        });
        generateQRCode();
    } //end

    $('section #list').on('click', '.item .line', function(event) {
        var $item = $(this);
        $('.item .line').removeClass('hover');
        $item.addClass('hover');
        if ($(event.target).is('.discr, .valor')) {
            var quantInput = $item.find('.quant input');
            setTimeout(function() {
                quantInput.focus();
            }, 0);
        }
    });
    

    $(".finish_print, .popup.concluir input").on("click keypress", function (event) {
        if ((event.type === "click" && event.target.tagName !== "INPUT") ||
            (event.type === "keypress" && event.which === 13)) {
                $('.picIt').removeClass('share');
                pegarNome();
                gerarTabela();
                sharePrint();
                fecharPopup();
        }
    }); // end


    $(".sharePic").click(function() {
        var nome = $(".popup.concluir input").val();
        var nomeCliente = capitalize(nome);
            if ($("button.concluir").hasClass('off')) {
                exibirAviso('Nenhum item selecionado');
            } else {
                if (nomeCliente.trim() === "") {
                    $('.popup.share .hidden').fadeIn();
                    $('.popup.share .block, .none').hide();
                    $('.popup.share input').focus();
                } else {
                    $('.picIt').addClass('share');
                    pegarNome();
                    gerarTabela();
                    $('#qr-code-container').empty();
                    $('.pixPay span').html('');
                    sharePrint();
                    fecharPopup();
                    exibirAviso('Compartilhe sua imagem...');
                }
            }
        });

    $(".finish_share, .popup.share input").on("click keypress", function (event) {
        if ((event.type === "click" && event.target.tagName !== "INPUT") ||
            (event.type === "keypress" && event.which === 13)) {
                $('.picIt').addClass('share');
                pegarNome();
                gerarTabela();
                $('#qr-code-container').empty();
                $('.pixPay span').html('');
                sharePrint();
                fecharPopup();
                exibirAviso('Compartilhe sua imagem...');
        }
    }); // end






// GERAR PIX
var payload = "";
// Função principal para gerar o QR Code
function generateQRCode() {
    var rawPixValue = $('.total').text();
    var pixValue = parseFloat(rawPixValue.replace('R$', '').trim().replace(',', '.')) || 0;
    
    // Construindo o Payload PIX a partir dos dados adicionados.
    payload = buildPixPayload(pixKey, pixValue, destinatario, cidade);

    // Calcula o CRC16 e o adiciona ao payload PIX
    var crc16 = getCRC16(payload);
    payload += '6304' + crc16.toString(16).toUpperCase();

    // Exibe o QR Code
    displayQRCode(payload);

    // Habilita o botão de copiar payload
    document.getElementById('copyCode').disabled = false;
}


// Função para construir o Payload PIX
function buildPixPayload(pixKey, pixValue, destinatario, cidade) {
    var pixValueFormatted = pixValue.toFixed(2);
    var pixLengthValue = pixValueFormatted.length;
    var pixLengthFormatted = pixLengthValue.toString().padStart(2, '0');
    var destinatarioLength = destinatario.length;
    var cidadeLength = cidade.length.toString().padStart(2, '0');

    return '00020126360014BR.GOV.BCB.PIX01' + pixKey.length + pixKey +
        '52040000530398654' + pixLengthFormatted + pixValueFormatted +
        '5802BR59' + destinatarioLength + destinatario +
        '60' + cidadeLength + cidade + '62130509pixcartao';
}

function displayQRCode(payload) {
        if ($('#pixCheckbox').is(':checked')) {
            $('#qr-code-container').empty();
            var qrcode = new QRCode($('#qr-code-container')[0], {
                text: payload.toString(),
                width: 228,
                height: 228,
            });
            $('.pixPay span').html('<button class="icon i_scan"></button>Pague por PIX:');
        } else {
            $('#qr-code-container').empty();
            $('.pixPay span').html('');
        }
}

// Função para copiar o valor do payload para a área de transferência
function copyPayloadToClipboard() {
    var tempInput = $("<input>");
    tempInput.val(payload);
    $("body").append(tempInput);
    tempInput.select();
    document.execCommand("copy");
    tempInput.remove();
}

// Função para calcular o CRC16
function getCRC16(payload) {
    payload += '6304';
    var polinomio = 0x1021;
    var resultado = 0xFFFF;
    var length = payload.length;

    for (var offset = 0; offset < length; offset++) {
        resultado ^= (payload.charCodeAt(offset) << 8);

        for (var bitwise = 0; bitwise < 8; bitwise++) {
            if ((resultado <<= 1) & 0x10000) {
                resultado ^= polinomio;
            }
            resultado &= 0xFFFF;
        }
    }
    return resultado;
}

$(".copyCode").click(function() {
    var rawPixValue = $('.total').text();
    var pixValue = parseFloat(rawPixValue.replace('R$', '').trim().replace(',', '.')) || 0;
    if (pixValue === 0) {
        exibirAviso('Não há valor neste cupom!');
    } else {
        pegarNome();
        generateQRCode();
        exibirAviso('Código PIX de R$ ' + pixValue + ' copiado!');
        $('.popup.share .none').fadeIn();
        copyPayloadToClipboard();
    }
        
    $('.popup.share .none').click(function() {
        var linkWhatsApp = 'https://api.whatsapp.com/send/?text=' + encodeURIComponent(payload);
        window.open(linkWhatsApp, '_blank');
    });

}); // end







});

async function sharePrint() {
    const picIt = $('.picIt');

    try {
        const canvas = await html2canvas(picIt[0]);
        const dataUrl = canvas.toDataURL();

        const file = dataURLtoFile(dataUrl, 'cupomfiscal.png');
        
        if (navigator.share) {
            const shareData = {
                title: 'Imprimir',
                text: 'Confira este cupom fiscal',
                files: [file]
            };
            await navigator.share(shareData);
        } else if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                files: [file],
                title: 'Imprimir',
                text: 'Confira este cupom fiscal'
            });
        } else {
            const blob = await fetch(dataUrl).then(res => res.blob());
            const filesArray = [new File([blob], 'cupomfiscal.png', { type: blob.type })];
            const dataTransfer = new DataTransfer();
            filesArray.forEach(file => {
                dataTransfer.items.add(file);
            });
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.files = dataTransfer.files;

            input.click();
        }
    } catch (e) {
        exibirAviso('Erro:' + e);
    }
}

function dataURLtoFile(dataUrl, filename) {
    var arr = dataUrl.split(','), 
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}








function atualizarDataHora() {
    var agora = new Date();
    var dataFormatada = (agora.getDate() < 10 ? '0' : '') + agora.getDate() + '/' +
        ((agora.getMonth() + 1) < 10 ? '0' : '') + (agora.getMonth() + 1) + '/' +
        agora.getFullYear();
    var horaFormatada = (agora.getHours() < 10 ? '0' : '') + agora.getHours() + ':' +
        (agora.getMinutes() < 10 ? '0' : '') + agora.getMinutes();
    $('#data_atual').text(dataFormatada);
    $('#hora_atual').text(horaFormatada);
}
atualizarDataHora();
setInterval(atualizarDataHora, 1000);


function fecharPopupUrl() {
    var $popup = $(".popup:visible");
    var popupHeight = $popup.outerHeight();
    $popup.animate({
        top: -popupHeight
    }, 300, function () {
        $popup.hide();
    });
    $("#blur").fadeOut();
}
window.onhashchange = function (e) {
    var oldURL = e.oldURL.split('#')[1];
    if (oldURL == 'popup') {
        $("#blur").hide();
        fecharPopupUrl();
        e.preventDefault();
    }
};

function href(web) {
    window.location.href = web;
}

