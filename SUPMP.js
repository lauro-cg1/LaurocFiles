console.log("V1.0");
    let selectedMessageType = null;
        
        function selectAula(tipo) {
            selectedMessageType = tipo;
            
            document.querySelectorAll('.aula-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            event.target.classList.add('selected');
            
            updateSendButton();
        }
        
        function updateSendButton() {
            const nickname = document.getElementById('nickname').value.trim();
            const sendBtn = document.getElementById('sendBtn');
            
            if (selectedMessageType && nickname) {
                sendBtn.disabled = false;
            } else {
                sendBtn.disabled = true;
            }
        }
        
        document.getElementById('nickname').addEventListener('input', updateSendButton);
        
        function getMessage(messageType) {
            const messages = {
                'seguranca': `[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]AULA DE SEGURANÇA[/font][/size][/color][/td][/tr][/table]

[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]Olá Militares, sejam bem-vindos à Aula de Segurança, é um prazer apresentá-lo(a) à mais uma etapa de sua carreira. A Aula de Segurança lhe apresentará algumas orientações e lhe guiará suas novas responsabilidades, lembre-se de tirar dúvidas com o(a) supervisor(a) presente na sala, como também não ficar inativo durante a leitura! Tenha bastante atenção e compreenda o conteúdo disposto.

[b]Segue, abaixo, as instruções e o conteúdo acerca da Aula de Segurança.[/b]
[/justify][/font][/color][/size]
[center][table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]SEGURANÇA DO USUÁRIO[/font][/size][/color][/b]

[justify][font=Poppins][color=black][color=#189600][b]Serão apresentadas algumas dicas para a proteção de sua conta. É essencial que siga rigorosamente para evitar invasões ou ser enganado:[/b][/color]

[size=14][color=#189600][b]➯ [/b][/color][/size]Não compartilhe seus dados, mesmo que seja com parentes/amigos;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não escreva suas senhas em locais de fácil acesso;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não acesse sites que ofereçam moedas;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não aceite e/ou acesse arquivos/links estranhos;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não participe de apostas, pois podem tentar enganá-lo;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não compre moedas de estranhos com dinheiro real;
[size=14][color=#189600][b]➯ [/b][/color][/size]Não aceite suborno em troca de algo e/ou seja omisso a crimes.

[color=#ff0000][b]Jamais compartilhe sua conta com terceiros, pois o comprometimento de contas não será tolerado e, consequentemente, será punido.[/b][/color]

Crie e-mails e senhas diferentes para o Habbo, fórum e RCCSystem.

[color=#189600][b]Por qual motivo devo ter senhas diferentes?[/b][/color]

Essa precaução assegura a segurança das dependências da Polícia RCC e de suas contas. Caso tenha dúvidas sobre como trocar a senha do Habbo, sistema e fórum, procure um oficial![/font][/color][/justify][/td][/tr][/table][/center]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]SEGURANÇA DOS POLICIAIS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Em nossa instituição, é importante compreender a definição de "contas fakes" e como identificá-las.

Contas fakes referem-se a policiais falsos, seja por falsificação de cargos ou patentes, ou mesmo por falsificação de nomes. [color=#ff0000][b]Para identificar uma conta fake, é fundamental observar suas ações, a data de criação da conta, o nível/placar de conquistas, lista de amigos, grafia, conduta, entre outros elementos.[/b][/color] Fakes também podem ser identificados pelos nicks, por exemplo: "Guilherme" pode ser confundido com "GuiIherme" (com "i" maiúsculo) ou "Marcos" pode ser confundido com "Marcos.-" (com ponto final). Além disso, é possível identificar uma falsificação de cargo/patente ao verificar o perfil no RCC System. Caso identifique uma falsificação, avise um oficial superior ao envolvido.

É necessário também saber como agir em emergências envolvendo sua conta.

Caso sua conta seja hackeada, [color=#189600][b]procure imediatamente um militar da patente de General+ ou do cargo de Superintendente+ com Especialização Intermediária para que sua conta seja transferida.[/b][/color] O oficial utilizará métodos para comprovar sua identidade e garantirá que você seja removido dos grupos da Polícia RCC, a fim de evitar danos mais graves à instituição.

[color=#cc0000][b]Uma conta comprometida representa um risco para a instituição, portanto, você pode ser rebaixado ou até mesmo exonerado.[/b][/color]

Além disso, todos devem manter as configurações do Habbo conforme as normativas.

É exigido que policiais ativos e que não possuam permissão da Supremacia ou do Setor de Inteligência para tal, [color=#189600][b]mantenham a visibilidade do perfil e o modo online ativo.[/b][/color] O oficial ou praça que faça parte de uma companhia que descumprir esta norma sofrerá um rebaixamento imediato de um cargo/patente a cada 24 horas que se passarem. Os praças de ambos os corpos que ainda não ingressaram em uma companhia serão orientados acerca da irregularidade, e em caso de reincidência e/ou permanência, sofrerão um rebaixamento a cada 24 horas.

[color=#ff0000][b]Portanto, lembre-se de manter sua conta com visibilidade e no modo online![/b][/color][/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]SEGURANÇA DO BATALHÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black][color=#189600][b]Para manter a segurança do batalhão, devemos sempre estar atentos a possíveis ameaças.[/b][/color]

Enquanto estiver sentado na Sala de Estado (fora de funções), utilize a percepção para ajudar a manter o batalhão seguro. Caso presencie algo de errado e/ou suspeito (má conduta, nicks inapropriados e/ou baderneiros), avise ao Oficial da Guarda para que tome as devidas providências. Caso esteja em função, acompanhe as seguintes medidas de segurança:

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Recepção:[/b][/color] observe se o civil tem um nome inapropriado e/ou está apenas querendo bagunçar. Caso isso aconteça, não permita a entrada do mesmo e avise ao Cabo da Guarda.

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Sentinela:[/b][/color] manter a porta de acesso ao Corredor dos Instrutores fechada para evitar invasões.

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Operador 01:[/b][/color] conferir com atenção a missão e o fardamento do policial, verificando se este está de acordo com as normas do Anexo I do Código de Conduta Militar.

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Operador 02:[/b][/color] conferir se o policial possui grupos de outras organizações policiais em seu perfil, verificando também os donos dos grupos dos quais faz parte. Os donos dos grupos oficiais da Polícia RCC são os usuários: [color=#ff0000][b]RCCEmblemas ; -Edhone ; Mine315-BAN e douglasfon71. Caso sejam membros da GOPH, os donos são: Org-GOPH. e dr.jefferson105.[/b][/color]

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Operador 03:[/b][/color] conferir as TAGs corretamente sem margem de erro. Para facilitar a verificação, sussurre com o policial, copie o nick dele (Ctrl + C) e cole (Ctrl + V) no local de pesquisa. O RCCSystem direciona ao perfil do militar; caso contrário, o usuário não consta. Porém, há casos em que o site direciona e o policial está com o ESTADO INATIVO; caso isso ocorra, também não deve liberar a entrada no militar, ele terá que realizar novo alistamento. Após localizar a TAG, verifique se é igual à que possui em sua missão. Para verificar se um policial é [b]EXONERADO[/b], atente-se à última postagem da linha do tempo, onde são exibidos os requerimentos. De outro modo, acesse: [b]RCC System -> Listagem -> Exonerados[/b].

[size=14][color=#189600][b]➯ [/b][/color][/size][color=#189600][b]Operador 04:[/b][/color] conferir se o recruta possui nick inapropriado ou apresenta conduta imprópria e verificar se o recruta consta como policial [color=#ff9900][b]ATIVO ou EXONERADO[/b][/color], inibindo a passagem caso constem. Para conferir no RCCSystem, utilize o mesmo método supracitado na função de operador 03 (sussurro).

[color=#ff0000][b]O Operador 03 ou Operador 04 responsável por liberar um usuário irregular será punido, juntamente com o Auxiliar Operacional, com 50 medalhas efetivas negativas pelo crime de abandono de dever/negligência.[/b][/color][/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]FIM[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Você concluiu a leitura do conteúdo da Aula de Segurança, avise o Supervisor(a)!

Caso esteja com alguma dúvida pergunte ao Supervisor(a)![/font][/color][/justify][/td][/tr][/table]

[size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`,
                
                'promotor': `[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]AULA DE PROMOTOR[/font][/size][/color][/td][/tr][/table]

[table class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]Olá Subtenentes, sejam bem-vindos à Aula de Promotor, é um prazer apresentá-lo(a) à mais uma etapa de sua carreira. A Aula de Promotor lhe apresentará algumas orientações e lhe guiará suas novas responsabilidades, lembre-se de tirar dúvidas com o(a) supervisor(a) presente na sala, como também não ficar inativo durante a leitura! Tenha bastante atenção e compreenda o conteúdo disposto.

[b]Segue, abaixo, as instruções e o conteúdo acerca da Aula de Promotor.[/b]
[/justify][/font][/color][/size]
[center][table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]PROMOÇÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Gratificar um militar com uma promoção não significa apenas elevá-lo a um cargo superior na hierarquia. É necessário possuir um alto senso de observação e conhecimento crítico antes de decidir promover um militar. Portanto, ao conceder uma promoção, certifique-se de que o militar demonstra excelência em todos os aspectos necessários para o posto que irá ocupar. Cada patente exige diferentes níveis de requisitos. Por exemplo, um aspirante não será promovido pelos mesmos motivos que levam à promoção de um soldado para cabo, a qual geralmente é baseada no desempenho na recepção e uma boa ortografia. No caso de um aspirante ser promovido a tenente, existem diversos outros requisitos, tais como desempenho no batalhão, presença, proatividade, desempenho na companhia, conhecimento da constituição, rigidez, postura, conduta, entre outros.[/font][/color][/justify][/td][/tr][/table][/center]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]REBAIXAMENTO E DEMISSÃO[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Existem 6 (seis) punições administrativas, sendo elas: advertência verbal, advertência escrita (para oficiais), rebaixamento, demissão, exoneração e medalhas efetivas negativas. O rebaixamento é uma punição intermediária que geralmente é utilizada quando ocorre alguma transgressão disciplinar, ou seja, crimes descritos nos documentos, tais como conduta imprópria, desrespeito/insubordinação, abuso de poder, etc. Vale ressaltar que todos os crimes possuem punições graduais; portanto, nem todo desrespeito resultará em rebaixamento, podendo ser punido com advertência escrita ou até mesmo advertência, dependendo da situação. A demissão é uma punição mais severa, geralmente aplicada diante de uma transgressão disciplinar grave, como, por exemplo, o crime de traição. Em sua patente atual, você contará com a assistência de superiores para decidir se um militar deve ser rebaixado ou demitido por um crime cometido.[/font][/color][/justify][/td][/tr][/table]
[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]DIÁLOGOS - DPP E DPR[/font][/size][/color][/b]

[justify][font=Poppins][color=black]O Diálogo Pós-Promoção (DPP) tem como objetivo promover uma conversa entre o promotor e o promovido. Esse diálogo pode abordar temas como os critérios que levaram à promoção, os desafios associados à nova patente, proatividade, novas responsabilidades, comprometimento e a necessidade de melhorias em alguns aspectos, visando o contínuo desenvolvimento da carreira na instituição.

O Diálogo Pós-Rebaixamento (DPR) visa possibilitar que o promotor do rebaixamento conduza uma conversa formal, focada na motivação do militar que recebeu a punição. O propósito é fazer com que o militar compreenda seu erro, corrija sua postura e evite a reincidência da transgressão.

Dentro do fórum, há uma apostila de orientação para esses diálogos disponível em: Apostilas: Dicas e ajudas -> Auxílios para a carreira. Recomenda-se a leitura após a conclusão da aula.[/font][/color][/justify][/td][/tr][/table]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]NEPOTISMO[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Segundo o Código Penal Militar (CPM), o nepotismo é definido como o favorecimento de um militar pertencente à mesma árvore genealógica (parentes) ou com fortes vínculos de amizade em detrimento de policiais mais aptos à ação, em situações como promoções, gratificações, entrada em grupos de tarefas, entre outras, sem limitar-se a essas. Nem sempre essas ações são automaticamente consideradas nepotismo, mas caso haja a intenção de gratificar um familiar ou amigo, é aconselhável solicitar opiniões de terceiros e avaliar o desempenho do policial em diversas ocasiões, tanto em funções no batalhão quanto em testes teóricos sobre os documentos, a fim de obter provas da aptidão do militar. A punição para o crime de nepotismo é gradativa tanto para quem é beneficiado quanto para o promotor. Inicialmente, acarreta no cancelamento do requerimento e rebaixamento dos envolvidos, podendo chegar à exoneração em casos mais graves.[/font][/color][/justify][/td][/tr][/table]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]REGRAS[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Existem algumas regras para a realização de promoções. Leia com atenção para evitar que suas promoções sejam canceladas:

Subtenente (com a aula de promotor concluída) pode promover até o posto de sargento ou equivalência, contando com a permissão de um oficial do Corpo Militar ou Corpo Executivo que possua Especialização Intermediária (EI) ou superior. Para verificar a especialização do membro do Corpo Executivo, consulte o perfil do policial no RCCSystem, na aba "dados primários", localizada logo abaixo de sua TAG de identificação.

Em casos de transgressões cometidas por um subordinado, subtenentes possuem autonomia para tomar decisões, como rebaixamento ou demissão, sem a necessidade de obter permissão.[/font][/color][/justify][/td][/tr][/table]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]PERMISSÕES[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Todas as permissões devem estar registradas na aba "PERMISSÕES" do RCCSystem e ser apresentadas em seu requerimento. Para evitar possíveis punições, sempre questione o concessor da permissão se ele efetivamente realizou a postagem; em caso afirmativo, proceda com a postagem do requerimento. Além disso, é obrigatório que registre um printscreen do oficial confirmando a permissão, armazenando-o como prova em caso de necessidade. Vale ressaltar a importância de verificar se o policial possui os cursos obrigatórios.[/font][/color][/justify][/td][/tr][/table]

[table bgcolor="#f2f2f2" border="1" style="border-radius: 20px; overflow: hidden; width: 100%"][tr][td][b][color=#189600][size=17][font=Poppins]FIM[/font][/size][/color][/b]

[justify][font=Poppins][color=black]Você concluiu a leitura do conteúdo da Aula de Promotor, avise o Supervisor(a)!

Caso esteja com alguma dúvida pergunte ao Supervisor(a)![/font][/color][/justify][/td][/tr][/table]

[size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`
            };
            
            return messages[messageType] || null;
        }
        
        function validateForm() {
            const nickname = document.getElementById('nickname').value.trim();
            return nickname.length > 0;
        }
        
        function generateMessage() {
            return getMessage(selectedMessageType);
        }
        
        function sendMessage() {
            if (!selectedMessageType) {
                alert('Por favor, selecione um tipo de aula primeiro.');
                return;
            }
            
            if (!validateForm()) {
                alert('Por favor, preencha o nickname do destinatário.');
                return;
            }
            
            const userName = document.getElementById('nickname').value.trim();
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
            
            const aulaType = selectedMessageType === 'seguranca' ? 'Segurança' : 'Promotor';
            const title = `[SUP] Aula de ${aulaType}`;
            
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
        
        function resetForm() {
            selectedMessageType = null;
            document.getElementById('nickname').value = '';
            document.querySelectorAll('.aula-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            updateSendButton();
        }
