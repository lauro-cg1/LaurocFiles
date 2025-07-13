console.log("V1.1");
function toggleSubmenu() {
				const form1 = document.getElementById('postagem_casos_forms');
				const form2 = document.getElementById('postagem_funcao_forms');
				const form3 = document.getElementById('enviar_Mp');
				form1.style.display = 'none';
				form2.style.display = 'none';
				form3.style.display = 'none';
				const container = document.getElementById('container-manuais');
				const submenu = document.getElementById('submenu-manuais');
				const isVisible = container.style.display === 'flex';
				
				container.style.display = isVisible ? 'none' : 'flex';
				submenu.style.display = isVisible ? 'none' : 'flex';
			}
			
			function mostrarFormulario() {
				const form1 = document.getElementById('postagem_casos_forms');
				const form2 = document.getElementById('postagem_funcao_forms');
				const form3 = document.getElementById('enviar_Mp');
				const form4 = document.getElementById('submenu-manuais');
				const form5 = document.getElementById('container-manuais');
				form2.style.display = 'none';
				form3.style.display = 'none';
				form4.style.display = 'none';
				form5.style.display = 'none';
				
				form1.style.display = form1.style.display === 'none' || form1.style.display === '' ? 'block' : 'none';
			}
			
			function mostrarFormulario2() {
				const form1 = document.getElementById('postagem_casos_forms');
				const form2 = document.getElementById('postagem_funcao_forms');
				const form3 = document.getElementById('enviar_Mp');
				const form4 = document.getElementById('submenu-manuais');
				const form5 = document.getElementById('container-manuais');
				form1.style.display = 'none';
				form3.style.display = 'none';
				form4.style.display = 'none';
				form5.style.display = 'none';
				form2.style.display = form2.style.display === 'none' || form2.style.display === '' ? 'block' : 'none';
			}
			function mostrarFormulario3() {
				const form1 = document.getElementById('postagem_casos_forms');
				const form2 = document.getElementById('postagem_funcao_forms');
				const form3 = document.getElementById('enviar_Mp');
				const form4 = document.getElementById('submenu-manuais');
				const form5 = document.getElementById('container-manuais');
				form1.style.display = 'none';
				form2.style.display = 'none';
				form4.style.display = 'none';
				form5.style.display = 'none';
				form3.style.display = form3.style.display === 'none' || form3.style.display === '' ? 'block' : 'none';
			}
			
			function toggleFields() {
				toggleCargoOptions();
				const tipo = document.getElementById("tipo_caso").value;
				
				document.getElementById("abertura_infracao_graduadores").style.display = "none";
				document.getElementById("abertura_infracao_rondeiros").style.display = "none";
				document.getElementById("fechamento_infracao").style.display = "none";
				document.getElementById("abertura_infracao_tutores").style.display = "none";
				
				if (tipo === "Equipe dos Rondeiros") {
					document.getElementById("abertura_infracao_rondeiros").style.display = "block";
					} else if (tipo === "Equipe dos Tutores") {
					document.getElementById("abertura_infracao_tutores").style.display = "block";
					} else if (tipo === "Equipe dos Graduadores") {
					document.getElementById("abertura_infracao_graduadores").style.display = "block";
					} else if (tipo === "Fechamento de Infração") {
					document.getElementById("fechamento_infracao").style.display = "block";
				}
			}
			function toggleCargoOptions() {
				const cargo = document.getElementById("cargo2").value;
				const fiscalizadorJustificativa = document.getElementById("fiscalizador_justificativa");
				const peritoJustificativa = document.getElementById("perito_justificativa");
				fiscalizadorJustificativa.style.display = "none";
				peritoJustificativa.style.display = "none";
				
				
				if (cargo === "Fiscalizador") {
					if (document.getElementById("tipo_funcao").value === "Justificativa") {
						fiscalizadorJustificativa.style.display = "block";
					}
					} else if (cargo === "Perito") {
					if (document.getElementById("tipo_funcao").value === "Justificativa") {
						peritoJustificativa.style.display = "block";
					}
				}
				
				setRequiredAttributes();
			}
			
			
			function setRequiredAttributes() {
				document.getElementById("cargo2").required = true;
				document.getElementById("nickname_membro2").required = true;
				document.getElementById("tipo_funcao").required = true;
				
				const tipoFuncao = document.getElementById("tipo_funcao").value;
				
				const fiscalizadorJustificativa = document.getElementById("fiscalizador_justificativa");
				const peritoJustificativa = document.getElementById("perito_justificativa");
				
				if (fiscalizadorJustificativa.style.display === "block") {
					document.getElementById("tipo_funcao_fiscalizador_justificativa").required = true;
					document.getElementById("motivo_justificativa_fiscalizador").required = true;
					} else {
					document.getElementById("tipo_funcao_fiscalizador_justificativa").required = false;
					document.getElementById("motivo_justificativa_fiscalizador").required = false;
				}
				
				
				if (peritoJustificativa.style.display === "block") {
					document.getElementById("tipo_funcao_perito_justificativa").required = true;
					document.getElementById("motivo_justificativa_perito").required = true;
					} else {
					document.getElementById("tipo_funcao_perito_justificativa").required = false;
					document.getElementById("motivo_justificativa_perito").required = false;
				}
			}
			
			function enviarFormulario(event) {
				event.preventDefault();
				
				const form = document.getElementById("postagem_casos_forms");
				const submitButton = form.querySelector('input[type="submit"]');
				
				
				form.querySelectorAll(".erro-campo").forEach(el => el.remove());
				
				let camposValidos = true;
				
				const camposVisiveis = Array.from(form.querySelectorAll("input, select, textarea")).filter(el => {
					const style = window.getComputedStyle(el);
					return style.display !== "none" && style.visibility !== "hidden" && el.offsetParent !== null;
				});
				
				for (let campo of camposVisiveis) {
					if (!campo.value.trim()) {
						camposValidos = false;
						
						
						const aviso = document.createElement("div");
						aviso.className = "erro-campo";
						aviso.innerHTML = "⚠️ Preencha este campo.";
						aviso.style.color = "#b10000";
						aviso.style.fontSize = "13px";
						aviso.style.marginTop = "4px";
						aviso.style.backgroundColor = "#ffecec";
						aviso.style.padding = "5px 8px";
						aviso.style.borderRadius = "6px";
						aviso.style.boxShadow = "0 1px 4px rgba(0,0,0,0.1)";
						aviso.style.display = "inline-block";
						
						
						if (!campo.nextElementSibling || !campo.nextElementSibling.classList.contains("erro-campo")) {
							campo.parentNode.insertBefore(aviso, campo.nextSibling);
						}
						
						
						campo.addEventListener("input", () => {
							if (campo.value.trim()) {
								const proximo = campo.nextElementSibling;
								if (proximo && proximo.classList.contains("erro-campo")) {
									proximo.remove();
								}
							}
						});
					}
				}
				
				if (!camposValidos) return;
				
				submitButton.disabled = true;
				submitButton.value = "Enviando...";
				
				const formData = new FormData(form);
				
				const tipoCase = document.getElementById("tipo_caso").value;
				let scriptUrl = 'https://script.google.com/macros/s/AKfycbxH-zdQ30jBvuzkKn61zZ_wJ6hIl7V21UdZzX8jM6zw1fnmnsnJfwxOWX1Xxb962sO7HA/exec';
				
				if (tipoCase === "Fiscalização de Membros") {
					scriptUrl = 'https://script.google.com/macros/s/AKfycbzlpjGdaJuEt7LHKzRGHwppplHqKAUDwc6B0E94N04SR9gSa2fLxXSBLno_hOb2tlRIpQ/exec';
				}
				
				fetch(scriptUrl, {
					method: 'POST',
					body: formData
					}).then(() => {
					const tipoCase = document.getElementById("tipo_caso").value;
					const isFiscalizacaoMembros = tipoCase === "Fiscalização de Membros";
					
					const popup = document.createElement('div');
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
					z-index: 9999;
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
					<h2 style="margin-top: 0;">${isFiscalizacaoMembros ? 'Fiscalização enviada' : 'Caso enviado'}</h2>
					<p>Deseja ${isFiscalizacaoMembros ? 'verificar a postagem' : 'ir para a central de casos'}?</p>
					<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
					<button id="btnSim" style="
					padding: 10px 20px;
					background-color: #33ff88;
					border: none;
					border-radius: 8px;
					cursor: pointer;
					font-weight: bold;
					">Sim</button>
					<button id="btnNao" style="
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
					
					document.getElementById('btnSim').addEventListener('click', () => {
						if (isFiscalizacaoMembros) {
							window.location.href = 'https://docs.google.com/spreadsheets/d/1dCRhjOIl8BUgzDVfsRpZSIemxMpVDKDHe7j2dbQxUO0/edit?gid=1153566377#gid=1153566377';
						} else {
							window.location.href = 'https://docs.google.com/spreadsheets/d/1dCRhjOIl8BUgzDVfsRpZSIemxMpVDKDHe7j2dbQxUO0/edit?gid=1078493043#gid=1078493043';
						}
					});
					
					document.getElementById('btnNao').addEventListener('click', () => {
						form.reset();
						
						const choicesElements = form.querySelectorAll('select');
						choicesElements.forEach(select => {
							if (select.choicesInstance) {
								select.choicesInstance.removeActiveItems();
								select.choicesInstance.setChoiceByValue('');
							}
						});
						
						document.getElementById("abertura_infracao_graduadores").style.display = "none";
						document.getElementById("abertura_infracao_rondeiros").style.display = "none";
						document.getElementById("abertura_infracao_tutores").style.display = "none";
						document.getElementById("fechamento_infracao").style.display = "none";
						form.style.display = "none";
						
						popup.remove();
						submitButton.disabled = false;
						submitButton.value = "Enviar Caso";
					});	
					}).catch(error => {
					alert("Erro ao enviar: " + error.message);
					submitButton.disabled = false;
					submitButton.value = "Enviar";
				});
			}
			
			function enviarFormulario2(event) {
				event.preventDefault();
				
				const form = document.getElementById("postagem_funcao_forms");
				const submitButton = form.querySelector('input[type="submit"]');
				
				submitButton.disabled = true;
				submitButton.value = "Enviando...";
				
				const formData = new FormData(form);
				
				fetch('https://script.google.com/macros/s/AKfycbzlpjGdaJuEt7LHKzRGHwppplHqKAUDwc6B0E94N04SR9gSa2fLxXSBLno_hOb2tlRIpQ/exec', {
					method: 'POST',
					body: formData
					}).then(() => {
					const popup = document.createElement('div');
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
					z-index: 9999;
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
					<h2 style="margin-top: 0;">Conclusão de função enviada</h2>
					<p>Deseja verificar a postagem?</p>
					<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
					<button id="btnSim" style="
					padding: 10px 20px;
					background-color: #33ff88;
					border: none;
					border-radius: 8px;
					cursor: pointer;
					font-weight: bold;
					">Sim</button>
					<button id="btnNao" style="
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
					
					document.getElementById('btnSim').addEventListener('click', () => {
						window.location.href = 'https://docs.google.com/spreadsheets/d/1dCRhjOIl8BUgzDVfsRpZSIemxMpVDKDHe7j2dbQxUO0/edit?gid=1153566377#gid=1153566377';
					});
					
					document.getElementById('btnNao').addEventListener('click', () => {
						form.reset();
						
						const choicesElements = form.querySelectorAll('select');
						choicesElements.forEach(select => {
							if (select.choicesInstance) {
								select.choicesInstance.removeActiveItems();
								select.choicesInstance.setChoiceByValue('');
								
							}
						});
						
						document.getElementById("abertura_infracao_graduadores").style.display = "none";
						document.getElementById("abertura_infracao_rondeiros").style.display = "none";
						document.getElementById("abertura_infracao_tutores").style.display = "none";
						document.getElementById("fechamento_infracao").style.display = "none";
						form.style.display = "none";
						
						popup.remove();
						submitButton.disabled = false;
						submitButton.value = "Enviar Caso";
					});	
					}).catch(error => {
					alert("Erro ao enviar: " + error.message);
					submitButton.disabled = false;
					submitButton.value = "Enviar";
				});
			}
			
			document.addEventListener('DOMContentLoaded', function () {
				document.querySelectorAll('select').forEach(function(selectElement) {
					selectElement.choicesInstance = new Choices(selectElement, {
						searchEnabled: false,
						itemSelectText: '',
						shouldSort: false,
					});
				});
			});
			
			function toggleMpOptions() {
				const tipoSelecionado = document.getElementById("tipomp").value;
				const formularios = document.querySelectorAll(".form-mp");
				formularios.forEach(form => form.style.display = "none");
				
				if (tipoSelecionado) {
					const formularioSelecionado = document.getElementById("form_" + tipoSelecionado);
					if (formularioSelecionado) {
						formularioSelecionado.style.display = "block";
					}
				}
			}
			function enviarMp(event) {
				event.preventDefault();
				
				const tipoMP = document.getElementById("tipomp").value;
				if (!tipoMP) {
					alert("Selecione um tipo de MP.");
					return;
				}
				
				let dados = { tipo: "", nome: "", infracao: "", consideracoes: "", provas: "", extra: "" };
				let mensagem = "";
				let hoje = new Date().toLocaleDateString("pt-BR");
				
				switch (tipoMP) {
					case "carta_adv":
					dados.tipo = "Advertência Verbal";
					dados.nome = document.querySelector('[name="nome_adv"]').value;
					dados.infracao = document.querySelector('[name="infracao_adv"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_adv"]').value;
					dados.provas = document.querySelector('[name="provas_adv"]').value;
					
					dados.mensagem = `[font=poppins][table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#000000" border="1"][tr][td][img]https://i.imgur.com/r19pa9C.gif[/img] 
					
					[table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#FFFFFF" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#EFBA18" border="1"][tr][td][color=#ffffff][size=18][font=Poppins][b]CARTA DE ADVERTÊNCIA VERBAL[/b][/font][/size][/color][/td][/tr][/table] 
					
					[center]Saudações, [b][color=#EFBA18]Rondeiro {USERNAME}[/b][/color][/center] 
					
					[left]A Repartição de Inteligência e Proteção dos Organizadores de Rondas vem, por meio dessa mensagem privada, notificá-lo(a) que foi identificada uma irregularidade em uma atividade ministrada por você. Em razão disso, você está sendo penalizado com uma [b][color=#EFBA18]advertência verbal[/b][/color].
					
					
					[center][b]Data:[/b] ${hoje} 
					[b]Infração:[/b] ${dados.infracao} 
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} [/center]
					
					
					[quote="Regimento Interno"][b]Artigo 1º -[/b] A advertência verbal é uma repreensão básica, consiste em uma conversa entre superior e subordinado, na qual deve ser exposto o erro, as causas, soluções e possíveis prevenções para que esse não volte a acontecer. A advertência verbal pode ser feita por sussurro, mensagem privada ou quaisquer outros meios de contato direto. 
					[b]Artigo 2º -[/b] A punição para a reincidência de duas advertências verbais pelo mesmo crime é uma advertência escrita, após o registro da segunda advertência verbal. 
					[b]Artigo 3º -[/b] O acúmulo de 3 advertências verbais, independente do motivo, acarretará em uma advertência escrita.[/quote] 
					
					A subcompanhia [b][color=#EFBA18]disponibiliza um tópico oficial com as instruções e regras detalhadas para a realização adequada de cada modalidade de ronda e do Curso Prático de Recrutamento[/b][/color]. Além disso, tutores e graduadores podem consultar os manuais de função específicos, disponíveis no subfórum de seu respectivo cargo, para obter orientações adicionais. 
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.2em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#FFFFFF"][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 20px" bgcolor="#1C1C1C"][tr style="border: none!important; overflow: hidden"][td style="width: 25%; border: none!important; overflow: hidden"][size=18][color=white][b]Diretrizes de[/b][/size] 
					[size=12]Atividades[/size][/color][/td][td style="border: none!important; overflow: hidden"][table style="border: none!important; overflow: hidden; padding: 15px; border-radius: 20px" bgcolor="ffffff"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"] 
					[url=https://www.policiarcc.com/t38077-rond-diretrizes-de-atividades][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVZ1Gf3cdhUf1nw5Xuu5_2c3syM7M5JdkS3L2SFc_bUOsm7KSl96ur82UEbZsECCJ2RBw5nprNMu6dsKSPVJ5bGL6el9U26mZFMi24Sx4QSEHleiOeDZ7zy7TPWYSOvPMUXp5FzlF-hGM/s1600/FR525.gif[/img] 
					[color=black][size=14][b]Diretrizes[/size][/b] 
					[size=11]Clique aqui para conferir as diretrizes de cada modalidade.[/size][/color][/url][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/left] 
					
					[right][i]Atenciosamente,
					[b][color=#EFBA18]Repartição de Inteligência e Proteção[/color][/b].[/i][/right][/font][/td][/tr][/table] 
					[font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;
					
					case "carta_adv2":
					dados.tipo = "Advertência Escrita Interna";
					dados.nome = document.querySelector('[name="nome_adv2"]').value;
					dados.infracao = document.querySelector('[name="infracao_adv2"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_adv2"]').value;
					dados.provas = document.querySelector('[name="provas_adv2"]').value;
					
					dados.mensagem = `[font=poppins][table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#000000" border="1"][tr][td][img]https://i.imgur.com/r19pa9C.gif[/img] 
					
					[table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#FFFFFF" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#EFBA18" border="1"][tr][td][color=#ffffff][size=18][font=Poppins][b]CARTA DE ADVERTÊNCIA INTERNA POR REINCIDÊNCIA[/b][/font][/size][/color][/td][/tr][/table] 
					
					[center]Saudações, [b][color=#EFBA18]Rondeiro {USERNAME}[/b][/color][/center] 
					
					[left]A Repartição de Inteligência e Proteção dos Organizadores de Rondas vem, por meio dessa mensagem privada, notificá-lo(a) que foi identificada uma irregularidade em uma atividade ministrada por você. Em razão disso, você está sendo penalizado com uma [b][color=#EFBA18]advertência interna[/b][/color] por reincidência de advertências verbais. 
					
					
					[center][b]Data:[/b] ${hoje} 
					[b]Infração:[/b] ${dados.infracao} 
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} [/center]
					
					
					[quote="Regimento Interno"][b]Artigo 1º -[/b] A advertência verbal é uma repreensão básica, consiste em uma conversa entre superior e subordinado, na qual deve ser exposto o erro, as causas, soluções e possíveis prevenções para que esse não volte a acontecer. A advertência verbal pode ser feita por sussurro, mensagem privada ou quaisquer outros meios de contato direto. 
					[b]Artigo 2º -[/b] A punição para a reincidência de duas advertências verbais pelo mesmo crime é uma advertência escrita, após o registro da segunda advertência verbal. 
					[b]Artigo 3º -[/b] O acúmulo de 3 advertências verbais, independente do motivo, acarretará em uma advertência escrita.[/quote] 
					
					A subcompanhia [b][color=#EFBA18]disponibiliza um tópico oficial com as instruções e regras detalhadas para a realização adequada de cada modalidade de ronda e do Curso Prático de Recrutamento[/b][/color]. Além disso, tutores e graduadores podem consultar os manuais de função específicos, disponíveis no subfórum de seu respectivo cargo, para obter orientações adicionais. 
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.2em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#FFFFFF"][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 20px" bgcolor="#1C1C1C"][tr style="border: none!important; overflow: hidden"][td style="width: 25%; border: none!important; overflow: hidden"][size=18][color=white][b]Diretrizes de[/b][/size] 
					[size=12]Atividades[/size][/color][/td][td style="border: none!important; overflow: hidden"][table style="border: none!important; overflow: hidden; padding: 15px; border-radius: 20px" bgcolor="ffffff"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"] 
					[url=https://www.policiarcc.com/t38077-rond-diretrizes-de-atividades][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVZ1Gf3cdhUf1nw5Xuu5_2c3syM7M5JdkS3L2SFc_bUOsm7KSl96ur82UEbZsECCJ2RBw5nprNMu6dsKSPVJ5bGL6el9U26mZFMi24Sx4QSEHleiOeDZ7zy7TPWYSOvPMUXp5FzlF-hGM/s1600/FR525.gif[/img] 
					[color=black][size=14][b]Diretrizes[/size][/b] 
					[size=11]Clique aqui para conferir as diretrizes de cada modalidade.[/size][/color][/url][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/left] 
					
					[right][i]Atenciosamente,
					[b][color=#EFBA18]Repartição de Inteligência e Proteção[/color][/b].[/i][/right][/font][/td][/tr][/table] 
					[font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;
					
					case "carta_advint":
					dados.tipo = "Advertência Escrita Interna";
					dados.nome = document.querySelector('[name="nome_advint"]').value;
					dados.infracao = document.querySelector('[name="infracao_advint"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_advint"]').value;
					dados.provas = document.querySelector('[name="provas_advint"]').value;
					
					dados.mensagem = `[font=poppins][table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#000000" border="1"][tr][td][img]https://i.imgur.com/r19pa9C.gif[/img] 
					
					[table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#FFFFFF" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#EFBA18" border="1"][tr][td][color=#ffffff][size=18][font=Poppins][b]CARTA DE ADVERTÊNCIA INTERNA POR REINCIDÊNCIA[/b][/font][/size][/color][/td][/tr][/table] 
					
					[center]Saudações, [b][color=#EFBA18]Rondeiro {USERNAME}[/b][/color][/center] 
					
					[left]A Repartição de Inteligência e Proteção dos Organizadores de Rondas vem, por meio dessa mensagem privada, notificá-lo(a) que foi identificada uma irregularidade em uma atividade ministrada por você. Em razão disso, você está sendo penalizado com uma [b][color=#EFBA18]advertência interna[/b][/color]. 
					
					
					[center][b]Data:[/b] ${hoje} 
					[b]Infração:[/b] ${dados.infracao} 
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} [/center]
					
					
					[quote="Regimento Interno"][b]Artigo 1º -[/b] A advertência verbal é uma repreensão básica, consiste em uma conversa entre superior e subordinado, na qual deve ser exposto o erro, as causas, soluções e possíveis prevenções para que esse não volte a acontecer. A advertência verbal pode ser feita por sussurro, mensagem privada ou quaisquer outros meios de contato direto. 
					[b]Artigo 2º -[/b] A punição para a reincidência de duas advertências verbais pelo mesmo crime é uma advertência escrita, após o registro da segunda advertência verbal. 
					[b]Artigo 3º -[/b] O acúmulo de 3 advertências verbais, independente do motivo, acarretará em uma advertência escrita.[/quote] 
					
					A subcompanhia [b][color=#EFBA18]disponibiliza um tópico oficial com as instruções e regras detalhadas para a realização adequada de cada modalidade de ronda e do Curso Prático de Recrutamento[/b][/color]. Além disso, tutores e graduadores podem consultar os manuais de função específicos, disponíveis no subfórum de seu respectivo cargo, para obter orientações adicionais. 
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.2em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#FFFFFF"][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 20px" bgcolor="#1C1C1C"][tr style="border: none!important; overflow: hidden"][td style="width: 25%; border: none!important; overflow: hidden"][size=18][color=white][b]Diretrizes de[/b][/size] 
					[size=12]Atividades[/size][/color][/td][td style="border: none!important; overflow: hidden"][table style="border: none!important; overflow: hidden; padding: 15px; border-radius: 20px" bgcolor="ffffff"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"] 
					[url=https://www.policiarcc.com/t38077-rond-diretrizes-de-atividades][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVZ1Gf3cdhUf1nw5Xuu5_2c3syM7M5JdkS3L2SFc_bUOsm7KSl96ur82UEbZsECCJ2RBw5nprNMu6dsKSPVJ5bGL6el9U26mZFMi24Sx4QSEHleiOeDZ7zy7TPWYSOvPMUXp5FzlF-hGM/s1600/FR525.gif[/img] 
					[color=black][size=14][b]Diretrizes[/size][/b] 
					[size=11]Clique aqui para conferir as diretrizes de cada modalidade.[/size][/color][/url][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/left] 
					
					[right][i]Atenciosamente,
					[b][color=#EFBA18]Repartição de Inteligência e Proteção[/color][/b].[/i][/right][/font][/td][/tr][/table] 
					[font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;					
					
					case "carta_r":
					dados.tipo = "Carta de Rebaixamento";
					dados.nome = document.querySelector('[name="nome_r"]').value;
					dados.infracao = document.querySelector('[name="infracao_r"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_r"]').value;
					dados.provas = document.querySelector('[name="provas_r"]').value;
					
					dados.mensagem = `[font=poppins][table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#000000" border="1"][tr][td][img]https://i.imgur.com/r19pa9C.gif[/img] 
					
					[table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#FFFFFF" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#EFBA18" border="1"][tr][td][color=#ffffff][size=18][font=Poppins][b]CARTA DE REBAIXAMENTO[/b][/font][/size][/color][/td][/tr][/table] 
					
					[center]Saudações, [b][color=#EFBA18]Rondeiro {USERNAME}[/b][/color][/center] 
					
					A Repartição de Inteligência e Proteção dos Organizadores de Rondas vem, por meio dessa mensagem privada, notificá-lo(a) que [b][color=#EFBA18]você foi rebaixado(a) da subcompanhia e penalizado(a) com 50 medalhas efetivas negativas[/color][/b]. 
					
					
					[center][b]Data:[/b] ${hoje} 
					[b]Infração:[/b] ${dados.infracao} 
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} [/center]
					
					[right][i]Atenciosamente, 
					[b][color=#EFBA18]Repartição de Inteligência e Proteção[/color][/b].[/i][/right][/font][/td][/tr][/table] 
					[font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;
					
					case "carta_exp":
					dados.tipo = "Carta de Expulsão";
					dados.nome = document.querySelector('[name="nome_exp"]').value;
					dados.infracao = document.querySelector('[name="infracao_exp"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_exp"]').value;
					dados.provas = document.querySelector('[name="provas_exp"]').value;
					
					const hojeExp = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=poppins][table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#000000" border="1"][tr][td][img]https://i.imgur.com/r19pa9C.gif[/img] 
					
					[table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#FFFFFF" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#EFBA18" border="1"][tr][td][color=#ffffff][size=18][font=Poppins][b]CARTA DE EXPULSÃO[/b][/font][/size][/color][/td][/tr][/table] 
					
					[center]Saudações, [b][color=#EFBA18]Rondeiro {USERNAME}[/b][/color][/center] 
					
					A Repartição de Inteligência e Proteção dos Organizadores de Rondas vem, por meio dessa mensagem privada, notificá-lo(a) que [b][color=#EFBA18]você foi expulso(a) da subcompanhia e penalizado(a) com 100 medalhas efetivas negativas[/color][/b].
					
					
					[center][b]Data:[/b] ${hoje} 
					[b]Infração:[/b] ${dados.infracao} 
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} [/center]
					
					[right][i]Atenciosamente, 
					[b][color=#EFBA18]Repartição de Inteligência e Proteção[/color][/b].[/i][/right][/font][/td][/tr][/table] 
					[font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;					
					
					default:
					alert("Tipo de MP não reconhecido.");
					return;
				}
				
				const tituloMP = `[RIP] ${dados.tipo}`;
				const mensagemMP = dados.mensagem;
				
				send_MP(tituloMP, dados.nome, mensagemMP);
				
				
				document.getElementById("enviar_Mp").reset();
				document.getElementById("enviar_Mp").style.display = "none";
				
				const blocos = document.querySelectorAll('.form-mp');
				blocos.forEach(div => div.style.display = 'none');
			}
			
			function send_MP(title, user, message) {
				$.post('/privmsg', {
					folder: 'inbox',
					mode: 'post',
					post: '1',
					username: user,
					subject: title,
					message: message
				})
				.done(function () {
					const popup = document.createElement('div');
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
					z-index: 9999;
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
					<button id="btnSimMP" style="
					padding: 10px 20px;
					background-color: #33ff88;
					border: none;
					border-radius: 8px;
					cursor: pointer;
					font-weight: bold;
					">Sim</button>
					<button id="btnNaoMP" style="
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
					
					document.getElementById('btnSimMP').addEventListener('click', () => {
						const form = document.querySelector('form');
						if (form) {
							form.reset();
							
							const choicesElements = form.querySelectorAll('select');
							choicesElements.forEach(select => {
								if (select.choicesInstance) {
									select.choicesInstance.removeActiveItems();
									select.choicesInstance.setChoiceByValue('');
								}
							});
						}
						popup.remove();
					});
					
					document.getElementById('btnNaoMP').addEventListener('click', () => {
						window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox';
					});
				})
				.fail(function () {
					alert("Erro ao enviar a mensagem.");
				})
				.always(function () {
					console.log("Usuário:", user);
					console.log("Assunto:", title);
					console.log("Mensagem:", message);
				});
			}
			