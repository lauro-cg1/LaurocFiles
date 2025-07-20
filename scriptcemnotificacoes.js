   console.log("V1.0");
const selectionBtn = document.getElementById('selectionBtn');
			const selectionPopup = document.getElementById('selectionPopup');
			const selectionClose = document.getElementById('selectionClose');
			const cards = document.querySelectorAll('.card');
			const popup = document.getElementById('popupOverlay');
			const btnSim = document.getElementById('btnSimMP');
			const btnNao = document.getElementById('btnNaoMP');
			
			document.addEventListener('DOMContentLoaded', () => {
				
				selectionBtn.addEventListener('click', () => {
					selectionPopup.classList.add('show');
				});
				
				selectionClose.addEventListener('click', () => {
					selectionPopup.classList.remove('show');
					document.querySelectorAll('.popup-form-container').forEach(form => {
						form.classList.remove('show');
					});
					document.querySelector('.selection-options').style.display = 'grid';
					document.querySelector('h3').style.display = 'block';
				});
				
				selectionPopup.addEventListener('click', (e) => {
					if (e.target === selectionPopup) {
						selectionPopup.classList.remove('show');
						document.querySelectorAll('.popup-form-container').forEach(form => {
							form.classList.remove('show');
						});
						document.querySelector('.selection-options').style.display = 'grid';
						document.querySelector('h3').style.display = 'block';
					}
				});
				
				document.querySelectorAll('.selection-option').forEach(option => {
					option.addEventListener('click', () => {
						const target = option.getAttribute('data-target');
						
						document.querySelector('.selection-options').style.display = 'none';
						document.querySelector('h3').style.display = 'none';
						
						document.querySelectorAll('.popup-form-container').forEach(form => {
							form.classList.remove('show');
						});
						
						const targetForm = document.getElementById('popup_' + target);
						console.log('Procurando formulário:', 'popup_' + target, 'Encontrado:', targetForm);
						if (targetForm) {
							setTimeout(() => {
								targetForm.classList.add('show');
							}, 100);
						} else {
							console.error('Formulário não encontrado:', 'popup_' + target);
						}
						
						selectionBtn.textContent = option.textContent;
					});
				});
				
				window.voltarParaOpcoes = function() {
					document.querySelectorAll('.popup-form-container').forEach(form => {
						form.classList.remove('show');
					});
					
					document.querySelector('.selection-options').style.display = 'grid';
					document.querySelector('h3').style.display = 'block';
				};
				
				if (btnSim) btnSim.addEventListener('click', resetForm);
			});
			
			function send_MP(title, user, message) {
				const existingPopup = document.getElementById('messagePopup');
				if (existingPopup) {
					existingPopup.remove();
				}
				
				$.post('/privmsg', {
					folder: 'inbox',
					mode: 'post',
					post: '1',
					username: user,
					subject: title,
					message: message
				})
				.done(function() {
					showTestPopup();
				})
				.fail(function() {
					showTestPopup();
					console.log("Usuário:", user);
					console.log("Assunto:", title);
					console.log("Mensagem:", message);
					alert("Erro ao enviar a mensagem.");
					resetForm()
				});
			}
			
			function showTestPopup() {
				const popupId = 'messagePopup_' + Date.now();
				const popup = document.createElement('div');
				popup.id = popupId;
				popup.innerHTML = `
				<div style="
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background: rgba(0, 0, 0, 0.6);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 999999999;
				">
				<div style="
				background: white;
				color: black;
				padding: 30px;
				border-radius: 12px;
				text-align: center;
				max-width: 90%;
				width: 400px;
				">
				<h2 style="margin-top: 0;">Mensagem enviada!</h2>
				<p>Deseja enviar outra mensagem?</p>
				<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
				<button class="popup-btn sim-btn" data-action="sim" style="
				padding: 10px 20px;
				background-color: #33ff88;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				font-weight: bold;
				">Sim</button>
				<button class="popup-btn nao-btn" data-action="nao" style="
				padding: 10px 20px;
				background-color: #ff6666;
				border: none;
				border-radius: 8px;
				cursor: pointer;
				font-weight: bold;
				">Não</button>
				</div>
				</div>
				</div>
				`;
				
				document.body.appendChild(popup);
				
				popup.querySelector('.sim-btn').onclick = function() {
					resetForm();
					popup.remove();
					console.log('Botão SIM clicado e ação executada');
				};
				
				popup.querySelector('.nao-btn').onclick = function() {
					console.log('Botão NÃO clicado - redirecionando...');
					window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox';
				};
				
				popup.querySelector('.sim-btn').addEventListener('click', function() {
					resetForm();
					popup.remove();
					console.log('Botão SIM clicado via addEventListener');
				});
				
				popup.querySelector('.nao-btn').addEventListener('click', function() {
					console.log('Botão NÃO clicado via addEventListener - redirecionando...');
					window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox';
				});
				
				console.log('Popup criado com ID:', popupId);
				console.log('Botões configurados no popup');
			}
			
			function resetForm() {
				console.log('Função resetForm chamada');
				
				document.querySelectorAll('form').forEach(form => {
					form.reset();
				});

				const cards = document.querySelectorAll('.card, .popup-form-container');
				cards.forEach(card => {
					card.classList.remove('show');
					card.style.removeProperty('display');
				});
				
				const selectionBtn = document.getElementById('selectionBtn');
				if (selectionBtn) {
					selectionBtn.textContent = 'Selecione a MP desejada';
				}
				
				const selectionPopup = document.getElementById('selectionPopup');
				
				const selectionOptions = document.querySelector('.selection-options');
				const mainTitle = document.querySelector('h3');
				if (selectionOptions) selectionOptions.style.display = 'grid';
				if (mainTitle) mainTitle.style.display = 'block';
				
				const buttonIds = [
				'promo3_cem', 'promo2_cem', 'promo1_cem', 
				'bv_da_cem', 'bv_dmt_cem', 'expulsao_cem', 
				'rebaixamento_cem', 'advertencia_cem', 'verbal_cem'
				];
				
				const mainButtonIds = [
				'promo3', 'promo2', 'promo1', 
				'bv_da', 'bv_dmt', 'expulsao', 
				'rebaixamento', 'advertencia', 'verbal'
				];
				
				buttonIds.forEach(id => {
					const buttonContainer = document.getElementById(id);
					if (buttonContainer) {
						buttonContainer.style.display = 'none';
					}
				});
				
				mainButtonIds.forEach(id => {
					const buttonContainer = document.getElementById(id);
					if (buttonContainer) {
						buttonContainer.style.display = 'block';
						
						const submitButton = buttonContainer.querySelector('input[type="submit"]');
						if (submitButton) {
							submitButton.disabled = false;
							submitButton.value = "Enviar";
						}
					}
				});
				
				console.log('Formulário resetado e botões restaurados');
			}
			
			function fill_verbal(event) {
				event.preventDefault();
				
				document.getElementById('verbal').style.display = 'none';
				document.getElementById('verbal_cem').style.display = 'block';
				
				const nick = document.getElementById('nome_sc').value;
				const motivo = document.getElementById('inf_sc').value;
				const consideracoes = document.getElementById('con_sc').value;
				const provas = document.getElementById('provas_sc').value;
				
				const titulo = "[CEM] Advertência Verbal";
				const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#1D1D1D"]
				[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/bvkJK1B3/1.gif[/img]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]ADVERTÊNCIA VERBAL[/color][/size][/b][/td][/tr]
				
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#045199][b]{USERNAME}[/b][/color].[/center]
				
				[justify]Informa-se, através desta mensagem privada, que você está sendo [color=#045199][b]advertido[/b][/color] [b][color=#045199]verbalmente[/b][/color] por ${motivo} no [b][color=#045199]Centro de Elitização Militar[/color][/b]. Na reincidência de [b][color=#045199]três advertências verbais[/color][/b], você receberá uma [b][color=#045199]advertência interna[/color][/b].
				
				[b][color=#045199]Comprovações:[/color][/b] ${provas}
				[color=#045199][b]Comentários:[/b][/color] ${consideracoes} [/justify][/td][/tr]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][b][center][size=11]Caso acredite que a punição tenha sido inadequada e deseje recorrer, procure um membro da liderança.[/size][/center][/b][/td][/tr][/table]
				
				[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url].[/color][/size]
				[/td][/tr][/table][/font]`;
				
				send_MP(titulo, nick, mensagem);
				
				return false;
			}
			
			function fill_adv(event) {
				event.preventDefault();
				
				document.getElementById('advertencia').style.display = 'none';
				document.getElementById('advertencia_cem').style.display = 'block';
				
				const nick = document.getElementById('nome_adv').value;
				const motivo = document.getElementById('inf_adv').value;
				const consideracoes = document.getElementById('con_adv').value;
				const provas = document.getElementById('provas_adv').value;
				
				const titulo = "[CEM] Advertência Interna";
				const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#1D1D1D"]
				[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/bvkJK1B3/1.gif[/img]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]ADVERTÊNCIA INTERNA[/color][/size][/b][/td][/tr]
				
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#045199][b]{USERNAME}[/b][/color].[/center]
				
				[justify]Informa-se, através desta mensagem privada, que você está sendo [b][color=#045199]advertido internamente[/color][/b] por [b][color=#045199] ${motivo} [/color][/b] no [b][color=#045199]Centro de Elitização Militar[/color][/b]. Na reincidência de [b][color=#045199]duas advertências internas[/color][/b] os assistentes+ receberão um [b][color=#045199]rebaixamento[/color][/b], enquanto os membros serão [b][color=#045199]expulsos[/color][/b].
				
				[b][color=#045199]Comprovações:[/color][/b] ${provas}
				[color=#045199][b]Comentários:[/b][/color] ${consideracoes} [/justify][/td][/tr]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][b][center][size=11]Caso acredite que a punição tenha sido inadequada e deseje recorrer, procure um membro da liderança.[/size][/center][/b][/td][/tr][/table]
				
				[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url].[/color][/size]
				[/td][/tr][/table][/font]`;
				
				send_MP(titulo, nick, mensagem);
				
				return false;
			}
			
			function fill_rebai(event) {
				event.preventDefault();
				
				document.getElementById('rebaixamento').style.display = 'none';
				document.getElementById('rebaixamento_cem').style.display = 'block';
				
				const nick = document.getElementById('nome_r').value;
				const motivo = document.getElementById('inf_r').value;
				const consideracoes = document.getElementById('con_r').value;
				const provas = document.getElementById('provas_r').value;
				
				const titulo = "[CEM] Carta de Rebaixamento️";
				const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#1D1D1D"]
				[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/bvkJK1B3/1.gif[/img]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]REBAIXAMENTO[/color][/size][/b][/td][/tr]
				
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#045199][b]{USERNAME}[/b][/color].[/center]
				
				[justify]Informa-se, através desta mensagem privada, que você está sendo [b][color=#045199]rebaixado[/color][/b] por [b][color=#045199] ${motivo} [/color][/b] na subcompanhia [b][color=#045199]Centro de Elitização Militar[/color][/b]. Este rebaixamento será acompanhado com [b][color=#045199]50 medalhas efetivas negativas[/color][/b].
				
				[b][color=#045199]Comprovações:[/color][/b] ${provas}
				[color=#045199][b]Comentários:[/b][/color] ${consideracoes} [/justify][/td][/tr]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][b][center][size=11]Caso acredite que a punição tenha sido inadequada e deseje recorrer, procure um membro da liderança.[/size][/center][/b][/td][/tr][/table]
				
				[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url].[/color][/size]
				[/td][/tr][/table][/font]`;
				
				send_MP(titulo, nick, mensagem);
				
				return false;
			}
			
			function fill_exp(event) {
				event.preventDefault();
				
				document.getElementById('expulsao').style.display = 'none';
				document.getElementById('expulsao_cem').style.display = 'block';
				
				const nick = document.getElementById('nome_exp').value;
				const motivo = document.getElementById('inf_exp').value;
				const consideracoes = document.getElementById('con_exp').value;
				const provas = document.getElementById('provas_exp').value;
				
				const titulo = "[CEM] Carta de Expulsão";
				const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#1D1D1D"]
				[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/bvkJK1B3/1.gif[/img]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]EXPULSÃO[/color][/size][/b][/td][/tr]
				
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#045199][b]{USERNAME}[/b][/color].[/center]
				
				[justify]Informa-se, através desta mensagem privada, que você está sendo [b][color=#045199]expulso[/color][/b] por [b][color=#045199] ${motivo} [/color][/b] na subcompanhia [b][color=#045199]Centro de Elitização Militar[/color][/b]. Esta expulsão será acompanhada com [b][color=#045199]100 medalhas efetivas negativas[/color][/b].
				
				[b][color=#045199]Comprovações:[/color][/b] ${provas}
				[color=#045199][b]Comentários:[/b][/color] ${consideracoes} [/justify][/td][/tr]
				[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][b][center][size=11]Caso acredite que a punição tenha sido inadequada e deseje recorrer, procure um membro da liderança.[/size][/center][/b][/td][/tr][/table]
				
				[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url].[/color][/size]
				[/td][/tr][/table][/font]`;
				
				send_MP(titulo, nick, mensagem);
				
				return false;
			}
			
			function fill_bv_dmt(event) {
				event.preventDefault();
				
				document.getElementById('bv_dmt').style.display = 'none';
				document.getElementById('bv_dmt_cem').style.display = 'block';
				
				const nicks = document.getElementById('nome_bv_dmt').value;
				const nicksArray = nicks.split('/').map(nick => nick.trim());
				
				nicksArray.forEach(nick => {
					const titulo = "[CEM] Carta de Boas Vindas";
					const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#8B0000"]
					[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/9fqbmdnc/DMT.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="8B0000"][b][size=18][color=white]CARTA DE BOAS-VINDAS[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#8B0000][b]{USERNAME}[/b][/color].[/center]
					
					[justify]Seja bem-vindo ao [b][color=#8B0000]Departamento de Marketing e Tecnologia[/color][/b] do [b]Centro de Elitização Militar[/b]! A presente carta de Boas-Vindas descreve todas aquelas que são as suas funções enquanto membro da subcompanhia. De modo a complementar as informações aqui dispostas, recomendamos que leia o [b]Manual de Funções[/b] disposto no subfórum do seu departamento.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="8B0000"][b][size=18][color=white]DEPARTAMENTO DE MARKETING E TECNOLOGIA[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify]O [b]Departamento de Marketing & Tecnologia (DMT)[/b] tem a incumbência de divulgar e assegurar a transparência de todas as atividades da subcompanhia. Sua principal função é colaborar com os outros departamentos para [b]garantir que o CEM seja compartilhado com todos os praças da RCC[/b]. Os integrantes deste departamento têm responsabilidades que estão diretamente ligadas a essa divulgação, envolvendo uma variedade de ações.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="8B0000"][b][size=18][color=white]FUNÇÕES[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify][b][color=#8B0000]▶️ Aplicação de Mediação Hierárquica:[/color][/b]
					Os membros têm a responsabilidade de aplicar mediação hierárquica aos militares do Corpo de Praças que requisitarem, possuindo a [b]meta de uma aplicação mensal.[/b] Vale ressaltar que os membros que cumprirem esta meta será punido com advertência interna.
					
					[b][color=#8B0000]▶️ Elaboração/Edição de BBCode[/color][/b]
					O membro responsável por essa função deve [b]criar/elaborar um BBCode[/b] com a informação a ser compartilhada com os demais militares.
					
					[b][color=#8B0000]▶️ Envio de Mensagens Privadas[/color][/b]
					O membro responsável por essa função deve [b]enviar a Mensagem Privada[/b], com o BBCode criado previamente, para todas as companhias da instituição.
					
					[b][color=#8B0000]▶️ Postagem em tópicos de comunicação[/color][/b]
					O membro responsável por essa função deve [b]postar o BBCode[/b] pretendido na Área de Comunicação disponibilizada no fórum da instituição.
					
					[b][color=#8B0000]▶️ Divulgação em canais externos[/color][/b]
					O membro responsável por essa função deve [b]criar uma mensagem/legenda[/b] de acordo com o banner pré-disponibilizado e realizar a sua [b]partilha em plataformas externas[/b] como, por exemplo, o Whatsapp ou Diverbald.
					
					[b][color=#8B0000]▶️ Cobertura de atividades/edições[/color][/b]
					O membro responsável por essa função deve fazer-se presente no dia da atividade para a qual ficou escalado e [b]registrar o que aconteceu ao longo do treino[/b] (vencedores dos prêmios, destaques, prêmios sorteados), quer através de print’s quer através de documentos escritos.
					
					[b][color=#8B0000]▶️ Elaboração da transparências[/color][/b]
					O membro responsável por essa função deve [b]idealizar um BBCode[/b] que resuma a atividade ou o dia da edição para o qual foi escalado, com base nas informações coletadas.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="8B0000"][b][size=18][color=white]EDIÇÕES[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify]As edições ocorrem a cada [b]trimestre[/b], sendo organizadas pela Comissão de Organização, cujos membros são escolhidos pela liderança quando a edição se aproxima. As funções são distribuídas entre os membros, tornando-se parte de suas [b]metas semanais[/b]. Mais detalhes são divulgados conforme as datas se aproximam.
					
					Além disso, [b]aspirantes de destaque podem conquistar uma promoção a tenente com a TAG da subcompanhia ou avançar da Especialização Básica para a Intermediária[/b]. Também há diversos prêmios sorteados durante os treinamentos, como HCs e câmbios.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"][tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][justify][b][center][blur][color=#8B0000][size=15]PRÓXIMOS PASSOS[/size][/color][/blur][/center][/b]
					Por fim, não esqueça de atualizar as suas tarefas no RCCSystem com a sigla [b][color=#8B0000][M.CEM][/color][/b] em até [b]48 horas[/b] após o recebimento desta mensagem privada. Caso seja Oficial do Corpo Militar ou Corpo Executivo com Especialização Intermediário, estará passível ao recebimento de uma [b]advertência escrita por abandono de dever/negligência[/b].[/justify][/td][/tr][/table][/font][/td][/tr][/table]
					`;
					
					send_MP(titulo, nick, mensagem);
				});
				
				return false;
			}
			
			function fill_bv_da(event) {
				event.preventDefault();
				
				document.getElementById('bv_da').style.display = 'none';
				document.getElementById('bv_da_cem').style.display = 'block';
				
				const nicks = document.getElementById('nome_bv_da').value;
				const nicksArray = nicks.split('/').map(nick => nick.trim());
				
				nicksArray.forEach(nick => {
					const titulo = "[CEM] Carta de Boas Vindas";
					const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#00B2AC"]
					[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/pIOiAT2.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="00B2AC"][b][size=18][color=white]CARTA DE BOAS-VINDAS[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#00B2AC][b]{USERNAME}[/b][/color].[/center]
					
					[justify]Seja bem-vindo ao [b][color=#00B2AC]Departamento de Atividades[/color][/b] do [b]Centro de Elitização Militar[/b]! A presente carta de Boas-Vindas descreve todas aquelas que são as suas funções enquanto membro da subcompanhia. De modo a complementar as informações aqui dispostas, recomendamos que leia o [b]Manual de Funções[/b] disposto no subfórum do seu departamento.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="00B2AC"][b][size=18][color=white]DEPARTAMENTO DE ATIVIDADES[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify]O [b]Departamento de Atividades (DA)[/b] é responsável por organizar treinos, palestras e atividades voltadas ao Corpo de Praças, com o objetivo de instruir, capacitar e transmitir conhecimento aos policiais.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="00B2AC"][b][size=18][color=white]FUNÇÕES[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify][b][color=#00B2AC]▶️ Aplicação de Mediação Hierárquica:[/color][/b]
					Os membros têm a responsabilidade de aplicar mediação hierárquica aos militares do Corpo de Praças que requisitarem, possuindo a [b]meta de uma aplicação mensal.[/b] Vale ressaltar que os membros que cumprirem esta meta será punido com advertência interna.
					
					[b][color=#00B2AC]▶️ Aplicação de aulas documentais[/color][/b]
					Os membros têm a responsabilidade de [b]aplicar aulas documentais direcionadas ao Corpo de Praças e aos Oficiais portadores de Especialização Básica[/b], visando instruir e transmitir conhecimento referente às documentações aos policiais.
					
					[b][color=#00B2AC]▶️ Aplicação de atividades quinzenais[/color][/b]
					Os membros têm a responsabilidade de [b]auxiliar na ministração de uma atividade quinzenal direcionada ao Corpo de Praças[/b], visando instruir e transmitir conhecimento aos policiais. Tais atividades contribuem significativamente para o desenvolvimento de cada praça, preparando-os para possíveis avanços na carreira dentro do Corpo de Oficiais.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="00B2AC"][b][size=18][color=white]EDIÇÕES[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify]As edições ocorrem a cada [b]trimestre[/b], sendo organizadas pela Comissão de Organização, cujos membros são escolhidos pela liderança quando a edição se aproxima. As funções são distribuídas entre os membros, tornando-se parte de suas [b]metas semanais[/b]. Mais detalhes são divulgados conforme as datas se aproximam.
					
					Além disso, [b]aspirantes de destaque podem conquistar uma promoção a tenente com a TAG da subcompanhia ou avançar da Especialização Básica para a Intermediária[/b]. Também há diversos prêmios sorteados durante os treinamentos, como HCs e câmbios.[/justify][/td][/tr][/table]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"][tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][justify][b][center][blur][color=#00B2AC][size=15]PRÓXIMOS PASSOS[/size][/color][/blur][/center][/b]
					Por fim, não esqueça de atualizar as suas tarefas no RCCSystem com a sigla [b][color=#00B2AC][M.CEM][/color][/b] em até [b]48 horas[/b] após o recebimento desta mensagem privada. Caso seja Oficial do Corpo Militar ou Corpo Executivo com Especialização Intermediário, estará passível ao recebimento de uma [b]advertência escrita por abandono de dever/negligência[/b].[/justify][/td][/tr][/table][/font][/td][/tr][/table]
					`;
					
					send_MP(titulo, nick, mensagem);
				});
				
				return false;
			}
			
			function fill_promo1(event) {
				event.preventDefault();
				
				document.getElementById('promo1').style.display = 'none';
				document.getElementById('promo1_cem').style.display = 'block';
				
				const nicks = document.getElementById('nome_promo1').value;
				const nicksArray = nicks.split('/').map(nick => nick.trim());
				
				nicksArray.forEach(nick => {
					const titulo = "[CEM] Você foi PROMOVIDO(A)!";
					const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#1D1D1D"]
					[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/bvkJK1B3/1.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]CARTA DE PROMOÇÃO[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#045199][b]{USERNAME}[/b][/color].[/center]
					
					[justify]Você é o mais novo(a) [b][color=#045199]Diretor[/color][/b] do [b]Centro de Elitização Militar[/b]! Parabéns pela sua ascensão na hierarquia da subcompanhia. 
					Segue abaixo algumas orientações para o ajudar nas suas novas funções:
					
					[b][color=#045199]▶️ Diretoria de Administração:[/color][/b] 
					O diretor responsável por este setor tem o dever de [b]atualizar o Ranking de Praças[/b] constantemente durante a semana.
					
					[b][color=#045199]▶️ Diretoria da Contabilidade:[/color][/b] 
					O diretor responsável por este setor tem o dever de [b]postar a porcentagem referente ao cumprimento de funções dos membros e assistentes[/b] semanalmente na consulta de eficiência e trocar os bots de destaque no corredor da subcompanhia.
					
					[b][color=#045199]▶️ Diretoria das Finanças:[/color][/b] 
					O diretor responsável por este setor tem o dever de [b]postar as medalhas efetivas referente ao cumprimento/não cumprimento de funções[/b] de todos os cargos da subcompahia no cofre da auditoria fiscal semanalmente/mensalmente.
					
					[b][color=#045199]▶️ Diretoria da Fiscalização:[/color][/b] 
					O diretor responsável por este setor tem o dever de [b]fiscalizar a listagem de membros[/b], retirando todos aqueles que não cumprem os requisitos de permanência na subcompanhia (desligamento, saída, inatividades, entre outros).
					
					[b][color=#045199]▶️ Diretoria da Atualização:[/color][/b] 
					O diretor responsável por este setor tem o dever de [b]atualizar a listagem de membros e o quadro de advertências[/b] constantemente na semana.[/justify][/td][/tr][/table]
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="045199"][b][size=18][color=white]IMPORTÂNCIA DO CARGO[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][justify]Fora as responsabilidades perante as funções previamente apresentadas, é de suma importância o [b]compromisso para com a subcompanhia[/b]. Enquanto parte da diretoria, você deve procurar auxiliar os membros e resolver pendências referentes ao grupo de tarefas, para além de desenvolver métodos eficientes e inovadores para a evolução da subcia e, consequentemente, do Corpo de Praças.[/justify][/td][/tr]
					
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][justify][b][center][blur][color=#045199][size=15]PRÓXIMOS PASSOS[/size][/color][/blur][/center][/b]
					Por fim, não esqueça de atualizar as suas tarefas no RCCSystem com a sigla [b][color=#045199][Dir.CEM][/color][/b] em até [b]48 horas[/b] após o recebimento desta mensagem privada. Caso seja Oficial do Corpo Militar ou Corpo Executivo com Especialização Intermediário, estará passível ao recebimento de uma [b]advertência escrita por abandono de dever/negligência[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/font]
					`;
					
					send_MP(titulo, nick, mensagem);
				});
				
				return false;
			}
			
			function fill_promo2(event) {
				event.preventDefault();
				
				document.getElementById('promo2').style.display = 'none';
				document.getElementById('promo2_cem').style.display = 'block';
				
				const nicks = document.getElementById('nome_promo2').value;
				const nicksArray = nicks.split('/').map(nick => nick.trim());
				
				nicksArray.forEach(nick => {
					const titulo = "[CEM] Você foi PROMOVIDO(A)!";
					const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#00B2AC"]
					[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/pIOiAT2.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="00B2AC"][b][size=18][color=white]CARTA DE PROMOÇÃO[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#00B2AC][b]{USERNAME}[/b][/color].[/center]
					
					[justify]Você é o mais novo(a) [b][color=#00B2AC]Assistente do Departamento de Atividades[/color][/b]! Parabéns pela sua ascensão na hierarquia da subcompanhia do Centro de Elitização Militar. Segue abaixo algumas orientações e novas funções:
					
					[b][color=#00B2AC]▶️ Elaboração da auditoria de dados e envio ao Departamento de Marketing e Tecnologias[/color][/b]
					Os assistentes responsáveis por auditar os dados têm o objetivo de [b]coletar e organizar informações[/b] essenciais sobre as atividades da semana, focando em:
					
					[b][color=#00B2AC]✏︎[/color][/b] Verificar quantas aulas foram realizadas na semana;
					[b][color=#00B2AC]✏︎[/color][/b] Identificar quais aulas foram aplicadas e os policiais que participaram;
					[b][color=#00B2AC]✏︎[/color][/b] Determinar o melhor aplicador da semana.
					
					[b][color=#00B2AC]▶️ Fiscalização de aulas e treinos aplicados[/color][/b]
					Os assistentes responsáveis por fiscalizar aulas e treinos aplicados, devem [b]garantir a qualidade e pertinência dos conteúdos[/b]. Dessa forma, é essencial que durante a função observe:
					
					[b][color=#00B2AC]✏︎ Comprovação da realização –[/color][/b] Verificar se há registros adequados das aulas e treinos aplicados.
					[b][color=#00B2AC]✏︎ Qualidade do conteúdo –[/color][/b] Analisar se o material abordado é realmente útil e aprofundado ou se está raso e insuficiente.
					[b][color=#00B2AC]✏︎ Relevância do treino –[/color][/b] Garantir que os treinos aplicados tenham impacto real na formação e desenvolvimento dos policiais.[/justify]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"][tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][justify][b][center][blur][color=#00B2AC][size=15]PRÓXIMOS PASSOS[/size][/color][/blur][/center][/b]
					Por fim, não esqueça de atualizar as suas tarefas no RCCSystem com a sigla [b][color=#00B2AC][Ass.CEM][/color][/b] em até [b]48 horas[/b] após o recebimento desta mensagem privada. Caso seja Oficial do Corpo Militar ou Corpo Executivo com Especialização Intermediário, estará passível ao recebimento de uma [b]advertência escrita por abandono de dever/negligência[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/font]
					`;
					
					send_MP(titulo, nick, mensagem);
				});
				
				return false;
			}
			
			function fill_promo3(event) {
				event.preventDefault();
				
				document.getElementById('promo3').style.display = 'none';
				document.getElementById('promo3_cem').style.display = 'block';
				
				const nicks = document.getElementById('nome_promo3').value;
				const nicksArray = nicks.split('/').map(nick => nick.trim());
				
				nicksArray.forEach(nick => {
					const titulo = "[CEM] Você foi PROMOVIDO(A)!";
					const mensagem = `[font=Poppins][table style="border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#8B0000"]
					[tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.postimg.cc/9fqbmdnc/DMT.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"]
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="8B0000"][b][size=18][color=white]CARTA DE PROMOÇÃO[/color][/size][/b][/td][/tr]
					
					[tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#8B0000][b]{USERNAME}[/b][/color].[/center]
					
					[justify]Você é o mais novo(a) [b][color=#8B0000]Assistente do Departamento de Marketing e Tecnologia[/color][/b]! Parabéns pela sua ascensão na hierarquia da subcompanhia do Centro de Elitização Militar. Segue abaixo algumas orientações e novas funções:
					
					[b][color=#8B0000]▶️ Elaboração da Escala Geral[/color][/b]
					O assistente responsável pela elaboração desta escala, tem como função a [b]distribuição das funções relacionadas às atividades gerais[/b] do departamento. Suas atribuições incluem:
					
					[b][color=#8B0000]✏︎[/color][/b] Escalar membros para entregar o banner e a legenda das atividades gerais;
					[b][color=#8B0000]✏︎[/color][/b] Escalar membros para divulgar e enviar mensagens privadas informando sobre atividades e eventos, incluindo a Banca de Avaliações e Mediações Hierárquicas;
					[b][color=#8B0000]✏︎[/color][/b] Criar títulos chamativos para as mensagens privadas, aumentando a taxa de abertura e engajamento.
					
					[b][color=#8B0000]▶️ Elaboração da Escala de Mensagens Privadas[/color][/b]
					O assistente responsável pela elaboração desta escala, tem como função a [b]distribuição dos membros responsáveis pelo envio das mensagens privadas para aspirantes/analistas[/b]. Além dessa função, o assistente ficará responsável por:
					
					[b][color=#8B0000]✏︎[/color][/b] Monitorar constantemente se algum membro entrou em licença;
					[b][color=#8B0000]✏︎[/color][/b] Substituir membros ausentes com antecedência ou, se necessário, assumir a responsabilidade pelo envio das MPs;
					[b][color=#8B0000]✏︎[/color][/b] Garantir que as MPs sejam enviadas corretamente e no prazo estipulado.
					
					[b][color=#8B0000]▶️ Fiscalização de postagens de aulas e treinos[/color][/b]
					O assistente responsável pela fiscalização deve garantir que todas as postagens do departamento sejam [b]feitas corretamente e dentro dos padrões exigidos[/b]. 
					
					[b][color=#8B0000]▶️ Organização dos dados auditados pelo Departamento de Aplicação[/color][/b]
					Os assistentes responsáveis pela organização dos dados auditados devem [b]coletar e organizar as informações[/b], garantindo que todas as informações estejam precisas e acessíveis e possibilitando a sua divulgação oficial. 
					[/justify]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.5em; border-radius: 15px"][tr style="overflow: hidden; border: none !important"][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][justify][b][center][blur][color=#8B0000][size=15]PRÓXIMOS PASSOS[/size][/color][/blur][/center][/b]
					Por fim, não esqueça de atualizar as suas tarefas no RCCSystem com a sigla [b][color=#8B0000][Ass.CEM][/color][/b] em até [b]48 horas[/b] após o recebimento desta mensagem privada. Caso seja Oficial do Corpo Militar ou Corpo Executivo com Especialização Intermediário, estará passível ao recebimento de uma [b]advertência escrita por abandono de dever/negligência[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/font]
					`;
					
					send_MP(titulo, nick, mensagem);
				});
				
				return false;
			}