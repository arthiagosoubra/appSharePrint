$(document).ready(function () {
    var content = `
    <header>
    <div>
        <div id="logo"></div>
        <div id="nav">
            <button class="button add icon i_plus" onclick="href('#popup');"></button>
            <div id="search">
                <button class="icon i_search"></button>
                <input type="text" />
                <button hidden class="icon i_close"></button>
            </div>
            <button class="button share icon i_share" onclick="href('#popup');"></button>
            <button class="button refresh icon i_refresh"></button>
        </div>
    </div>
    </header>
    
    <div hidden class="warning pay">
        <button class="icon i_warning"></button>
        <div class="content">Prezado cliente,<br><span>A taxa de manutenção venceu.</span></div>
        <div id="copypix" class="button"><div>CÓD<br>PIX</div><div><button class="icon i_scan"></button></div></div>
    </div>
    <div hidden class="warning update um">
        <button class="icon i_warning"></button>
        <div class="content">Nova atualização disponível<br><span></span></div>
        <div id="update" class="button" onclick="href('#popup');"><div>Atualizar</div><div></div></div>
    </div>
    <section>
    <div class="head list">
        <div>
            <div class="discr">DISCRIMINAÇÃO</div>
            <div class="quant">QUANT.</div>
            <div class="punit">P. UNIT.</div>
            <div class="value">TOTAL</div>
        </div>
    </div>
    <div id="list"></div>
    <div class="foot list">
            <div class="info left"><span class="itens">0</span> ITENS</div>
            <div class="button">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="102px" height="48px"><path d="M51.000,47.1000 C69.871,47.1000 85.340,33.477 86.866,15.000 L87.000,15.000 C87.000,6.716 93.716,-0.000 101.1000,-0.000 L101.1000,47.1000 L51.000,47.1000 ZM0.000,47.1000 L0.000,-0.000 C8.284,-0.000 15.000,6.716 15.000,15.000 L15.134,15.000 C16.660,33.477 32.129,47.1000 50.1000,47.1000 L0.000,47.1000 Z"/></svg>
                <button class="concluir off icon i_print" onclick="href('#popup');"></button>
            </div>
            <div class="info right">TOTAL <span class="total"></span></div>
    </div>
    <div class="shadow foot"></div>
    </section>
    
    <div class="popup add">
    <div class="head">Adicionar item
        <button class="icon i_close"></button>
    </div>
    <div class="content">
        <label>Discriminação</label>
        <input type="text" id="discr" placeholder="Nome do produto" maxlength="22" />
        <label class="left">Medida</label><label class="right">Valor unitário</label>
        <input type="text" id="unitType" placeholder="kg, unid, etc" maxlength="4" />
        <input type="text" placeholder="0,00" inputmode="decimal" id="punit" />
    </div>
    <div class="foot">
        <button class="addItem off icon i_check"></button>
    </div>
    </div>
    
    <div class="popup share">
    <div class="head">Compartilhar
        <button class="icon i_close"></button>
    </div>
    <div class="content">
        <div class="block">
            <div class="sharePic"><button class="icon i_share"></button><br>Compartilhar<br> o cupom</div>
            <div class="copyCode" id="copyCode"><button class="icon i_scan"></button><br>Copiar código<br> do PIX</div>
        </div>
        <div hidden class="hidden">
            <input type="text" placeholder="Nome do cliente" />
        </div>
        <div hidden class="none">
            <button class="icon i_whatsapp"></button>Compartilhar no WhatsApp
        </div>
    </div>
    <div hidden class="hidden foot">
        <button class="finish_share icon i_check"></button>
    </div>
    </div>
    
    <div class="popup concluir">
    <div class="head">Nome do cliente
        <button class="icon i_close"></button>
    </div>
        <div class="content">
            <input type="text" placeholder="Não informado" />
            <input type="checkbox" id="pixCheckbox"><label for="pixCheckbox">Incluir QRCode do PIX</label>
        </div>
        <div class="foot">
            <button class="finish_print icon i_check"></button>
        </div>
    </div>
    
    <div class="popup update">
    <div class="head">Atualização
        <button class="icon i_close"></button>
    </div>
    <div class="content">
        <div class="title">Novidades:</div>
        <div class="content">
            A<br>
            B<br>
            C<br>
        </div>

        <div hidden class="attention">
            <div class="title">ATENÇÃO</div>
            <div class="content">Há itens selecionados na lista. Ao atualizar, os campos serão limpos. Continuar?</div>
        </div>

    </div>
    <div class="foot">
        <button class="updateLater">Mais tarde</button>
        <button class="updateNow icon i_check"></button>
    </div>
    </div>
    
    <div id="noItens">Nenhum resultado encontrado.</div>
    <div class="aviso"><button class="icon i_warning"></button><span></span></div>
    <div hidden id="blur"></div>
    
    <div class="picIt">
    <div class="header">
        <div class="pic"><div class="logo"></div></div>
        <div class="data"></div>
    </div>
    <table id="tabela">
        <tr class="head">
            <td class="left">QUANT.</td>
            <td class="left">DISCRIMINAÇÃO</td>
            <td class="right">P.UNIT.</td>
            <td class="right">VALOR</td>
        </tr>
    </table>
    
    <div class="footer">
        <div>TOTAL › <span class="total"></span></div>
        <div class="pixPay"><span></span><div id="qr-code-container"></div></div>
        <button class="cliente icon i_user"></button>CLIENTE › <span id="cliente"></span><br>
        <button class="emissao icon i_clock"></button>EMISSÃO › <span id="data_atual"></span>, <span id="hora_atual"></span>
        <p><br>Obrigado pela preferência <span class="icon i_heart"></span><br></p>
    </div>
    </div>
    `
    
    $(content).appendTo('#body-content');
    
    });