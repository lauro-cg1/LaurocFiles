console.log("V1.2.1");

function overrideEscalaMinisterial() {
	const links = document.querySelectorAll('a');
	let found = false;
	
	links.forEach(link => {
		if (link.textContent.trim() === 'Escala Ministerial') {
			found = true;
			link.removeAttribute('href');
			link.style.cursor = 'pointer';
			link.addEventListener('click', function(e) {
				e.preventDefault();
				window.open('https://www.policiarcc.com/h262-sup-escala-ministerial', '_blank');
			});
		}
	});
	
	if (!found) {
		setTimeout(overrideEscalaMinisterial, 500);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	overrideEscalaMinisterial();
	
	setTimeout(overrideEscalaMinisterial, 1000);
	setTimeout(overrideEscalaMinisterial, 2000);
});

window.addEventListener('load', function() {
	setTimeout(overrideEscalaMinisterial, 500);
});

const opcoesPorMinisterio = {
				"Ministério da Administração": [
				"Atualização de aulas",
				"Não teve requerimentos"
				],
				"Ministério da Assistência": [
				"Atualização do Quadro de Advertências",
				"Registro dos pontos dos supervisores, tutores, fiscalizadores e graduadores no Ranking Interno da companhia",
				"Sem requerimentos para atualizar"
				],
				"Ministério da Atualização": [
				"Atualização na listagem de membros",
				"Sem requerimentos para atualizar"
				],
				"Ministério da Contabilidade": [
				"Postagem da porcentagem semanal dos Supervisores & Atualização do Quadro de Recordes",
				"Postagem da porcentagem semanal dos Tutores",
				"Postagem da porcentagem semanal dos Fiscalizadores",
				"Realização da escala semanal dos Tutores",
				"Realização da escala semanal dos Fiscalizadores",
				"Postagem da porcentagem quinzenal dos Graduadores"
				],
				"Ministério da Documentação": [
				"Fiscalização dos projetos da ouvidoria",
				"Manutenção da planilha de avaliações de projetos",
				"Adição dos vereditos na ouvidoria",
				"Adição dos projetos em vigor e postagem de medalhas",
				"Atualização das correções de planilhas, documentos e scripts",
				"Postagem do Melhor Supervisor do Mês",
				"Envio de notificação aos promovidos da semana"
				],
				"Ministério das Finanças": [
				"Postagem das medalhas semanais dos Supervisores & Tutores",
				"Postagem das medalhas semanais dos Fiscalizadores",
				"Postagem das medalhas semanais dos Estagiários & Ministros",
				"Postagem das medalhas quinzenais dos Graduadores",
				"Postagem das medalhas mensais da Liderança"
				],
				"Ministério da Segurança": [
				"Limpeza na listagem, subfórum e grupo",
				"Sem supervisores para retirar"
				]
			};
			
			function mostrarCheckboxes(ministerio) {
				const container = document.getElementById("ministro_conclusao");
				const funcoes = opcoesPorMinisterio[ministerio];
				if (!funcoes) return;
				
				document.getElementById("funcoes_checkbox_wrapper")?.remove();
				
				const wrapper = document.createElement("div");
				wrapper.id = "funcoes_checkbox_wrapper";
				wrapper.className = "input-box";
				
				const label = document.createElement("span");
				label.className = "details_span";
				label.style.color = "white";
				label.style.textShadow = "0 2px 4px rgba(0, 0, 0, 0.3)";
				label.innerText = "Função Concluída:";
				wrapper.appendChild(label);
				
				const checkboxContainer = document.createElement("div");
				checkboxContainer.style.display = "flex";
				checkboxContainer.style.flexWrap = "wrap";
				checkboxContainer.style.gap = "15px";
				checkboxContainer.style.justifyContent = "center";
				checkboxContainer.style.background = "linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(26, 46, 30, 0.9) 100%)";
				checkboxContainer.style.border = "2px solid rgba(108, 210, 78, 0.4)";
				checkboxContainer.style.borderRadius = "16px";
				checkboxContainer.style.padding = "25px";
				checkboxContainer.style.marginTop = "15px";
				checkboxContainer.style.backdropFilter = "blur(20px)";
				checkboxContainer.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.3)";
				
				funcoes.forEach((funcao, index) => {
					const checkboxId = `funcao_${index}`;
					
					const itemWrapper = document.createElement("label");
					itemWrapper.htmlFor = checkboxId;
					itemWrapper.style.display = "flex";
					itemWrapper.style.alignItems = "center";
					itemWrapper.style.gap = "12px";
					itemWrapper.style.fontSize = "15px";
					itemWrapper.style.fontWeight = "500";
					itemWrapper.style.color = "#065f23";
					itemWrapper.style.cursor = "pointer";
					itemWrapper.style.userSelect = "none";
					itemWrapper.style.background = "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)";
					itemWrapper.style.padding = "16px 20px";
					itemWrapper.style.borderRadius = "12px";
					itemWrapper.style.border = "2px solid rgba(52, 211, 153, 0.3)";
					itemWrapper.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
					itemWrapper.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
					itemWrapper.style.position = "relative";
					itemWrapper.style.overflow = "hidden";
					
					const shimmer = document.createElement("div");
					shimmer.style.position = "absolute";
					shimmer.style.top = "0";
					shimmer.style.left = "-100%";
					shimmer.style.width = "100%";
					shimmer.style.height = "100%";
					shimmer.style.background = "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)";
					shimmer.style.transition = "left 0.6s ease";
					itemWrapper.appendChild(shimmer);
					
					itemWrapper.onmouseover = () => {
						itemWrapper.style.background = "linear-gradient(135deg, #10b981 0%, #34d399 100%)";
						itemWrapper.style.color = "white";
						itemWrapper.style.transform = "translateY(-3px) scale(1.02)";
						itemWrapper.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.3)";
						itemWrapper.style.borderColor = "transparent";
						shimmer.style.left = "100%";
					};
					itemWrapper.onmouseout = () => {
						itemWrapper.style.background = "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)";
						itemWrapper.style.color = "#065f23";
						itemWrapper.style.transform = "translateY(0) scale(1)";
						itemWrapper.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
						itemWrapper.style.borderColor = "rgba(52, 211, 153, 0.3)";
						shimmer.style.left = "-100%";
					};
					
					const checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.id = checkboxId;
					checkbox.name = "funcoes_ministerio[]";
					checkbox.value = funcao;
					checkbox.style.transform = "scale(1.3)";
					checkbox.style.cursor = "pointer";
					checkbox.style.accentColor = "#10b981";
					
					const labelText = document.createTextNode(funcao);
					
					itemWrapper.appendChild(checkbox);
					itemWrapper.appendChild(labelText);
					checkboxContainer.appendChild(itemWrapper);
				});
				
				wrapper.appendChild(checkboxContainer);
				container.appendChild(wrapper);
			}
			
			function toggleFields() {
				const tipo = document.getElementById("tipo_funcao").value;
				const ministerio = document.getElementById("ministerio").value;
				const conclusaoBox = document.getElementById("ministro_conclusao");
				const justificativaBox = document.getElementById("ministro_justificativa");
				
				conclusaoBox.style.display = "none";
				justificativaBox.style.display = "none";
				document.getElementById("funcoes_checkbox_wrapper")?.remove();
				
				if (tipo === "Conclusão") {
					conclusaoBox.style.display = "block";
					mostrarCheckboxes(ministerio);
					} else if (tipo === "Justificativa") {
					justificativaBox.style.display = "block";
				}
				document.getElementById("container-ministerio-select").style.display = "none";
			}
			
			document.addEventListener("DOMContentLoaded", function () {
				const tipoFuncao = document.getElementById("tipo_funcao");
				const funcaoJustificada = document.querySelector('#ministro_justificativa #atividade_justificada');
				const containerMinisterio = document.getElementById("container-ministerio-select");
				
				funcaoJustificada.addEventListener("change", function () {
					if (funcaoJustificada.value === "funcao-ministerial") {
						containerMinisterio.style.display = "block";
						} else {
						containerMinisterio.style.display = "none";
					}
				});
			});
			
			document.getElementById("ministerio").addEventListener("change", function () {
				toggleFields();
			});
			
			
			function mostrarLinksMinisterio(ministerio, nomeExibido) {
				document.getElementById('submenu-ministerios').style.display = 'none';
				document.getElementById('botao-voltar').style.display = 'block';
				document.getElementById('titulo-ministerio').textContent = nomeExibido;
				
				const ids = ['atualizacao', 'seguranca', 'administracao', 'contabilidade', 'financas', 'documentacao', 'assistencia'];
				ids.forEach(id => {
					const el = document.getElementById('links-' + id);
					if (el) el.style.display = (id === ministerio) ? 'flex' : 'none';
				});
			}
			
			function voltarAoMenu() {
				document.getElementById('submenu-ministerios').style.display = 'flex';
				document.getElementById('botao-voltar').style.display = 'none';
				document.getElementById('titulo-ministerio').textContent = 'Selecione o Ministério';
				
				const ids = ['atualizacao', 'seguranca', 'administracao', 'contabilidade', 'financas', 'documentacao', 'assistencia'];
				ids.forEach(id => {
					const el = document.getElementById('links-' + id);
					if (el) el.style.display = 'none';
				});
			}
			
			function esconderTodosOsLinksMinisterios() {
				const ids = ['atualizacao', 'seguranca', 'administracao', 'contabilidade', 'financas', 'documentacao', 'assistencia'];
				ids.forEach(id => {
					const el = document.getElementById('links-' + id);
					if (el) el.style.display = 'none';
				});
				
				const botaoVoltar = document.getElementById('botao-voltar');
				if (botaoVoltar) botaoVoltar.style.display = 'none';
				
				const titulo = document.getElementById('titulo-ministerio');
				if (titulo) titulo.textContent = 'Selecione o Ministério';
			}
			
			
			
			function mostrarFormularioFuncao() {
				if (document.getElementById('popup-funcao')) return;
				mostrarPopupSelecaoFuncao();
			}

			function mostrarPopupSelecaoFuncao() {
				const popupHTML = `
					<div class="popup-overlay" id="popup-funcao">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-funcao')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">📋 Função</h2>
								<p class="popup-subtitle">Selecione o tipo de função que deseja processar</p>
							</div>
							<div class="type-selection-grid">
								<div class="type-option" onclick="selecionarTipoFuncao('conclusao')">
									<div class="type-option-title">✅ Conclusão de Função</div>
									<div class="type-option-description">Reportar a conclusão de uma função ministerial realizada</div>
								</div>
								<div class="type-option" onclick="selecionarTipoFuncao('justificativa')">
									<div class="type-option-title">📝 Justificativa de Função</div>
									<div class="type-option-description">Justificar uma função não realizada ou com problemas</div>
								</div>
							</div>
						</div>
					</div>
				`;


				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function selecionarTipoFuncao(tipo) {
				fecharPopup('popup-funcao');
				
				if (tipo === 'conclusao') {
					mostrarFormularioConclusao();
				} else if (tipo === 'justificativa') {
					mostrarFormularioJustificativa();
				}
			}

			function mostrarFormularioConclusao() {
				const popupHTML = `
					<div class="popup-overlay" id="popup-conclusao">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-conclusao')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">✅ Conclusão de Função</h2>
								<p class="popup-subtitle">Preencha os dados da função concluída</p>
							</div>
							<form class="popup-form" id="form-conclusao" onsubmit="enviarConclusao(event)">
								<div class="input-box">
									<span class="details_span">Seu nick:</span>
									<input type="text" name="nickname_membro2" placeholder="Digite seu nome" required>
								</div>
								
								<div class="input-box">
									<span class="details_span">Ministério:</span>
									<select name="ministerio" id="ministerio-conclusao" onchange="atualizarFuncoesMinisterio(this.value)" required>
										<option value="">Selecione...</option>
										<option value="Ministério da Administração">Ministério da Administração</option>
										<option value="Ministério da Assistência">Ministério da Assistência</option>
										<option value="Ministério da Atualização">Ministério da Atualização</option>
										<option value="Ministério da Contabilidade">Ministério da Contabilidade</option>
										<option value="Ministério da Documentação">Ministério da Documentação</option>
										<option value="Ministério das Finanças">Ministério das Finanças</option>
										<option value="Ministério da Segurança">Ministério da Segurança</option>
									</select>
								</div>
								
								<div class="input-box" id="funcoes-ministerio-container" style="display: none;">
									<span class="details_span">Funções Realizadas:</span>
									<div class="checkbox-group" id="funcoes-checkbox-group">
										<!-- As funções serão inseridas dinamicamente aqui -->
									</div>
								</div>
								
								<div class="input-box">
									<span class="details_span">Ordem da Função (Ex: A8):</span>
									<input type="text" name="ordem_funcao" placeholder="Ordem da Função" required>
								</div>
								
								<div class="input-box">
									<span class="details_span">Data da Função:</span>
									<input type="date" name="data_funcao_conclusao" required>
								</div>
								
								<div class="popup-buttons">
									<button type="button" class="popup-btn popup-btn-cancel" onclick="fecharPopup('popup-conclusao')">Cancelar</button>
									<button type="submit" class="popup-btn popup-btn-submit">Enviar Conclusão</button>
								</div>
							</form>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function mostrarFormularioJustificativa() {
				const popupHTML = `
					<div class="popup-overlay" id="popup-justificativa">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-justificativa')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">📝 Justificativa de Função</h2>
								<p class="popup-subtitle">Preencha os dados da justificativa</p>
							</div>
							<form class="popup-form" id="form-justificativa" onsubmit="enviarJustificativa(event)">
								<div class="input-box">
									<span class="details_span">Seu nick:</span>
									<input type="text" name="nickname_membro2" placeholder="Digite seu nome" required>
								</div>
								
								<div class="input-box">
									<span class="details_span">Função Justificada:</span>
									<select name="atividade_justificada" onchange="toggleMinisterioJustificativa(this.value)" required>
										<option value="">Selecione...</option>
										<option value="funcao-ministerial">Função Ministerial</option>
										<option value="analise-de-promocoes">Análise de Promoções</option>
										<option value="avaliacao-de-projetos">Avaliação de Projetos</option>
										<option value="reuniao-ministerial">Reunião Ministerial</option>
									</select>
								</div>
								
								<div class="input-box" id="ministerio-justificativa-box" style="display: none;">
									<span class="details_span">Ministério:</span>
									<select name="ministerio_justificativa">
										<option value="">Selecione...</option>
										<option value="Ministério da Administração">Ministério da Administração</option>
										<option value="Ministério da Assistência">Ministério da Assistência</option>
										<option value="Ministério da Atualização">Ministério da Atualização</option>
										<option value="Ministério da Contabilidade">Ministério da Contabilidade</option>
										<option value="Ministério da Documentação">Ministério da Documentação</option>
										<option value="Ministério das Finanças">Ministério das Finanças</option>
										<option value="Ministério da Segurança">Ministério da Segurança</option>
									</select>
								</div>
								
								<div class="input-box">
									<span class="details_span">Data da Função:</span>
									<input type="date" name="data_funcao_justificativa" required>
								</div>
								
								<div class="input-box">
									<span class="details_span">Motivo da Justificativa:</span>
									<textarea name="motivo_justificativa" placeholder="Descreva o motivo da justificativa" required></textarea>
								</div>
								
								<div class="popup-buttons">
									<button type="button" class="popup-btn popup-btn-cancel" onclick="fecharPopup('popup-justificativa')">Cancelar</button>
									<button type="submit" class="popup-btn popup-btn-submit">Enviar Justificativa</button>
								</div>
							</form>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function toggleMinisterioJustificativa(valor) {
				const ministerioBox = document.getElementById('ministerio-justificativa-box');
				if (valor === 'funcao-ministerial') {
					ministerioBox.style.display = 'block';
				} else {
					ministerioBox.style.display = 'none';
				}
			}

			function atualizarFuncoesMinisterio(ministerio) {
				const container = document.getElementById('funcoes-ministerio-container');
				const checkboxGroup = document.getElementById('funcoes-checkbox-group');
				
				if (!ministerio) {
					container.style.display = 'none';
					return;
				}
				
				const funcoes = opcoesPorMinisterio[ministerio] || [];
				checkboxGroup.innerHTML = '';
				
				funcoes.forEach((funcao, index) => {
					const checkboxItem = document.createElement('div');
					checkboxItem.className = 'checkbox-item';
					checkboxItem.innerHTML = `
						<input type="checkbox" id="funcao_${index}" name="funcoes_realizadas" value="${funcao}">
						<label for="funcao_${index}">${funcao}</label>
					`;
					checkboxGroup.appendChild(checkboxItem);
				});
				
				container.style.display = 'block';
			}

			function mostrarPopupManuais() {
				if (document.getElementById('popup-manuais')) return;
				
				const popupHTML = `
					<div class="popup-overlay" id="popup-manuais">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-manuais')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">📚 Manuais de Funções</h2>
								<p class="popup-subtitle">Selecione um ministério para acessar seus recursos</p>
							</div>
							<div id="ministerios-grid" class="popup-links-grid">
								<button onclick="mostrarLinksMinisterioManual('atualizacao', 'Atualização')" class="popup-link-item">📋 Atualização</button>
								<button onclick="mostrarLinksMinisterioManual('seguranca', 'Segurança')" class="popup-link-item">🛡️ Segurança</button>
								<button onclick="mostrarLinksMinisterioManual('administracao', 'Administração')" class="popup-link-item">⚙️ Administração</button>
								<button onclick="mostrarLinksMinisterioManual('contabilidade', 'Contabilidade')" class="popup-link-item">💰 Contabilidade</button>
								<button onclick="mostrarLinksMinisterioManual('financas', 'Finanças')" class="popup-link-item">💳 Finanças</button>
								<button onclick="mostrarLinksMinisterioManual('documentacao', 'Documentação')" class="popup-link-item">📄 Documentação</button>
								<button onclick="mostrarLinksMinisterioManual('assistencia', 'Assistência')" class="popup-link-item">🤝 Assistência</button>
							</div>
							<div id="links-ministerio" class="popup-links-content" style="display: none;">
								<button onclick="voltarMinisterios()" class="voltar-btn">← Voltar aos Ministérios</button>
								<h3 id="ministerio-titulo"></h3>
								<div id="links-lista" class="popup-links-grid"></div>
							</div>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function mostrarLinksMinisterioManual(ministerio, nome) {
				document.getElementById('ministerios-grid').style.display = 'none';
				document.getElementById('links-ministerio').style.display = 'block';
				document.getElementById('ministerio-titulo').textContent = nome;
				
				const linksData = {
					'atualizacao': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t37188-atualizacao-manual-de-funcao' },
						{ titulo: '📋 Requerimentos Pendentes', url: 'https://www.policiarcc.com/t34790-sup-requerimentos-da-companhia' },
						{ titulo: '📊 Planilha Automática', url: 'https://docs.google.com/spreadsheets/d/1Rl4Gw736n5lj5cf7XYXkcj2vrZMLV2yoS4fQ9E5eBsA/edit?hl=pt-br#gid=0' }
					],
					'seguranca': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t37190-seguranca-manual-de-funcao' },
						{ titulo: '🧹 Planilha de Limpeza', url: 'https://docs.google.com/spreadsheets/d/14G0tR99X7oMQEWtwCFJaZu0YZufmrNivrU4YnlAM7cI/edit?gid=379257698#gid=379257698' },
						{ titulo: '👥 Listagem de Membros', url: 'https://www.policiarcc.com/t25268-sup-listagem-de-membros' },
						{ titulo: '📋 Requerimentos', url: 'https://www.policiarcc.com/t34790-sup-requerimentos-da-companhia' },
						{ titulo: '🏅 Cofre de Medalhas', url: 'https://www.policiarcc.com/t36744-af-supervisores' }
					],
					'administracao': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t27420-administracao-manual-de-funcao' },
						{ titulo: '💻 RCCSystem', url: 'https://system.policercc.com.br/companhia/supervisores' },
						{ titulo: '📊 Planilha de Relatório de Aplicações', url: 'https://docs.google.com/spreadsheets/d/15olIMB0HWvA36xvliBX4_eR_JIxOkL19rZ07Rtx0D6o/edit#gid=1556351985' }
					],
					'contabilidade': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t37187-contabilidade-manual-de-funcao' },
						{ titulo: '📊 Planilha das Porcentagens Automáticas', url: 'https://docs.google.com/spreadsheets/d/1dz4KvtHTNj2itUMZJTv2UgQnxx1NTseqVqsTn-11PnY/edit#gid=1058101537' },
						{ titulo: '📈 Consulta de Eficiência', url: 'https://www.policiarcc.com/f894-sup-desempenhos' },
						{ titulo: '📋 Requerimento de Membros', url: 'https://www.policiarcc.com/t34790-sup-requerimentos-da-companhia' },
						{ titulo: '🏅 Cofre de Medalhas', url: 'https://www.policiarcc.com/t36744-af-supervisores' },
						{ titulo: '🏆 Quadro de Honras', url: 'https://docs.google.com/spreadsheets/d/1MCfHXkBUjx19Mz6wW8em5PXquV1dWvv6P_wgLDUlTE4/edit#gid=1006554126' },
						{ titulo: '  Escala Semanal - Tutores', url: 'https://docs.google.com/spreadsheets/d/1fhassUiZr_f8G2N_gkO3lxfHU5rhwE7Di1_fiSZF4Fo/edit#gid=1926902001' },
						{ titulo: '📅 Escala Semanal - Fiscalizadores', url: 'https://docs.google.com/spreadsheets/d/1rxx0ED76IOi1HOfhz698-EQcRg9lj2b0f6C94aeZZlI/edit?pli=1#gid=1190185877' }
					],
					'financas': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t37189-financas-manual-de-funcao' },
						{ titulo: '📊 Planilha das Medalhas Automáticas', url: 'https://docs.google.com/spreadsheets/d/1dz4KvtHTNj2itUMZJTv2UgQnxx1NTseqVqsTn-11PnY/edit#gid=1058101537' },
						{ titulo: '🏅 Cofre de Medalhas', url: 'https://www.policiarcc.com/t36744-af-supervisores' },
						{ titulo: '📈 Consulta de Eficiência', url: 'https://www.policiarcc.com/f894-sup-desempenhos' }
					],
					'documentacao': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t37393-documentacao-manual-de-funcao' },
						{ titulo: '📝 Planilha de Correções', url: 'https://docs.google.com/spreadsheets/d/1S1oWIxFfWSQYVOKQg0zun1Nawt10M5H82LzkIOEEF_o/edit#gid=0' },
						{ titulo: '📞 Ouvidoria', url: 'https://www.policiarcc.com/t35403-sup-ouvidoria' },
						{ titulo: '💻 RCCSystem', url: 'https://system.policercc.com.br/requerimentos/gratificacoes_efetivas' }
					],
					'assistencia': [
						{ titulo: '📖 Manual da Função', url: 'https://www.policiarcc.com/t38075-assistencia-manual-de-funcao' },
						{ titulo: '📋 Formulário de Registro do Ranking Interno', url: 'https://docs.google.com/forms/d/e/1FAIpQLScEahjIb8dBbbY11Ca4jJUS1LdPAdiMTSRT85vbpRp8IHHjFA/viewform' },
						{ titulo: '🏆 Consulta do Ranking Interno', url: 'https://docs.google.com/spreadsheets/d/1NmIyqCqBQtiUlkMC8U_utD2OBG7nlsss8utVQblz0eM/edit?gid=1269532343#gid=1269532343' },
						{ titulo: '⚠️ Quadro de Advertências da Companhia', url: 'https://www.policiarcc.com/t35859-sup-quadro-de-advertencias' },
						{ titulo: '📋 Consulta de Advertências', url: 'https://docs.google.com/spreadsheets/d/1KT7-35Oktt0vl7yx2pLVKWlI9QVs8dQ2wupkxID9Uos/edit?gid=893367164#gid=893367164' }
					]
				};
				
				const linksLista = document.getElementById('links-lista');
				linksLista.innerHTML = '';
				
				if (linksData[ministerio]) {
					linksData[ministerio].forEach(link => {
						const linkElement = document.createElement('a');
						linkElement.href = link.url;
						linkElement.target = '_blank';
						linkElement.className = 'popup-link-item';
						linkElement.textContent = link.titulo;
						linksLista.appendChild(linkElement);
					});
				}
			}

			function voltarMinisterios() {
				document.getElementById('links-ministerio').style.display = 'none';
				document.getElementById('ministerios-grid').style.display = 'grid';
			}

			function mostrarPopupLinksUteis() {
				if (document.getElementById('popup-links-uteis')) return;
				
				const popupHTML = `
					<div class="popup-overlay" id="popup-links-uteis">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-links-uteis')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">🔗 Links Úteis</h2>
								<p class="popup-subtitle">Acesse ferramentas e recursos importantes</p>
							</div>
							<div class="popup-links-grid">
                                <a href="https://docs.google.com/spreadsheets/d/1sbaXmIhv0RLJInS3KWTrxWJkTYar9R4sxM-gaDD54ac/edit?gid=202936049" target="_blank" class="popup-link-item">📝 Avaliação de Promoções</a>
                                <a href="https://docs.google.com/spreadsheets/d/1r5nFyw_LrLo3AVd6W49RrYyiD5mxlgFTaHc5-ItQ48c/edit?gid=506185383" target="_blank" class="popup-link-item">✍ Avaliações de Projetos</a>
								<a href="https://www.policiarcc.com/t35859-sup-quadro-de-advertencias" target="_blank" class="popup-link-item">⚠️ Quadro de Advertências</a>
								<a href="https://docs.google.com/forms/d/e/1FAIpQLScEahjIb8dBbbY11Ca4jJUS1LdPAdiMTSRT85vbpRp8IHHjFA/viewform" target="_blank" class="popup-link-item">📊 Formulário Ranking Interno</a>
								<a href="https://docs.google.com/spreadsheets/d/1NmIyqCqBQtiUlkMC8U_utD2OBG7nlsss8utVQblz0eM/edit?gid=1269532343#gid=1269532343" target="_blank" class="popup-link-item">🏆 Consulta Ranking Interno</a>
								<a href="https://docs.google.com/spreadsheets/d/1KT7-35Oktt0vl7yx2pLVKWlI9QVs8dQ2wupkxID9Uos/edit?gid=893367164#gid=893367164" target="_blank" class="popup-link-item">📋 Consulta de Advertências</a>
								<a href="https://www.policiarcc.com/f894-sup-desempenhos" target="_blank" class="popup-link-item">📈 Consulta de Eficiência</a>
								<a href="https://www.policiarcc.com/t36744-af-supervisores" target="_blank" class="popup-link-item">🏅 Cofre de Medalhas</a>

							</div>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function mostrarFormularioMP() {
				if (document.getElementById('popup-mp')) return;
				mostrarPopupSelecaoMP();
			}

			function mostrarPopupSelecaoMP() {
				const popupHTML = `
					<div class="popup-overlay" id="popup-mp">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-mp')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">📩 Notificações (MP)</h2>
								<p class="popup-subtitle">Selecione o tipo de mensagem que deseja enviar</p>
							</div>
							<div class="type-selection-grid">
								<div class="type-option" onclick="selecionarTipoMP('carta_adv')">
									<div class="type-option-title">⚠️ Advertência Verbal</div>
									<div class="type-option-description">Enviar advertência verbal por comportamento inadequado</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_10')">
									<div class="type-option-title">🏅 Carta de Infração -10 medalhas</div>
									<div class="type-option-description">Aplicar punição de -10 medalhas por infração</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_advint')">
									<div class="type-option-title">📄 Advertência Interna</div>
									<div class="type-option-description">Advertência escrita interna para registro</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_r')">
									<div class="type-option-title">⬇️ Carta de Rebaixamento</div>
									<div class="type-option-description">Notificar rebaixamento de cargo por infração grave</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_exp')">
									<div class="type-option-title">❌ Carta de Expulsão</div>
									<div class="type-option-description">Notificar expulsão da companhia</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('promocoes')">
									<div class="type-option-title">⬆️ Cartas de Promoção</div>
									<div class="type-option-description">Notificar promoção para cargo superior</div>
								</div>
							</div>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}
			function selecionarTipoMP(tipo) {
				fecharPopup('popup-mp');
				
				if (tipo === 'promocoes') {
					mostrarSubtiposPromocao();
				} else {
					mostrarFormularioMP_Tipo(tipo);
				}
			}

			function mostrarSubtiposPromocao() {
				const popupHTML = `
					<div class="popup-overlay" id="popup-promocoes">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-promocoes')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">⬆️ Cartas de Promoção</h2>
								<p class="popup-subtitle">Selecione o tipo de promoção</p>
							</div>
							<div class="type-selection-grid">
								<div class="type-option" onclick="selecionarTipoMP('carta_promo1')">
									<div class="type-option-title">Supervisor → Tutor</div>
									<div class="type-option-description">Promoção de Supervisor para Tutor</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_promo2')">
									<div class="type-option-title">Tutor → Fiscalizador</div>
									<div class="type-option-description">Promoção de Tutor para Fiscalizador</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_promo3')">
									<div class="type-option-title">Fiscalizador → Graduador</div>
									<div class="type-option-description">Promoção de Fiscalizador para Graduador</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_promo4')">
									<div class="type-option-title">Graduador → Estagiário</div>
									<div class="type-option-description">Promoção de Graduador para Estagiário</div>
								</div>
								<div class="type-option" onclick="selecionarTipoMP('carta_promo5')">
									<div class="type-option-title">Estagiário → Ministro</div>
									<div class="type-option-description">Promoção de Estagiário para Ministro</div>
								</div>
							</div>
							<div class="popup-buttons">
								<button type="button" class="popup-btn popup-btn-cancel" onclick="voltarParaMP()">← Voltar</button>
							</div>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function voltarParaMP() {
				console.log('Voltando para MP...');
				fecharPopup('popup-promocoes');
				mostrarPopupSelecaoMP();
			}

			function mostrarFormularioMP_Tipo(tipo) {
				const tiposData = {
					'carta_adv': {
						titulo: '⚠️ Advertência Verbal',
						subtitulo: 'Preencha os dados da advertência verbal',
						campos: ['nome', 'infracao', 'consideracoes', 'provas']
					},
					'carta_10': {
						titulo: '🏅 Carta de Infração -10 medalhas',
						subtitulo: 'Preencha os dados da infração',
						campos: ['nome', 'infracao', 'consideracoes', 'provas']
					},
					'carta_advint': {
						titulo: '📄 Advertência Interna',
						subtitulo: 'Preencha os dados da advertência interna',
						campos: ['nome', 'infracao', 'consideracoes', 'provas']
					},
					'carta_r': {
						titulo: '⬇️ Carta de Rebaixamento',
						subtitulo: 'Preencha os dados do rebaixamento',
						campos: ['nome', 'infracao', 'consideracoes', 'provas']
					},
					'carta_exp': {
						titulo: '❌ Carta de Expulsão',
						subtitulo: 'Preencha os dados da expulsão',
						campos: ['nome', 'infracao', 'consideracoes', 'provas']
					},
					'carta_promo1': {
						titulo: '⬆️ Promoção: Supervisor → Tutor',
						subtitulo: 'Preencha os dados da promoção',
						campos: ['nome']
					},
					'carta_promo2': {
						titulo: '⬆️ Promoção: Tutor → Fiscalizador',
						subtitulo: 'Preencha os dados da promoção',
						campos: ['nome']
					},
					'carta_promo3': {
						titulo: '⬆️ Promoção: Fiscalizador → Graduador',
						subtitulo: 'Preencha os dados da promoção',
						campos: ['nome']
					},
					'carta_promo4': {
						titulo: '⬆️ Promoção: Graduador → Estagiário',
						subtitulo: 'Preencha os dados da promoção',
						campos: ['nome']
					},
					'carta_promo5': {
						titulo: '⬆️ Promoção: Estagiário → Ministro',
						subtitulo: 'Preencha os dados da promoção',
						campos: ['nome']
					}
				};

				const tipoInfo = tiposData[tipo];
				if (!tipoInfo) return;

				let camposHTML = '';
				
				if (tipoInfo.campos.includes('nome')) {
					const label = tipo.includes('promo') ? 'Nome do Promovido:' : 'Nome do Infrator:';
					camposHTML += `
						<div class="input-box">
							<span class="details_span">${label}</span>
							<input type="text" name="nome" placeholder="Digite o nick" required>
						</div>
					`;
				}
				
				if (tipoInfo.campos.includes('infracao')) {
					camposHTML += `
						<div class="input-box">
							<span class="details_span">Infração:</span>
							<textarea name="infracao" placeholder="Descreva a infração" required></textarea>
						</div>
					`;
				}
				
				if (tipoInfo.campos.includes('consideracoes')) {
					camposHTML += `
						<div class="input-box">
							<span class="details_span">Considerações:</span>
							<textarea name="consideracoes" placeholder="Inclua observações relevantes" required></textarea>
						</div>
					`;
				}
				
				if (tipoInfo.campos.includes('provas')) {
					camposHTML += `
						<div class="input-box">
							<span class="details_span">Provas:</span>
							<input type="text" name="provas" placeholder="Insira o link das provas" required>
						</div>
					`;
				}

				const popupHTML = `
					<div class="popup-overlay" id="popup-mp-form">
						<div class="popup-container">
							<button class="popup-close" onclick="fecharPopup('popup-mp-form')">&times;</button>
							<div class="popup-header">
								<h2 class="popup-title">${tipoInfo.titulo}</h2>
								<p class="popup-subtitle">${tipoInfo.subtitulo}</p>
							</div>
							<form class="popup-form" id="form-mp-${tipo}" onsubmit="enviarMP_Popup(event, '${tipo}')">
								${camposHTML}
								<div class="popup-buttons">
									<button type="button" class="popup-btn popup-btn-cancel" onclick="voltarParaSelecaoMP()">← Voltar</button>
									<button type="submit" class="popup-btn popup-btn-submit">Enviar MP</button>
								</div>
							</form>
						</div>
					</div>
				`;
				
				document.body.insertAdjacentHTML('beforeend', popupHTML);
			}

			function voltarParaSelecaoMP() {
				console.log('Voltando para seleção MP...');
				fecharPopup('popup-mp-form');
				mostrarPopupSelecaoMP();
			}

			function fecharPopup(popupId) {
				console.log('Fechando popup:', popupId);
				const popup = document.getElementById(popupId);
				if (popup) {
					popup.style.animation = 'fadeInOverlay 0.3s ease-out reverse';
					setTimeout(() => {
						popup.remove();
					}, 300);
				}
			}

			function mostrarLoadingEnvio() {
				const loadingHTML = `
					<div class="popup-overlay" id="loading-envio">
						<div class="popup-container" style="text-align: center; max-width: 400px;">
							<div class="popup-header">
								<h2 class="popup-title">📤 Enviando...</h2>
								<p class="popup-subtitle">Aguarde enquanto processamos sua solicitação</p>
							</div>
							<div style="padding: 20px;">
								<div style="display: inline-block; width: 40px; height: 40px; border: 4px solid rgba(108, 210, 78, 0.3); border-radius: 50%; border-top-color: #6CD24E; animation: spin 1s ease-in-out infinite;"></div>
							</div>
						</div>
					</div>
					<style>
						@keyframes spin {
							to { transform: rotate(360deg); }
						}
					</style>
				`;
				document.body.insertAdjacentHTML('beforeend', loadingHTML);
			}

			function fecharLoadingEnvio() {
				const loading = document.getElementById('loading-envio');
				if (loading) {
					loading.remove();
				}
			}

			function mostrarSucessoEnvio(mensagem, link) {
				const sucessoHTML = `
					<div class="popup-overlay" id="sucesso-envio">
						<div class="popup-container" style="text-align: center; max-width: 500px;">
							<div class="popup-header">
								<h2 class="popup-title">✅ Sucesso!</h2>
								<p class="popup-subtitle">${mensagem}</p>
							</div>
							<div style="display: flex; justify-content: center; gap: 15px; margin-top: 20px;">
								<button type="button" class="popup-btn popup-btn-submit" onclick="window.open('${link}', '_blank'); fecharPopup('sucesso-envio')">Ver Planilha</button>
								<button type="button" class="popup-btn popup-btn-cancel" onclick="fecharPopup('sucesso-envio')">Fechar</button>
							</div>
						</div>
					</div>
				`;
				document.body.insertAdjacentHTML('beforeend', sucessoHTML);
			}

			function mostrarErroEnvio(mensagem) {
				const erroHTML = `
					<div class="popup-overlay" id="erro-envio">
						<div class="popup-container" style="text-align: center; max-width: 500px;">
							<div class="popup-header">
								<h2 class="popup-title" style="color: #dc2626;">❌ Erro!</h2>
								<p class="popup-subtitle">${mensagem}</p>
							</div>
							<div style="display: flex; justify-content: center; margin-top: 20px;">
								<button type="button" class="popup-btn popup-btn-cancel" onclick="fecharPopup('erro-envio')">Fechar</button>
							</div>
						</div>
					</div>
				`;
				document.body.insertAdjacentHTML('beforeend', erroHTML);
			}

			function enviarConclusao(event) {
				console.log('Enviando conclusão...');
				event.preventDefault();
				mostrarLoadingEnvio();
				
				const formData = new FormData(event.target);
				formData.append('tipo_funcao', 'Conclusão');
				
				fetch('https://script.google.com/macros/s/AKfycbwjjTpkIvBtxVD4rBG325hqPRpLEuh-bni_C3Shb_Ls6_nNfaCTMGdu_-QnSUSxntLJ/exec', {
					method: 'POST',
					body: formData
				})
				.then(() => {
					fecharLoadingEnvio();
					fecharPopup('popup-conclusao');
					mostrarSucessoEnvio('Conclusão de função enviada com sucesso!', 'https://www.policiarcc.com/h262-sup-escala-ministerial');
				})
				.catch(error => {
					fecharLoadingEnvio();
					mostrarErroEnvio("Erro ao enviar: " + error.message);
				});
			}

			function enviarJustificativa(event) {
				event.preventDefault();
				mostrarLoadingEnvio();
				
				const formData = new FormData(event.target);
				formData.append('tipo_funcao', 'Justificativa');
				
				fetch('https://script.google.com/macros/s/AKfycbwjjTpkIvBtxVD4rBG325hqPRpLEuh-bni_C3Shb_Ls6_nNfaCTMGdu_-QnSUSxntLJ/exec', {
					method: 'POST',
					body: formData
				})
				.then(() => {
					fecharLoadingEnvio();
					fecharPopup('popup-justificativa');
					mostrarSucessoEnvio('Justificativa de função enviada com sucesso!', 'https://www.policiarcc.com/h262-sup-escala-ministerial');
				})
				.catch(error => {
					fecharLoadingEnvio();
					mostrarErroEnvio("Erro ao enviar: " + error.message);
				});
			}

			function enviarMP_Popup(event, tipo) {
				event.preventDefault();
				
				const formData = new FormData(event.target);
				const dados = {
					tipo: tipo,
					nome: formData.get('nome'),
					infracao: formData.get('infracao') || '',
					consideracoes: formData.get('consideracoes') || '',
					provas: formData.get('provas') || ''
				};
				
				fecharPopup('popup-mp-form');
				processarEnvioMP(dados, tipo);
			}
			
			function mostrarCarregamentoDragao() {
				const dragaoCarregamento = document.createElement('div');
				dragaoCarregamento.id = 'dragaoCarregamento';
				dragaoCarregamento.innerHTML = `
					<div style="
						position: fixed;
						top: 0;
						left: 0;
						width: 100vw;
						height: 100vh;
						background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(12, 65, 22, 0.9) 100%);
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						z-index: 9999;
						backdrop-filter: blur(25px);
						">
						<div style="
							background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
							border-radius: 25px;
							padding: 50px;
							text-align: center;
							border: 2px solid rgba(108, 210, 78, 0.3);
							box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
							backdrop-filter: blur(20px);
							">
							<img src="https://i.imgur.com/CVFDkiX.png" style="width: 180px; margin-bottom: 25px; animation: bounce 2s infinite;">
							<h2 style="
								color: #6CD24E;
								font-size: 24px;
								font-weight: 700;
								margin: 0 0 15px 0;
								text-shadow: 0 2px 10px rgba(108, 210, 78, 0.5);
								">📤 Enviando Mensagem...</h2>
							<p style="
								color: #ffffff;
								font-size: 16px;
								font-weight: 500;
								margin: 0;
								opacity: 0.9;
								">Aguarde enquanto processamos sua solicitação</p>
							<div style="
								margin-top: 30px;
								display: flex;
								justify-content: center;
								">
								<div style="
									width: 50px;
									height: 50px;
									border: 4px solid rgba(108, 210, 78, 0.3);
									border-radius: 50%;
									border-top-color: #6CD24E;
									animation: spin 1s linear infinite;
									"></div>
							</div>
						</div>
					</div>
					<style>
						@keyframes spin {
							0% { transform: rotate(0deg); }
							100% { transform: rotate(360deg); }
						}
						@keyframes bounce {
							0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
							40% { transform: translateY(-10px); }
							60% { transform: translateY(-5px); }
						}
					</style>
				`;
				document.body.appendChild(dragaoCarregamento);
			}
			
			function mostrarPopupSucesso() {
				const popup = document.createElement('div');
				popup.id = 'popup-sucesso-mp';
				popup.innerHTML = `
					<div style="
						position: fixed;
						top: 0;
						left: 0;
						width: 100vw;
						height: 100vh;
						background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(12, 65, 22, 0.8) 100%);
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 9999;
						backdrop-filter: blur(20px);
						animation: fadeInOverlay 0.5s ease-out;
						">
						<div style="
							background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
							color: #065f23;
							padding: 40px;
							border-radius: 20px;
							text-align: center;
							max-width: 90%;
							width: 450px;
							box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
							border: 2px solid rgba(52, 211, 153, 0.3);
							position: relative;
							overflow: hidden;
							animation: slideInPopup 0.5s ease-out;
							">
							<div style="
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								height: 4px;
								background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
								"></div>
							<h2 style="
								margin-top: 0;
								margin-bottom: 20px;
								font-size: 24px;
								font-weight: 700;
								color: #065f23;
								">📩 MP Enviada com Sucesso!</h2>
							<p style="
								margin-bottom: 30px;
								font-size: 16px;
								color: #374151;
								line-height: 1.5;
								">Deseja enviar outra mensagem?</p>
							<div style="
								margin-top: 25px;
								display: flex;
								justify-content: center;
								gap: 20px;
								">
								<button id="btnSim" style="
									padding: 14px 28px;
									background: linear-gradient(135deg, #10b981 0%, #059669 100%);
									border: none;
									border-radius: 12px;
									cursor: pointer;
									font-weight: 600;
									font-size: 15px;
									color: white;
									transition: all 0.3s ease;
									box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
									">✓ Sim, enviar outra</button>
								<button id="btnNao" style="
									padding: 14px 28px;
									background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
									border: none;
									border-radius: 12px;
									cursor: pointer;
									font-weight: 600;
									font-size: 15px;
									color: white;
									transition: all 0.3s ease;
									box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
									">📂 Ver caixa de saída</button>
							</div>
						</div>
					</div>
				`;
				
				document.body.appendChild(popup);
				
				document.getElementById('btnSim').addEventListener('click', () => {
					popup.remove();
					mostrarPopupSelecaoMP();
				});
				
				document.getElementById('btnNao').addEventListener('click', () => {
					window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox';
				});
				
				const btnSim = document.getElementById('btnSim');
				const btnNao = document.getElementById('btnNao');
				
				btnSim.onmouseover = () => {
					btnSim.style.transform = 'translateY(-2px) scale(1.05)';
					btnSim.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.4)';
				};
				btnSim.onmouseout = () => {
					btnSim.style.transform = 'translateY(0) scale(1)';
					btnSim.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
				};
				
				btnNao.onmouseover = () => {
					btnNao.style.transform = 'translateY(-2px) scale(1.05)';
					btnNao.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.4)';
				};
				btnNao.onmouseout = () => {
					btnNao.style.transform = 'translateY(0) scale(1)';
					btnNao.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
				};
			}

			function processarEnvioMP(dados, tipoMP) {
				mostrarCarregamentoDragao();
				
				let hoje = new Date().toLocaleDateString("pt-BR");
				let tituloMPNovo = '';
				
				switch (tipoMP) {
					case "carta_adv":
						tituloMPNovo = '[SUP] Advertência Verbal';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img]  
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"] 
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img] 
						[b][size=18][color=white]NOTIFICAÇÃO DE INFRAÇÃO[/color][/size][/b] 
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center] 
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \\n
						[b]Data:[/b] ${hoje}  
						[b]Motivo:[/b] ${dados.infracao}  
						[b]Considerações:[/b] ${dados.consideracoes}  \\n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]advertência verbal[/b].[/center] \\n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][color=white]COMPROVAÇÃO[/color][/size][/b]
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font] 
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table] 
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
						break;
					case "carta_10":
						tituloMPNovo = '[SUP] Carta de Infração -10 medalhas';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img] 
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"]
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
						[b][size=18][color=white]NOTIFICAÇÃO DE INFRAÇÃO[/color][/size][/b]
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \n
						[b]Data:[/b] ${hoje}  
						[b]Motivo:[/b] ${dados.infracao}  
						[b]Considerações:[/b] ${dados.consideracoes}  \n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em um [b]10 medalhas efetivas negativas[/b].[/center] \n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][color=white]COMPROVAÇÃO[/color][/size][/b]
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font] 
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table] 
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
						break;							
						
					case "carta_advint":
						tituloMPNovo = '[SUP] Advertência Escrita Interna';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img] 
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"]
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
						[b][size=18][color=white]NOTIFICAÇÃO DE INFRAÇÃO[/color][/size][/b]
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \n
						[b]Data:[/b] ${hoje}  
						[b]Motivo:[/b] ${dados.infracao}  
						[b]Considerações:[/b] ${dados.consideracoes}  \n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]advertência escrita interna[/b].[/center] \n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][color=white]COMPROVAÇÃO[/color][/size][/b]
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font] 
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table] 
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
						break;					
						
					case "carta_r":
						tituloMPNovo = '[SUP] Carta de Rebaixamento';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img]  
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"] 
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img] 
						[b][size=18][color=white]NOTIFICAÇÃO DE REBAIXAMENTO[/color][/size][/b]
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \n
						[b]Data:[/b] ${hoje}  
						[b]Motivo:[/b] ${dados.infracao}  
						[b]Considerações:[/b] ${dados.consideracoes}  \n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em um [b]rebaixamento interno[/b].[/center] \n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][color=white]COMPROVAÇÃO[/color][/size][/b] 
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table]
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
						break;
						
					case "carta_exp":
						tituloMPNovo = '[SUP] Carta de Expulsão';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img]  
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"] 
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img] 
						[b][size=18][color=white]NOTIFICAÇÃO DE EXPULSÃO[/color][/size][/b]
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \n
						[b]Data:[/b] ${hoje}  
						[b]Motivo:[/b] ${dados.infracao}  
						[b]Considerações:[/b] ${dados.consideracoes} \n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]expulsão[/b].[/center] \n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][color=white]COMPROVAÇÃO[/color][/size][/b] 
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table]
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
						break;	
					
					case "carta_promo1":
						tituloMPNovo = '[SUP] Promoção: Supervisor → Tutor';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img][font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"]
						
						[td style="border: none!important; overflow: hidden" bgcolor="#2e581d"][img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
						[b][size=18][color=white]NOTIFICAÇÃO DE PROMOÇÃO![/color][/size][/b]
						
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						
						Como apuramento de ter mantido um elevado padrão de produtividade e sendo [b][color=#008400]DESTAQUE[/color][/b] na Companhia dos Supervisores, você está sendo [b][color=#008400]PROMOVIDO[/color][/b] ao cargo de [b][color=#008400]TUTOR[/color][/b]. Para continuar o seu processo de evolução e conhecer suas novas funções, deverá procurar um graduador e realizar a [b][color=#008400]GRADUAÇÃO INTERMEDIÁRIA[/color][/b]. Continue se dedicando!
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]NOVA FUNÇÃO[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify]Como tutor, é sua responsabilidade tutelar os supervisores por meio de feedbacks e informações sobre a companhia, essa tutela fará com que o supervisor sinta-se acolhido e acompanhado, bem como proporcionará um controle qualitativo na aplicação dos cursos.
						
						Um tutor, deverá, semanalmente, concluir as seguintes atribuições:
						- Acompanhar, no mínimo, [b][color=#008400]01[/color][/b] aula (com supervisores distintos em cada aula: SUP/SEG/PRO);
						- Enviar uma [b][color=#008400]MENSAGEM PRIVADA[/color][/b] sobre a meta até quarta-feira às [b][color=#008400]23h59BR[/color][/b] ao supervisor escalado;
						- Realizar a postagem de conclusão da função no relatório até sábado às [b][color=#008400]23h59BR[/color][/b].
						
						[b][color=#008400]➛[/color][/b] Lembre-se de verificar a escala atual após conclusão da graduação no prazo previsto para garantir o alcance da meta; caso contrário, ficará em [b][color=#008400]Casos Especiais[/color][/b] somente na primeira semana.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]SUBFÓRUM[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][url=https://www.policiarcc.com/t24978-tut-script-de-acompanhamento][b][color=#008400][TUT] Script de Acompanhamento[/color][/b][/url]: Destinado ao script de acompanhamento utilizado pelos tutores em sua tutoria de aula.
						[url=https://www.policiarcc.com/t31644-tut-relatorio-de-aplicacoes-e-escala][b][color=#008400][TUT] Relatório de Aplicações e Escala[/color][/b][/url]: Destinado à postagem de conclusão de função como tutor, assim como a consulta da escala e falhas semanais.
						[url=https://www.policiarcc.com/t36073-sup-manual-de-funcao][b][color=#008400][TUT] Manual de Função[/color][/b][/url]: Destinado ao manual das funções dos tutores e entendimento das responsabilidades.
						[url=https://www.policiarcc.com/t36379-tut-faq-perguntas-frequentes][b][color=#008400][TUT] FAQ (Perguntas frequentes)[/color][/b][/url]: Destinado ao acesso às dúvidas frequentes sobre o cargo de Tutor.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]CARREIRA[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][center]Supervisor ➛ [b][color=#008400]Tutor[/color][/b] ➛ Fiscalizador ➛ Graduador ➛ Estagiário ➛ Ministro ➛ Vice-Líder ➛ Líder[/center]
						
						É imprescindível que você mantenha uma leitura regular das documentações da companhia, visando compartilhar o máximo de conhecimento durante as tutorias com os supervisores. Para progredir para o cargo de fiscalizador, é essencial alcançar suas metas com excelência e estar alinhado com as informações mencionadas anteriormente. Além disso, enviar projetos e sugestões bem elaborados, assim como participar ativamente dos subgrupos da companhia, pode destacá-lo entre os demais membros.
						
						Caso você seja oficial do corpo militar ou oficial do corpo executivo portador da especialização intermediária, você tem um prazo de 48 horas para realizar sua atualização de tarefas no system da Polícia RCC. A identificação do seu novo cargo é [b][color=#008400]{Tut.SUP}[/color][/b].[/justify]
						
						[center][b][color=#008400]#TudoVerde[/color][/b][/center][/td][/tr][/table]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/font][/td][/tr][/table][/td][/tr][/table]`;
						break;
						
					case "carta_promo2":
						tituloMPNovo = '[SUP] Promoção: Tutor → Fiscalizador';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img][font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"]
						
						[td style="border: none!important; overflow: hidden" bgcolor="#2e581d"][img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
						[b][size=18][color=white]NOTIFICAÇÃO DE PROMOÇÃO![/color][/size][/b]
						
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						
						Como apuramento de ter mantido um elevado padrão de produtividade e sendo [b][color=#008400]DESTAQUE[/color][/b] na Companhia dos Supervisores, você está sendo [b][color=#008400]PROMOVIDO[/color][/b] ao cargo de [b][color=#008400]FISCALIZADOR[/color][/b].
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]NOVA FUNÇÃO[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify]Como fiscalizador, é sua responsabilidade fiscalizar as listagens do [b][color=#008400]Centro de Recursos Humanos[/color][/b].
						
						Um fiscalizador, deverá, semanalmente, concluir  uma fiscalização no prazo pré-estabelecido de acordo com a escala.
						
						[b][color=#008400]➛[/color][/b] Lembre-se de verificar a escala atual após conclusão da graduação no prazo previsto para garantir o alcance da meta; caso contrário, ficará em [b][color=#008400]Casos Especiais[/color][/b] somente na primeira semana.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]SUBFÓRUM[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][url=https://www.policiarcc.com/t25023-fisc-manual-de-funcao][b][color=#008400][FISC] Manual de Função[/color][/b][/url]: Destinado ao manual das funções dos fiscalizadores e entendimento das responsabilidades.
						
						[url=https://www.policiarcc.com/t35855-fis-relatorio-de-graduacoes][b][color=#008400][FISC] Relatório de Graduações[/color][/b][/url]: Destinado à postagem de conclusão de função como fiscalizador.
						
						[url=https://www.policiarcc.com/t36380-fisc-faq-perguntas-frequentes][b][color=#008400][FISC] FAQ (Perguntas frequentes)[/color][/b][/url]: Destinado ao acesso às dúvidas frequentes sobre o cargo de Fiscalizador.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]CARREIRA[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][center]Supervisor ➛ Tutor ➛ [b][color=#008400]Fiscalizador[/color][/b] ➛ Graduador ➛ Estagiário ➛ Ministro ➛ Vice-Líder ➛ Líder[/center]
						
						É imprescindível que você mantenha uma leitura regular das documentações da companhia, visando compartilhar o máximo de conhecimento com os supervisores. Para progredir para o cargo de graduador, é essencial alcançar suas metas com excelência e estar alinhado com as informações mencionadas anteriormente. Além disso, enviar projetos e sugestões bem elaborados, assim como participar ativamente dos subgrupos da companhia, pode destacá-lo entre os demais membros.
						
						Caso você seja oficial do corpo militar ou oficial do corpo executivo portador da especialização intermediária, você tem um prazo de 48 horas para realizar sua atualização de tarefas no system da Polícia RCC. A identificação do seu novo cargo é [b][color=#008400]{Fisc.SUP}[/color][/b].[/justify]
						
						[center][b][color=#008400]#TudoVerde[/color][/b][/center][/td][/tr][/table]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/font][/td][/tr][/table][/td][/tr][/table]`;
						break;	
						
					case "carta_promo3":
						tituloMPNovo = '[SUP] Promoção: Fiscalizador → Graduador';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img][font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"]
						
						[td style="border: none!important; overflow: hidden" bgcolor="#2e581d"][img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
						[b][size=18][color=white]NOTIFICAÇÃO DE PROMOÇÃO![/color][/size][/b]
						
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
						
						Como apuramento de ter mantido um elevado padrão de produtividade e sendo [b][color=#008400]DESTAQUE[/color][/b] na Companhia dos Supervisores, você está sendo [b][color=#008400]PROMOVIDO[/color][/b] ao cargo de [b][color=#008400]GRADUADOR[/color][/b].
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]NOVA FUNÇÃO[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify]Como graduador, é sua responsabilidade capacitar os novos membros da companhia e também os supervisores promovidos à [b][color=#008400]Tutor[/color][/b] e [b][color=#008400]Fiscalizador[/color][/b]. Um graduador, deverá, quinzenalmente, aplicar [b][color=#008400]04[/color][/b] graduações.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]SUBFÓRUM[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][url=https://www.policiarcc.com/f315-sup-graduadores][b][color=#008400][GRAD] Scripts de Graduações[/color][/b][/url]: Destinado aos scripts de graduações utilizados pelos graduadores.
						
						[url=https://www.policiarcc.com/t26547-grad-relatorio-de-graduacoes][b][color=#008400][GRAD] Relatório de Graduações[/color][/b][/url]: Destinado à postagem de conclusão de função como graduador.
						
						[url=https://www.policiarcc.com/t30650-grad-manual-de-funcao][b][color=#008400][GRAD] Manual de Função[/color][/b][/url]: Destinado ao manual das funções dos graduadores e entendimento das responsabilidades.[/justify]
						
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]CARREIRA[/color][/b][/size][/td][/tr][/table][/center]
						
						[justify][center]Supervisor ➛ Tutor ➛ Fiscalizador ➛ [b][color=#008400]Graduador[/color][/b] ➛ Estagiário ➛ Ministro ➛ Vice-Líder ➛ Líder[/center]
						
						É imprescindível que você mantenha uma leitura regular das documentações da companhia, visando compartilhar o máximo de conhecimento com os supervisores. Para progredir para o cargo de estagiário, é essencial alcançar suas metas com excelência e estar alinhado com as informações mencionadas anteriormente. Além disso, enviar projetos e sugestões bem elaborados, assim como participar ativamente dos subgrupos da companhia, pode destacá-lo entre os demais membros.
						
						Caso você seja oficial do corpo militar ou oficial do corpo executivo portador da especialização intermediária, você tem um prazo de 48 horas para realizar sua atualização de tarefas no system da Polícia RCC. A identificação do seu novo cargo é [b][color=#008400]{Grad.SUP}[/color][/b].[/justify]
						
						[center][b][color=#008400]#TudoVerde[/color][/b][/center][/td][/tr][/table]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/font][/td][/tr][/table][/td][/tr][/table]`;
						break;	
						
					case "carta_promo4":
						tituloMPNovo = '[SUP] Promoção: Graduador → Estagiário';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img][font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"]
				
				[td style="border: none!important; overflow: hidden" bgcolor="#2e581d"][img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
				[b][size=18][color=white]NOTIFICAÇÃO DE PROMOÇÃO![/color][/size][/b]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
				
				Como apuramento de ter mantido um elevado padrão de produtividade e sendo [b][color=#008400]DESTAQUE[/color][/b] na Companhia dos Supervisores, você está sendo [b][color=#008400]PROMOVIDO[/color][/b] ao cargo de [b][color=#008400]ESTAGIÁRIO[/color][/b]. Continue se dedicando!
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]NOVA FUNÇÃO[/color][/b][/size][/td][/tr][/table][/center]
				
				[justify]O [b][color=#008400]Ministério[/color][/b] é responsável pela base operacional e funcional da companhia, tendo a obrigação de manter a integridade do perímetro em qualquer hipótese, prevalecendo sua postura e imagem profissional aos demais membros.
				
				O [b][color=#008400]Estagiário[/color][/b] é responsável por funções administrativas complementares que envolvem a [b][color=#008400]Companhia dos Supervisores[/color][/b], tendo a obrigação de manter a integridade do perímetro em qualquer hipótese, prevalecendo sua postura e imagem profissional aos demais membros.[/justify]
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]SUBFÓRUM[/color][/b][/size][/td][/tr][/table][/center]
				
				[center]Os acessos necessários para sua função, como manuais de funções, formulários de conclusão, justificativa, notificações de MP e demais links poderão ser encontrados em nossa [url=https://www.policiarcc.com/h180-min-sup-central-de-acesso][b][color=#008400]Central de Acesso Ministerial[/b][/color][/url].[/center]
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]CARREIRA[/color][/b][/size][/td][/tr][/table][/center]
				
				[justify][center]Supervisor ➛ Tutor ➛ Fiscalizador ➛ Graduador ➛ [b][color=#008400]Estagiário[/color][/b] ➛ Ministro ➛ Vice-Líder ➛ Líder[/center]
				
				É imprescindível que você mantenha uma leitura regular das documentações da companhia, visando compartilhar o máximo de conhecimento com os supervisores. Para progredir para o cargo de ministro, é essencial alcançar suas metas com excelência e estar alinhado com as informações mencionadas anteriormente. Além disso, enviar projetos e sugestões bem elaborados, assim como participar ativamente dos subgrupos da companhia, pode destacá-lo entre os demais membros.
				
				Caso você seja oficial do corpo militar ou oficial do corpo executivo portador da especialização intermediária, você tem um prazo de 48 horas para realizar sua atualização de tarefas no system da Polícia RCC. A identificação do seu novo cargo é [b][color=#008400]{Est.SUP}[/color][/b].[/justify]
				
				[center][b][color=#008400]#TudoVerde[/color][/b][/center][/td][/tr][/table]
				[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/font][/td][/tr][/table][/td][/tr][/table]`;
						break;	
						
					case "carta_promo5":
						tituloMPNovo = '[SUP] Promoção: Estagiário → Ministro';
						dados.mensagem = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img][font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"]
				
				[td style="border: none!important; overflow: hidden" bgcolor="#2e581d"][img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img]
				[b][size=18][color=white]NOTIFICAÇÃO DE PROMOÇÃO![/color][/size][/b]
				
				[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]{USERNAME}[/b][/color].[/center]
				
				Como apuramento de ter mantido um elevado padrão de produtividade e sendo [b][color=#008400]DESTAQUE[/color][/b] na Companhia dos Supervisores, você está sendo [b][color=#008400]PROMOVIDO[/color][/b] ao cargo de [b][color=#008400]MINISTRO[/color][/b]. Continue se dedicando!
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]NOVA FUNÇÃO[/color][/b][/size][/td][/tr][/table][/center]
				
				[justify]O [b][color=#008400]Ministério[/color][/b] é responsável pela base operacional e funcional da companhia, tendo a obrigação de manter a integridade do perímetro em qualquer hipótese, prevalecendo sua postura e imagem profissional aos demais membros.
				
				O [b][color=#008400]Estagiário[/color][/b] é responsável por funções administrativas complementares que envolvem a [b][color=#008400]Companhia dos Supervisores[/color][/b], tendo a obrigação de manter a integridade do perímetro em qualquer hipótese, prevalecendo sua postura e imagem profissional aos demais membros.[/justify]
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]SUBFÓRUM[/color][/b][/size][/td][/tr][/table][/center]
				
				[center]Os acessos necessários para sua função, como manuais de funções, formulários de conclusão, justificativa, notificações de MP e demais links poderão ser encontrados em nossa [url=https://www.policiarcc.com/h180-min-sup-central-de-acesso][b][color=#008400]Central de Acesso Ministerial[/b][/color][/url].[/center]
				
				[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][size=16][b][color=white]CARREIRA[/color][/b][/size][/td][/tr][/table][/center]
				
				[justify][center]Supervisor ➛ Tutor ➛ Fiscalizador ➛ Graduador ➛ Estagiário ➛ [b][color=#008400]Ministro[/color][/b] ➛ Vice-Líder ➛ Líder[/center]
				
				É imprescindível que você mantenha uma leitura regular das documentações da companhia, visando compartilhar o máximo de conhecimento com os supervisores. Para progredir para o cargo de vice-líder, é essencial alcançar suas metas com excelência e estar alinhado com as informações mencionadas anteriormente. Além disso, enviar projetos e sugestões bem elaborados, assim como participar ativamente dos subgrupos da companhia, pode destacá-lo entre os demais membros.
				
				Caso você seja oficial do corpo militar ou oficial do corpo executivo portador da especialização intermediária, você tem um prazo de 48 horas para realizar sua atualização de tarefas no system da Polícia RCC. A identificação do seu novo cargo é [b][color=#008400]{Min.SUP}[/color][/b].[/justify]
				
				[center][b][color=#008400]#TudoVerde[/color][/b][/center][/td][/tr][/table]
				[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/font][/td][/tr][/table][/td][/tr][/table]`;
				break;	
				
				default:
				const dragaoCarregamento = document.getElementById('dragaoCarregamento');
				if (dragaoCarregamento) {
					dragaoCarregamento.remove();
				}
				mostrarErroEnvio("Por favor, selecione um tipo de MP.");
				return;
				}
				
				const tituloMP = tituloMPNovo;
				const mensagemMP = dados.mensagem;
				
				send_MP(tituloMP, dados.nome, mensagemMP);
				
				const formEnviarMp = document.getElementById("enviar_Mp");
				if (formEnviarMp) {
					formEnviarMp.reset();
					formEnviarMp.style.display = "none";
				}
				
				const blocos = document.querySelectorAll('.form-mp');
				blocos.forEach(div => div.style.display = 'none');
				}
				
				
				function send_MP(title, user, message) {
				const nomes = user.includes('/') 
				? user.split('/').map(n => n.trim()) 
				: [user.trim()];
				
				let completedRequests = 0;
				const totalRequests = nomes.length;
				
				nomes.forEach(nome => {
				$.post('/privmsg', {
				folder: 'inbox',
				mode: 'post',
				post: '1',
				username: nome,
				subject: title,
				message: message
				})
				.done(function () {
				completedRequests++;
				console.log(`Mensagem enviada com sucesso para ${nome}. Progresso: ${completedRequests}/${totalRequests}`);
				
				if (completedRequests === totalRequests) {
					const loadingOverlay = document.getElementById('dragaoCarregamento');
					if (loadingOverlay) {
						setTimeout(() => {
							loadingOverlay.remove();
							mostrarPopupSucesso();
						}, 2000);
					} else {
						mostrarPopupSucesso();
					}
				}
				})
				.fail(function () {
				console.error(`Erro ao enviar mensagem para ${nome}`);
				const loadingOverlay = document.getElementById('dragaoCarregamento');
				if (loadingOverlay) {
					setTimeout(() => {
						loadingOverlay.remove();
						mostrarErroEnvio(`Erro ao enviar a mensagem para ${nome}.`);
					}, 2000); 
				} else {
					mostrarErroEnvio(`Erro ao enviar a mensagem para ${nome}.`);
				}
				})
				.always(function () {
				console.log("Usuário:", nome);
				console.log("Assunto:", title);
				console.log("Mensagem:", message);
				});
				});
				}
