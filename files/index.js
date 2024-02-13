$(document).ready(function () {
    var content = `
    <header>
        <div class="main">
            <div id="menu" class="icon i_menu" onclick="href('#popup');"></div>
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
        <div class="list">
            <div class="categories">
                <div id="categories">
                    <div class="category todos active">todos</div>
                </div>
            </div>
            <div class="labels">
                <div class="discr">DISCRIMINAÇÃO</div>
                <div class="quant">QUANT.</div>
                <div class="punit">P. UNIT.</div>
                <div class="value">TOTAL</div>
            </div>
        </div>
    </header>

    <footer>
        <div class="info left" onclick="href('#popup');"><button class="icon i_list"></button> <span class="itens">0</span> ITENS</div>
        <div class="button">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="102px" height="48px"><path d="M51.000,47.1000 C69.871,47.1000 85.340,33.477 86.866,15.000 L87.000,15.000 C87.000,6.716 93.716,-0.000 101.1000,-0.000 L101.1000,47.1000 L51.000,47.1000 ZM0.000,47.1000 L0.000,-0.000 C8.284,-0.000 15.000,6.716 15.000,15.000 L15.134,15.000 C16.660,33.477 32.129,47.1000 50.1000,47.1000 L0.000,47.1000 Z"/></svg>
            <button class="concluir off icon i_print" onclick="href('#popup');"></button>
        </div>
        <div class="info right total">TOTAL <span></span></div>
    </footer>
    
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

    <div class="menu">
        <div class="title">Menu<button class="icon i_close"></button></div>
        <div class="content">
            <div class="op" hidden>
                <div class="title"><span class="icon i_receipt"></span>Notas salvas</div>
                <div class="content">
                    <div class="nota um"><span class="icon i_user"></span>Fulano</div>
                    <div class="nota dois"><span class="icon i_user"></span>Sicrano</div>
                    <div class="nota dois"><span class="icon i_user"></span>Beltrano</div>
                </div>
            </div>
            <div class="op themes">
                <div class="title">
                    <div class="main"><span class="icon i_themes"></span>Tema do app</div>
                    <div class="sub">Definido pelo sistema</div>
                </div>
                <div class="content" hidden>
                    <div class="theme system"><div class="radio on"><div></div></div>Sistema</div>
                    <div class="theme light"><div class="radio"><div></div></div>Claro</div>
                    <div class="theme dark"><div class="radio"><div></div></div>Escuro</div>
                </div>
            </div>
            <div class="op">
                <div class="title">
                    <div class="main"><span class="icon i_heart"></span>Introdução</div>
                    <div class="sub">Conhecer o aplicativo</div>
                </div>
            </div>
            <div class="op">
                <div class="title">
                    <div class="main"><span class="icon i_whatsapp"></span>Contato</div>
                    <div class="sub">Erros, sugestões, etc</div>
                </div>
            </div>
            <div class="op">
                <div class="title">
                    <div class="main"><span class="icon i_warning"></span>Sobre</div>
                    <div class="sub">Mais informações</div>
                </div>
            </div>
        </div>
    </div>

    <section></section>
    
    <div class="popup add">
    <div class="head">Adicionar item
        <button class="icon i_close"></button>
    </div>
    <div class="content">

        <div class="fields first">
            <div class="left middle">
                <div class="sectitle">Discriminação</div>
                <div class="field">
                    <input id="discr" type="text" placeholder="Nome do produto" maxlength="22" />
                </div>
            </div>
            <div class="right middle">
                <div class="sectitle">Categoria</div>
                <div class="field">
                    <select id="category"><option>Selecione</option></select>
                </div>
            </div>
        </div>
        <div class="fields">
            <div class="left middle">
                <div class="sectitle">Medida</div>
                <div class="field">
                    <input id="unitType" type="text" placeholder="kg, unid, etc" maxlength="4" />
                </div>
            </div>
            <div class="right middle">
                <div class="sectitle">Valor unitário</div>
                <div class="field">
                    <input id="punit" type="text" placeholder="0,00" inputmode="decimal" />
                </div>
            </div>
        </div>

    </div>
    <div class="foot">
        <button class="addItem off icon i_check"></button>
    </div>
    </div>
    
    <div class="popup check">
        <div class="head">Verificar lista atual
            <button class="icon i_close"></button>
        </div>
            <div class="content">
                <table id="checklist"></table>
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
            
        <div class="fields first">
            <div>
                <div class="sectitle">Nome do cliente</div>
                <div class="field">
                    <input type="text" class="nome_do_cliente" placeholder="Não informado" />
                </div>
            </div>
        </div>  
        <div class="fields">
            <div>
                <div class="sectitle">Observação</div>
                <div class="field">
                    <input type="text" class="comentario" placeholder="Nenhum comentário" />
                </div>
            </div>
        </div>
        
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
    <div class="head">Imprimir
        <button class="icon i_close"></button>
    </div>
        <div class="content">

            <div class="fields first">
                <div>
                    <div class="sectitle">Nome do cliente</div>
                    <div class="field">
                        <input type="text" class="nome_do_cliente" placeholder="Não informado" />
                    </div>
                </div>
            </div>  
            <div class="fields">
                <div>
                    <div class="sectitle">Observação</div>
                    <div class="field">
                        <input type="text" class="comentario" placeholder="Nenhum comentário" />
                    </div>
                </div>
            </div>
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
    <div hidden class="aviso"><button class="icon i_warning"></button><span></span></div>
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
        <div class="total">TOTAL › <span></span></div>
        <div class="obs"><button class="emissao icon i_note"></button>OBS. › <span></span></div>
        <div class="pixPay"><span></span><div id="qr-code-container"></div></div>
        <button class="cliente icon i_user"></button>CLIENTE › <span id="cliente"></span><br>
        <button class="emissao icon i_clock"></button>EMISSÃO › <span id="data_atual"></span>, <span id="hora_atual"></span>
        <p><br>Obrigado pela preferência <span class="icon i_heart"></span><br></p>
    </div>
    </div>
    `
    
    $(content).appendTo('#body-content');
    
    });