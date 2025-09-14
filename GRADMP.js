console.log("V1.0");   
    let selectedMessageType = null;

        function selectGraduation(type) {
            document.querySelectorAll('.grad-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            event.target.classList.add('selected');
            
            selectedMessageType = type;
        }

        function validateForm() {
            const userName = document.getElementById('userName').value.trim();
            return userName !== '' && selectedMessageType !== null;
        }

        function generateMessage() {
            if (!selectedMessageType) return null;
            
            const messages = {
                'basica': `[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO BÁSICA[/font][/size][/color][/td][/tr][/table]

[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]Desde já, desejamos boas-vindas à Companhia dos Supervisores, é um prazer tê-lo(a) conosco nessa grande família. A graduação básica guiará sua nova função, lembre-se de tirar dúvidas com o(a) graduador(a) presente na sala, como também não ficar inativo durante a leitura! Tenha bastante atenção e compreenda o conteúdo disposto.

[b]Segue, abaixo, as instruções acerca da sua função na Companhia dos Supervisores.[/b]
[/justify][/font][/color][/size]
[center][table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]HIERARQUIA[/font][/size][/color][/b]

[font=Poppins][color=black][justify][size=14][color=#189600][b]➯ [/b][/color][/size]A hierarquia da Companhia dos Supervisores de Promoção é formada por [b]08 cargos[/b], sendo eles:

Supervisor [b]⤳[/b] Tutor [b]⤳[/b] Fiscalizador [b]⤳[/b] Graduador [b]⤳[/b] Estagiário [b]⤳[/b] Ministro [b]⤳[/b] Vice-Líder [b]⤳[/b] Líder

Independentemente do seu cargo na companhia, é imprescindível que você trate os outros membros respeitando a hierarquia da Polícia RCC, sem, no entanto, desrespeitar a autoridade dentro do grupo. As promoções são concedidas com base no mérito, levando em consideração o desempenho e o tempo de serviço na companhia.[/font][/color][/justify][/td][/tr][/table][/center]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]AULAS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]A companhia dos Supervisores de Promoção é responsável por aplicar Supervisão aos Soldados, Aula de Segurança e Aula de Promotor. Segue abaixo a quem deverão ser aplicadas e seus respectivos locais de aplicação:

[size=14][color=#189600][b]➯ [/b][/color][/size] [b]Supervisão de Soldados:[/b] é aplicada aos [b]soldados[/b] recém-aprovados no Curso de Aprimoramento de Soldados (CAS). Esta deverá ser aplicada de forma individual e utilizando a ferramenta do sussurro no Centro de Instrução de um dos batalhões ou, em casos de necessidade, no Corredor Principal.

[size=14][color=#189600][b]➯ [/b][/color][/size] [b]Aula de Segurança:[/b] é aplicada aos [b]cabos[/b] que concluírem o Curso de Formação de Cabos (CFC) e aos [b]membros do Corpo Executivo[/b] que concluírem a Aula de Praças Intermediária (API) ou aprovarem na Avaliação Periódica do Corpo Executivo (Av-CE). Esta poderá ser aplicada de forma coletiva nas salas de aplicações de aulas da companhia.

[size=14][color=#189600][b]➯ [/b][/color][/size] [b]Aula de Promotor:[/b] é aplicada aos [b]subtenentes[/b] que concluírem o Curso de Aperfeiçoamento de Praças (CAP). Esta poderá ser aplicada de forma coletiva nas salas de aplicações de aulas da companhia.

[b]NOTA¹:[/b] As aulas possuem seus determinados scripts que poderão ser encontrados no subfórum da companhia em: [url=https://www.policiarcc.com/f274-sup-supervisores][b][SUP] Supervisores[/b][/url].
[b]NOTA²:[/b] É proibido pular qualquer conteúdo dos scripts durante as aulas, ressalvado em caso de continuação, mas o aplicador deverá ter comprovação de que aplicou até o momento de reinício; além disso, todas as orientações localizadas nos scripts deverão ser seguidas à risca pelo supervisor(a).
[b]NOTA ³:[/b] Ressalta-se que cada aula possui suas determinadas localidades de aplicação, assim como supracitado, sendo passível de punição em caso de descumprimento das normativas estipuladas no Código de Conduta do Supervisor. Logo, atente-se às localidades de suas aplicações.[/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]POSTAGEM DE AULAS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Para registro de suas aplicações e aprovações dos policiais em suas aulas deverá realizar a postagem nos seguintes tópicos:

[size=14][color=#189600][b]➯ [/b][/color][/size] [b]Caso haja aprovados:[/b] Deverá ser postada em [url=https://www.policiarcc.com/t26519-sup-relatorio-de-aplicacoes][b][SUP] Relatório de Aplicações[/b][/url], localizado no subfórum da companhia; e no RCCSystem, apenas os policiais aprovados, no tópico destinado a postagem de aulas dos supervisores: Clique aqui.

[size=14][color=#189600][b]➯ [/b][/color][/size] [b]Caso não haja aprovados:[/b] Deverá ser postada apenas no [url=https://www.policiarcc.com/t26519-sup-relatorio-de-aplicacoes][b][SUP] Relatório de Aplicações[/b][/url], localizado no subfórum da companhia.

[b]NOTA ¹:[/b] O membro que não realizar a postagem de aula no fórum e/ou system dentro do prazo de [b]15 (quinze) minutos[/b] após o término desta, sem justificativa plausível, receberá uma [b]advertência verbal[/b] da Divisão de Investigação e Segurança e, em caso de reincidência, o supervisor receberá (10) medalhas efetivas negativas. A justificativa deverá ser apresentada em 'comentário' no relatório.

[b]NOTA ²:[/b] A postagem no formulário de Relatório de Aplicações deverá seguir o fuso horário oficial de Brasília. Portanto, qualquer modelo e/ou fuso que diferir do imposto será considerado como erro na postagem da aula.

Se algum policial cair ou sair durante a aula, você deverá aguarda-lo retornar por cinco (5) minutos, caso não retorne, poderá postar no relatório selecionando a opção "[b]CAIU/SAIU DURANTE A AULA[/b]", caso contrário não deverá ser postada.

[b]NOTA ³:[/b] É especificado nos scripts onde deve-se tirar o printscreen, sendo obrigatório que nessa comprovação o histórico, balão de fala e perfil do aluno estejam visíveis, exceto para usuários mobile que deverão tirar print somente do histórico com a tela cheia. Além disso, a imagem também deverá ser hospedada de preferência no imgur; e em seguida anexada em link na postagem da aula no Relatório de Aplicações. Para ver modelos de prints e o guia de postagem, [url=https://imgur.com/a/RAqb2Wr][b]clique aqui[/b].[/url]

Visualize melhor como deve preencher o formulário de postagem de aula: [url=https://www.youtube.com/watch?v=WNgHRdvOhuM][b]clique aqui[/b].[/url][/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]META[/font][/size][/color][/b]

[justify][font=Poppins][color=black]O cargo de Supervisor tem uma porcentagem gradativa. Para atingir sua meta deverá alcançar no mínimo [b]100%[/b] de aplicações em aulas; as metas se iniciam todos os [b]domingos às 00h (BR)[/b] e encerram-se todos os [b]sábados às 23:59h (BR)[/b]. Cada aula possui um valor determinado em porcentagem, segue abaixo a apresentação desses valores:

[size=14][color=#189600][b]➯ [/b][/color][/size] Supervisão de Soldados: [b]50%[/b].
[size=14][color=#189600][b]➯ [/b][/color][/size] Aula de Segurança: [b]50%[/b];
[size=14][color=#189600][b]➯ [/b][/color][/size] Aula de Promotor: [b]50%[/b].

[b]NOTA ¹:[/b] É válido ressaltar que o valor é dado pela quantidade de policiais em suas aulas, portanto, caso haja dois subtenentes na aula de promotor você ganhará 100% em sua porcentagem geral, sendo considerada cada postagem individual no Relatório de Aplicações.

Os supervisores que atingirem a meta serão gratificados e aqueles que não cumprirem serão punidos. Segue abaixo a gratificação em caso de cumprimento e punição em caso de não cumprimento:

[size=14][color=#189600][b]➯ [/b][/color][/size] 100% ou mais: [b]10 medalhas positivas efetivas[/b];
[size=14][color=#189600][b]➯ [/b][/color][/size] Abaixo de 100%: [b]10 medalhas efetivas negativas[/b].

[b]NOTA ²:[/b] Em casos de metas negativas por duas semanas consecutivas, o supervisor será [b]expulso[/b] e receberá [b]100 medalhas efetivas negativas[/b].

[b]"Posso aplicar aulas após atingir 100%?"[/b]

Sim, o supervisor tem direito de realizar quantas aplicações achar necessário, desde que o número não exceda ao ponto de prejudicar a meta de outro. Ao longo de sua trajetória na companhia deverá prezar sempre pelo COMPANHEIRISMO. Caso presencie atos de falta de companheirismo vindos de um membro da companhia, registre printscreens e procure de imediato um membro do ministério/liderança para que possam ser tomadas as devidas providências. Trabalhe de maneira imparcial, não hesitando de maneira alguma na denúncia de tais infratores.[/font][/color][/justify][/td][/tr][/table]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]LICENÇA DE SERVIÇO & DESLIGAMENTOS[/font][/size][/color][/b]

[justify][font=Poppins][color=black][size=14][color=#189600][b]➯ [/b][/color][/size] Os supervisores possuem direito à [b]LICENÇA DE SERVIÇO[/b] na companhia; caso precise de uma licença, deverá pedir a autorização de um dos membros do [b]MINISTÉRIO[/b] ou [b]LIDERANÇA[/b] da companhia e postar no tópico [b][SUP] Requerimentos da Companhia[/b]. O tempo mínimo e máximo para uma licença são, respectivamente, 07 e 30 dias.

Para o desligamento na companhia, é necessário que realize a postagem em [b][SUP] Requerimentos da Companhia[/b], podendo retornar futuramente caso deseje. Há a necessidade da permissão de um dos membros do [b]MINISTÉRIO[/b] ou [b]LIDERANÇA[/b] da companhia.[/font][/color][/justify][/td][/tr][/table]

[size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`,
                
                'intermediaria': `[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO INTERMEDIÁRIA[/font][/size][/color][/td][/tr][/table]

[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]Desde já, parabenizamos sua ascensão na Companhia dos Supervisores, é um prazer tê-lo(a) conosco nessa grande família. A graduação intermediária guiará sua nova função, lembre-se de tirar dúvidas com o(a) graduador(a) presente na sala, como também não ficar inativo durante a leitura! Tenha bastante atenção e compreenda o conteúdo disposto.

O sistema de tutoria da companhia dos Supervisores foi criado para maximizar a qualidade na aplicação das aulas, além de proporcionar uma comunicação efetiva no que concerne a meta dos supervisores.

[b]Segue, abaixo, as instruções acerca da função dos tutores da Companhia dos Supervisores.[/b]
[/justify][/font][/color][/size]
[center][table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]FUNÇÕES SEMANAIS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Como tutor, seu objetivo é garantir a qualidade da aplicação de aulas aplicadas pelos supervisores por meio da tutoria semanal, além de notificá-los sobre a meta semanal.

[size=14][color=#189600][b]➯ [/b][/color][/size] Cada tutor deverá acompanhar, no mínimo, 02 aulas por semana, sendo proibido acompanhar a mesma aula com o mesmo supervisor o qual você já acompanhou na semana.

[b]Exemplo¹:[/b] Tutor Ares acompanhou a Aula de Supervisão (SUP) aplicada pelo Supervisor João. Se o Ares quiser, pode acompanhar o SEG/PRO aplicado pelo João.

[b]Exemplo²:[/b] Tutor Ares acompanhou a Aula de Supervisão (SUP) do supervisor João, logo, o tutor Ares não poderá acompanhar NOVAMENTE outra Supervisão aplicada pelo supervisor João.

[size=14][color=#189600][b]➯ [/b][/color][/size] Além do acompanhamento, cada tutor será escalado para enviar uma [b]Mensagem Privada[/b] para um supervisor, a fim de notificá-lo sobre a meta semanal.

A escala é feita toda [b]segunda-feira[/b] da semana que inicia-se, para conferir o tópico da escala: [url=https://www.policiarcc.com/t31644-tut-relatorio-de-aplicacoes-e-escala][b]CLIQUE AQUI[/b].[/url][/font][/color][/justify][/td][/tr][/table][/center]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]RELATÓRIO DE CONCLUSÃO DE FUNÇÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black][size=14][color=#189600][b]➯ [/b][/color][/size] O conteúdo da Mensagem Privada deverá ser enviada até [b]quarta-feira às 23h59BR[/b] ao supervisor escalado. Caso você atrase o envio, sem prévia justificativa, receberá uma falha.

[size=14][color=#189600][b]➯ [/b][/color][/size] Após concluir a função por completo, isto é, realizar o acompanhamento e envio da Mensagem Privada, é obrigatório com que poste a conclusão da função semanal via formulário, [url=https://www.policiarcc.com/t31644-tut-relatorio-de-aplicacoes-e-escala][b]CLICANDO AQUI[/b][/url]. O envio do formulário deverá ser realizado até [b]sábado às 23h59BR[/b] e, caso atrase a postagem sem prévia justificativa, receberá uma advertência interna.

[size=14][color=#189600][b]➯ [/b][/color][/size] É necessário anexar prints que comprovem, tanto o envio da Mensagem Privada, como também o acompanhamento das aulas, sendo invalidado, caso realize a postagem sem os anexos, o relatório e consequentemente, ficando negativo na semana.

[b]Observação:[/b] Os prints do acompanhamento devem ser: início, meio e fim. Já o da Mensagem Privada, apenas a comprovação a qual foi enviada ao supervisor pela caixa de envio do fórum.[/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]REGRAS E INFORMAÇÕES ADICIONAIS[/font][/size][/color][/b]

[justify][font=Poppins][color=black][size=14][color=#189600][b]➯ [/b][/color][/size] Para realizar um bom acompanhamento, a companhia dos supervisores disponibiliza um script para ser usado durante a tutoria da aula. Para acessar, [url=https://www.policiarcc.com/t24978-tut-script-de-tutoria][b]CLIQUE AQUI[/b][/url]. O script dispõe todas as informações necessárias, como também observações e trechos que devem ser enviados no início, durante e final da tutoria.

[size=14][color=#189600][b]➯ [/b][/color][/size] Como tutor, é seu dever prestar auxílio aos supervisores escalados, logo, recomendamos que tenha o máximo de contato com eles e caso seja procurado para tirar dúvidas, esteja disposto.

[size=14][color=#189600][b]➯ [/b][/color][/size] É permitido com que poste a realização do acompanhamento no mesmo dia que realizou, como também poste a realização do envio da Mensagem Privada, evitando com que perca os prints durante a semana. Entretanto, caso opte por deixar para postar em outro momento, atente-se ao prazo da postagem.

[size=14][color=#189600][b]➯ [/b][/color][/size] Além das instruções dadas aqui, é essencial e obrigatório que realize a leitura do Manual de Função, onde contém de forma mais detalhada suas obrigações.[/font][/color][/justify][/td][/tr][/table]

[size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`,
                
                'avancada': `[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO AVANÇADA[/font][/size][/color][/td][/tr][/table]

[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]Desde já, parabenizamos sua ascensão na Companhia dos Supervisores, é um prazer tê-lo(a) conosco nessa grande família. A graduação avançada guiará sua nova função, lembre-se de tirar dúvidas com o(a) graduador(a) presente na sala, como também não ficar inativo durante a leitura! Tenha bastante atenção e compreenda o conteúdo disposto.

[b]Segue, abaixo, as instruções acerca da função dos fiscalizadores da Companhia dos Supervisores.[/b]
[/justify][/font][/color][/size]
[center][table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]NORMATIVAS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]A fiscalização do Centro de Recursos Humanos é realizada pelos fiscalizadores da Companhia dos Supervisores de Promoção, com o objetivo de verificar e corrigir as listagens. Cada fiscalizador é responsável por uma determinada listagem, de acordo com a escala de fiscalização publicada no início da semana pelo ministro da contabilidade responsável. Seguem abaixo os procedimentos de fiscalização de cada listagem.

[b]Deverão ser removidos da listagem do CORPO DE PRAÇAS os policiais que:[/b]

[size=14][color=#189600][b]➯ [/b][/color][/size] Não entram há mais de 31 dias ou mais;
[size=14][color=#189600][b]➯ [/b][/color][/size] Não possuem mais vínculo com a RCC;
[size=14][color=#189600][b]➯ [/b][/color][/size] Praças do Corpo Militar que não possuem o grupo Corpo de Praças após 03 meses de sua promoção;
[size=14][color=#189600][b]➯ [/b][/color][/size] Nick inexistente no Habbo Hotel.

[b]Deverão ser removidos da listagem do CORPO EXECUTIVO os policiais que:[/b]

[size=14][color=#189600][b]➯ [/b][/color][/size] Não entram há mais de 89 dias;
[size=14][color=#189600][b]➯ [/b][/color][/size] Não possuem mais vínculo com a RCC;
[size=14][color=#189600][b]➯ [/b][/color][/size] Nick inexistente no Habbo Hotel.

[b]Nota:[/b] Todos os fiscalizadores têm a obrigação de verificar a Escala de Fiscalização todas as semanas para estarem cientes de qual listagem estarão responsáveis.[/font][/color][/justify][/td][/tr][/table][/center]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]FISCALIZAÇÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black][b]Como verificar os nicknames no Habbo:[/b] No Habbo, procure pelo recurso de pesquisa que fica localizado ao lado do ícone de "amigos" (console), que pode ser facilmente identificado por um habbo com uma lupa. Cole o nick do militar na área de pesquisa e, depois, clique no símbolo de perfil que fica ao lado do nick pesquisado.

[b]Como verificar os nicks na listagem:[/b] Na listagem, clique na tecla "F3" localizada em seu teclado. Assim, irá abrir uma pequena janela no canto superior direito, cole na janela o nick do militar e aperte Enter. A página vai levar você até o nick presente na listagem.
Se você joga pelo mobile, deverá abrir a listagem desejada, clicar nos três pontos localizados na parte superior direita, em "Encontrar na página" e, por fim, colar o nick do militar.[/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]POSTAGEM DA FISCALIZAÇÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Para realizar a postagem da fiscalização no Centro de Recursos Humanos e no formulário da companhia, deverá seguir os seguintes passos:

[size=14][color=#189600][b]➯ [/b][/color][/size] Acesse os requerimentos de "Fiscalização das Listagens", encontrado no RCC System;
[size=14][color=#189600][b]➯ [/b][/color][/size] Em seguida, preencha o formulário de acordo com as informações levantadas na fiscalização e envie;
[size=14][color=#189600][b]➯ [/b][/color][/size] É necessário postar também no tópico "[FIS] Relatório de Aplicações e Escala", localizado no subfórum dos fiscalizadores no fórum;
[size=14][color=#189600][b]➯ [/b][/color][/size] Preencha o formulário e envie.[/font][/color][/justify][/td][/tr][/table]

[size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`
            };
            
            return messages[selectedMessageType] || null;
        }

        function resetForm() {
            document.getElementById('userName').value = '';
            selectedMessageType = null;
            document.querySelectorAll('.grad-button').forEach(btn => {
                btn.classList.remove('selected');
            });
        }

        function sendMessage() {
            if (!selectedMessageType) {
                alert('Por favor, selecione um tipo de mensagem primeiro.');
                return;
            }
            
            if (!validateForm()) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            const userName = document.getElementById('userName').value.trim();
            const message = generateMessage();
            
            if (!message) {
                alert('Erro ao gerar a mensagem. Tente novamente.');
                return;
            }
            
            const sendBtn = document.getElementById('sendBtn');
            const originalText = sendBtn.textContent;
            sendBtn.disabled = true;
            sendBtn.textContent = 'Enviando...';
            
            const resetButton = () => {
                sendBtn.disabled = false;
                sendBtn.textContent = originalText;
            };
            
            const title = `[SUP] Graduação ${selectedMessageType.charAt(0).toUpperCase() + selectedMessageType.slice(1)}`;
            
            console.log("--- Tentativa de Envio de Mensagem ---");
            console.log("Título:", title);
            console.log("Usuário:", userName);
            console.log("Mensagem:", message);
            console.log("--------------------------------------");
            
            $.post('/privmsg', {
                folder: 'inbox',
                mode: 'post',
                post: '1',
                username: userName,
                subject: title,
                message: message
            }).done(function (response) {
                console.log("Resposta do servidor (sucesso):", response);
                resetButton();
                
                const successModal = document.createElement('div');
                successModal.className = 'modal';
                successModal.innerHTML = `
                    <div class="modal-content">
                        <h3>Sucesso!</h3>
                        <p>Mensagem Privada enviada para ${userName}.</p>
                        <p style="margin-top: 15px;">Deseja enviar outra mensagem?</p>
                        <div class="modal-buttons">
                            <button class="modal-button success" onclick="this.closest('.modal').remove(); resetForm();">Sim</button>
                            <button class="modal-button secondary" onclick="window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox'; this.closest('.modal').remove();">Não</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(successModal);
                
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Erro ao enviar mensagem:', textStatus, errorThrown);
                resetButton();
                
                const errorModal = document.createElement('div');
                errorModal.className = 'modal';
                errorModal.innerHTML = `
                    <div class="modal-content">
                        <h3>Erro!</h3>
                        <p>Ocorreu um erro ao enviar a Mensagem Privada.</p>
                        <div class="modal-buttons">
                            <button class="modal-button error" onclick="this.closest('.modal').remove();">OK</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(errorModal);
            });
        }
