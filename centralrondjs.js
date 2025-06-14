console.log("V1.0");			
const opcoesPorMinisterio = {
				"Ministério da Administração": [
				"Postagem de Pontos",
				"Atualização do Quadro de Advertências"
				],
				"Ministério dos Recursos Humanos": [
				"Atualização da Ouvidoria",
				"Postagem das medalhas do(s) projeto(s) aprovado(s)",
				"Propostas aprovadas colocadas em vigor"
				],
				"Ministério da Atualização": [
				"Atualização da listagem de membros",
				"Fiscalização dos Estagiários"
				],
				"Ministério da Contabilidade": [
				"Porcentagem dos Organizadores de Rondas",
				"Porcentagem dos Tutores",
				"Porcentagem dos Graduadores",
				"Porcentagem dos Ministros/Estagiários"
				],
				"Ministério da Documentação": [
				"Realização das Retificações de Erros",
				"Atualização do tópico de correções"
				],
				"Ministério das Finanças": [
				"Gratificação dos Organizadores de Rondas",
				"Gratificação dos Tutores",
				"Gratificação dos Graduadores",
				"Gratificação dos Estagiários",
				"Gratificação dos Ministros",
				"Gratificação da Liderança"
				],
				"Ministério da Segurança": [
				"Fiscalização dos Emblemas e Sub-Fórum",
				"Fiscalização da Listagem de Membros"
				]
			};
			
			function toggleSubmenu() {
				FormManager.hideAllForms();
				const containerMinisterios = document.getElementById('container-ministerios');
				if (containerMinisterios) {
					containerMinisterios.classList.remove('hidden');
					containerMinisterios.style.display = 'block';
				}
			}
			
			function toggleSubmenuuteis() {
				FormManager.hideAllForms();
				const containerUteis = document.getElementById('container-uteis');
				if (containerUteis) {
					containerUteis.classList.remove('hidden');
					containerUteis.style.display = 'block';
				}
			}
			
			const ElementUtils = {
				show(element) {
					if (element) {
						element.classList.remove('hidden');
						element.style.display = '';
					}
				},
				
				hide(element) {
					if (element) {
						element.classList.add('hidden');
						element.style.display = 'none';
					}
				},
				
				toggle(element) {
					if (element) {
						if (element.classList.contains('hidden')) {
							this.show(element);
							} else {
							this.hide(element);
						}
					}
				},
				
				hideAll(elements) {
					elements.forEach(el => this.hide(el));
				}
			};
			
			const FormManager = {
				hideAllForms() {
					const forms = [
					document.getElementById('postagem_funcao_forms'),
					document.getElementById('enviar_Mp'),
					document.getElementById('container-ministerios'),
					document.getElementById('container-uteis')
					];
					ElementUtils.hideAll(forms);
					this.resetMinisterioView();
				},
				
				resetMinisterioView() {
					const submenuMinisterios = document.getElementById('submenu-ministerios');
					const botaoVoltar = document.getElementById('botao-voltar-ministerios');
					const tituloMinisterio = document.getElementById('titulo-ministerio');
					
					ElementUtils.show(submenuMinisterios);
					ElementUtils.hide(botaoVoltar);
					
					if (tituloMinisterio) {
						tituloMinisterio.textContent = 'Selecione o Ministério';
					}
					
					this.hideAllMinisterioLinks();
				},
				
				hideAllMinisterioLinks() {
					const ministerioIds = ['atualizacao', 'seguranca', 'administracao', 'contabilidade', 'financas', 'documentacao', 'humanos'];
					ministerioIds.forEach(id => {
						const element = document.getElementById(`links-${id}`);
						ElementUtils.hide(element);
					});
				}
			};
			
			const CheckboxManager = {
				createCheckboxContainer() {
					const container = document.createElement("div");
					container.className = "checkbox-container";
					return container;
				},
						createCheckboxItem(funcao, index) {
					const checkboxId = `funcao_${index}`;
					
					const itemWrapper = document.createElement("label");
					itemWrapper.htmlFor = checkboxId;
					itemWrapper.className = "checkbox-item";
					
					const checkbox = document.createElement("input");
					checkbox.type = "checkbox";
					checkbox.id = checkboxId;
					checkbox.name = "funcoes_ministerio[]";
					checkbox.value = funcao;
					
					const checkmark = document.createElement("span");
					checkmark.className = "checkmark";
					
					const labelText = document.createElement("span");
					labelText.className = "checkbox-label";
					labelText.textContent = funcao;
					
					itemWrapper.appendChild(checkbox);
					itemWrapper.appendChild(checkmark);
					itemWrapper.appendChild(labelText);
					
					return itemWrapper;
				},
				
				mostrarCheckboxes(ministerio) {
					const container = document.getElementById("ministro_conclusao");
					const funcoes = opcoesPorMinisterio[ministerio];
					
					if (!funcoes || !container) return;
					
					const existingWrapper = document.getElementById("funcoes_checkbox_wrapper");
					if (existingWrapper) {
						existingWrapper.remove();
					}
					
					const wrapper = document.createElement("div");
					wrapper.id = "funcoes_checkbox_wrapper";
					wrapper.className = "input-box";
					
					const label = document.createElement("span");
					label.className = "details_span";
					label.textContent = "Função Concluída:";
					wrapper.appendChild(label);
					
					const checkboxContainer = this.createCheckboxContainer();
					
					funcoes.forEach((funcao, index) => {
						const checkboxItem = this.createCheckboxItem(funcao, index);
						checkboxContainer.appendChild(checkboxItem);
					});
					
					wrapper.appendChild(checkboxContainer);
					container.appendChild(wrapper);
				}
			};
			
			const FieldManager = {
				toggleFields() {
					const tipo = document.getElementById("tipo_funcao").value;
					const ministerio = document.getElementById("ministerio").value;
					const conclusaoBox = document.getElementById("ministro_conclusao");
					const justificativaBox = document.getElementById("ministro_justificativa");
					const containerMinisterioSelect = document.getElementById("container-ministerio-select");
					
					ElementUtils.hide(conclusaoBox);
					ElementUtils.hide(justificativaBox);
					ElementUtils.hide(containerMinisterioSelect);
					
					const existingWrapper = document.getElementById("funcoes_checkbox_wrapper");
					if (existingWrapper) {
						existingWrapper.remove();
					}
					
					if (tipo === "Conclusão") {
						ElementUtils.show(conclusaoBox);
						if (ministerio) {
							CheckboxManager.mostrarCheckboxes(ministerio);
						}
						} else if (tipo === "Justificativa") {
						ElementUtils.show(justificativaBox);
					}
				},
				
				toggleMinisterioSelect() {
					const atividadeJustificada = document.getElementById("atividade_justificada");
					const containerMinisterio = document.getElementById("container-ministerio-select");
					
					if (atividadeJustificada && containerMinisterio) {
						if (atividadeJustificada.value === "funcao-ministerial") {
							ElementUtils.show(containerMinisterio);
							} else {
							ElementUtils.hide(containerMinisterio);
						}
					}
				}
			};
					const MpManager = {
				toggleMpOptions() {
					const tipoMp = document.getElementById("tipomp").value;
					const allMpForms = document.querySelectorAll('.form-mp');
					
					allMpForms.forEach(form => {
						ElementUtils.hide(form);
						const inputs = form.querySelectorAll('input[required]');
						inputs.forEach(input => {
							input.removeAttribute('required');
							input.setAttribute('data-was-required', 'true');
						});
					});
					
					if (tipoMp) {
						const targetForm = document.getElementById(`form_${tipoMp}`);
						ElementUtils.show(targetForm);
						
						const inputs = targetForm.querySelectorAll('input[data-was-required="true"]');
						inputs.forEach(input => {
							input.setAttribute('required', '');
						});
					}
				}
			};
			
			function mostrarFormularioFuncao() {
				FormManager.hideAllForms();
				const form = document.getElementById('postagem_funcao_forms');
				if (form) {
					form.classList.remove('hidden');
					form.style.display = 'block';
					document.getElementById('ministro_conclusao').classList.add('hidden');
					document.getElementById('ministro_justificativa').classList.add('hidden');
					document.getElementById('ministro_conclusao').style.display = 'none';
					document.getElementById('ministro_justificativa').style.display = 'none';
				}
			}
					function mostrarFormularioMP() {
				FormManager.hideAllForms();
				const form = document.getElementById('enviar_Mp');
				if (form) {
					form.classList.remove('hidden');
					form.style.display = 'block';
					document.querySelectorAll('.form-mp').forEach(f => {
						f.classList.add('hidden');
						f.style.display = 'none';
						
						const inputs = f.querySelectorAll('input[required]');
						inputs.forEach(input => {
							input.removeAttribute('required');
							input.setAttribute('data-was-required', 'true');
						});
					});
				}
			}
			
			function mostrarLinksMinisterio(ministerio, nomeExibido) {
				const submenuMinisterios = document.getElementById('submenu-ministerios');
				const botaoVoltar = document.getElementById('botao-voltar-ministerios');
				const tituloMinisterio = document.getElementById('titulo-ministerio');
				ElementUtils.hide(submenuMinisterios);
				ElementUtils.show(botaoVoltar);
				if (tituloMinisterio) {
					tituloMinisterio.textContent = nomeExibido;
				}
				FormManager.hideAllMinisterioLinks();
				const targetLinks = document.getElementById(`links-${ministerio}`);
				if (targetLinks) {
					ElementUtils.show(targetLinks);
					targetLinks.classList.remove('hidden');
					targetLinks.style.display = 'grid';
				}
			}
			
			function voltarAoMenu() {
				FormManager.resetMinisterioView();
			}
			
			function toggleFields() {
				FieldManager.toggleFields();
			}
			
			function mostrarCheckboxes() {
				const ministerio = document.getElementById("ministerio").value;
				if (ministerio) {
					CheckboxManager.mostrarCheckboxes(ministerio);
				}
			}
			
			function toggleMinisterioSelect() {
				FieldManager.toggleMinisterioSelect();
			}
			
			function toggleMpOptions() {
				MpManager.toggleMpOptions();
			}
			
			function enviarFormulario(event) {
				event.preventDefault();
				
				const loadingOverlay = document.createElement('div');
				loadingOverlay.id = 'loadingCarregamento';
				loadingOverlay.innerHTML = `
				<div style="
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background: rgba(0, 0, 0, 0.7);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 10000;
				">
				<div style="text-align: center;">
				<img src="https://i.imgur.com/UcfqvsC.png" alt="Loading" style="
				width: 256px;
				height: 256px;
				animation: spin 2s linear infinite;
				">
				<style>
				@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
				}
				</style>
				<p style="color: white; margin-top: 5px; font-weight: bold;">Enviando mensagem...</p>
				</div>
				</div>
				`;
				document.body.appendChild(loadingOverlay)
				
				const form = document.getElementById("postagem_funcao_forms");
				const submitButton = form.querySelector('input[type="submit"]');
				
				const mensagensErro = form.querySelectorAll('.erro-validacao');
				mensagensErro.forEach(msg => msg.remove());
				
				const nickname = document.getElementById("nickname_membro2");
				const tipoFuncao = document.getElementById("tipo_funcao");
				
				let formValido = true;
				
				if (!nickname.value.trim()) {
					mostrarErro(nickname, "Por favor, digite seu nick");
					formValido = false;
				}
				
				if (!tipoFuncao.value) {
					mostrarErro(tipoFuncao, "Por favor, selecione o tipo de função");
					formValido = false;
				}
				
				if (tipoFuncao.value === "Conclusão") {
					const ministerio = document.getElementById("ministerio");
					const ordemFuncao = document.getElementById("ordem_funcao");
					const dataFuncao = document.querySelector('input[name="data_funcao_conclusao"]');
					
					if (!ministerio.value) {
						mostrarErro(ministerio, "Por favor, selecione o ministério");
						formValido = false;
					}
					
					if (!ordemFuncao.value.trim()) {
						mostrarErro(ordemFuncao, "Por favor, informe a ordem da função");
						formValido = false;
					}
					
					if (!dataFuncao.value) {
						mostrarErro(dataFuncao, "Por favor, selecione a data da função");
						formValido = false;
					}
					
					const checkboxesFuncoes = document.querySelectorAll('input[name="funcoes_ministerio[]"]:checked');
					const wrapperCheckbox = document.getElementById("funcoes_checkbox_wrapper");
					
					if (wrapperCheckbox && checkboxesFuncoes.length === 0) {
						const msgErro = document.createElement('div');
						msgErro.className = 'erro-validacao';
						msgErro.style.color = 'red';
						msgErro.style.fontSize = '12px';
						msgErro.style.marginTop = '5px';
						msgErro.textContent = 'Selecione pelo menos uma função';
						wrapperCheckbox.appendChild(msgErro);
						formValido = false;
					}
					} else if (tipoFuncao.value === "Justificativa") {
					const atividadeJustificada = document.getElementById("atividade_justificada");
					const dataFuncao = document.querySelector('input[name="data_funcao_justificativa"]');
					const motivoJustificativa = document.getElementById("motivo_justificativa");
					
					if (!atividadeJustificada.value) {
						mostrarErro(atividadeJustificada, "Por favor, selecione a função justificada");
						formValido = false;
					}
					
					if (atividadeJustificada.value === "funcao-ministerial") {
						const ministerioJustificativa = document.getElementById("ministerio_justificativa");
						if (!ministerioJustificativa.value) {
							mostrarErro(ministerioJustificativa, "Por favor, selecione o ministério");
							formValido = false;
						}
					}
					
					if (!dataFuncao.value) {
						mostrarErro(dataFuncao, "Por favor, selecione a data da função");
						formValido = false;
					}
					
					if (!motivoJustificativa.value.trim()) {
						mostrarErro(motivoJustificativa, "Por favor, informe o motivo da justificativa");
						formValido = false;
					}
				}
				
				if (!formValido) {
					const loadingOverlay = document.getElementById('loadingCarregamento');
					if (loadingOverlay) {
						loadingOverlay.remove();
					}
					return;
				}
				
				const formData = new FormData(form);
				
				const checkboxesFuncoes = document.querySelectorAll('input[name="funcoes_ministerio[]"]:checked');
				if (checkboxesFuncoes.length > 0) {
					const funcoesMarcadas = [...checkboxesFuncoes]
					.map(cb => cb.value)
					.join(', ');
					
					formData.append('funcoes_realizadas', funcoesMarcadas);
				}
				
				submitButton.disabled = true;
				submitButton.value = "Enviando...";
				
				fetch('https://script.google.com/macros/s/AKfycbyXzjAk2qVSgbeiQa81QJnFhuJyWSCDIqq60HkfFaeYso0_HQEMZ-WbGRUo1aqtKkAf/exec', {
					method: 'POST',
					body: formData
				})
				.then(response => {
					console.log("Resposta recebida", response);
					return response;
				})
				.then(() => {					setTimeout(() => {
						const loadingOverlay = document.getElementById('loadingCarregamento');
						if (loadingOverlay) {
							loadingOverlay.remove();
						}
						
						const existingPopup = document.querySelector('.popup-confirmacao');
						if (existingPopup) {
							existingPopup.remove();
						}
						
						const popup = document.createElement('div');
						popup.className = 'popup-confirmacao';
						popup.innerHTML = `
						<div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; z-index: 9999;">
						<div style="background: white; color: black; padding: 30px; border-radius: 12px; text-align: center; max-width: 90%; width: 500px;">
						<h2 style="margin-top: 0;">Conclusão de função enviada</h2>
						<p>Deseja verificar a postagem?</p>
						<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
						<button id="btnSim" style="padding: 10px 20px; background-color: #ff7300; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Sim</button>
						<button id="btnNao" style="padding: 10px 20px; background-color: #ff6666; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Não</button>
						</div>
						</div>
						</div>
						`;
						
						document.body.appendChild(popup);
						
						const btnSim = document.getElementById('btnSim');
						const btnNao = document.getElementById('btnNao');
						
						if (btnSim) {
							btnSim.addEventListener('click', function() {
								console.log('Botão Sim clicado');
								window.open('https://docs.google.com/spreadsheets/d/1N1QlEvSqVmHd8Ch6W3_w-O9-AZrPo09p3tfKWnqaVEM/edit?gid=1633962266', '_self');
								popup.remove();
							});
						}
						
						if (btnNao) {
							btnNao.addEventListener('click', function() {
								console.log('Botão Não clicado');
								form.reset();
								
								const choicesElements = form.querySelectorAll('select');
								choicesElements.forEach(select => {
									if (select.choicesInstance) {
										select.choicesInstance.removeActiveItems();
										select.choicesInstance.setChoiceByValue('');
									}
								});
								
								document.getElementById("ministro_conclusao").style.display = "none";
								document.getElementById("ministro_justificativa").style.display = "none";
								document.getElementById("container-ministerio-select").style.display = "none";
								form.style.display = "none";
								
								const wrapperCheckbox = document.getElementById("funcoes_checkbox_wrapper");
								if (wrapperCheckbox) wrapperCheckbox.remove();
								
								popup.remove();
								submitButton.disabled = false;
								submitButton.value = "Enviar";
							});
						}
					}, 3000);
				})
				.catch(error => {
					console.error("Erro no envio:", error);
					alert("Erro ao enviar: " + error.message);
					const loadingOverlay = document.getElementById('loadingCarregamento');
					if (loadingOverlay) {
						loadingOverlay.remove();
					}
					submitButton.disabled = false;
					submitButton.value = "Enviar";
				});
			}
			
			function enviarMp(event) {
				event.preventDefault();
				
				const formData = new FormData(event.target);
				const data = Object.fromEntries(formData.entries());
				
				console.log('Dados do MP:', data);
				alert('MP enviado com sucesso!');
				
				event.target.reset();
				MpManager.toggleMpOptions();
			}
			
			const estiloCSS = document.createElement('style');
			estiloCSS.textContent = `
			.campo-invalido {
			border: 2px solid #ff5252 !important;  
			background-color: #fff0f0 !important; 
			box-shadow: 0 0 5px rgba(255, 82, 82, 0.3) !important;
			transition: all 0.3s ease;
			}
			
			.erro-validacao {
			margin-top: 5px;
			animation: fadeIn 0.3s ease;
			}
			
			.alerta-validacao {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffebee;
			border-left: 3px solid #ff5252;
			padding: 6px 10px;
			border-radius: 4px;
			text-align: center;
			}
			
			.icone-alerta {
			color: #ff5252;
			margin-right: 8px;
			flex-shrink: 0;
			}
			
			.texto-alerta {
			color: #d32f2f;
			font-size: 12px;
			font-weight: 500;
			}
			
			@keyframes fadeIn {
			from { opacity: 0; transform: translateY(-5px); }
			to { opacity: 1; transform: translateY(0); }
			}
			`;
			document.head.appendChild(estiloCSS);
			
			function mostrarErro(elemento, mensagem) {
				elemento.classList.add('campo-invalido');
				
				const errosAnteriores = elemento.parentNode.querySelectorAll('.erro-validacao');
				errosAnteriores.forEach(msg => msg.remove());
				
				const msgErro = document.createElement('div');
				msgErro.className = 'erro-validacao';
				
				msgErro.innerHTML = `
				<div class="alerta-validacao">
				<svg class="icone-alerta" viewBox="0 0 24 24" width="16" height="16">
				<path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1 1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"></path>
				</svg>
				<span class="texto-alerta">Preencha todos os campos</span>
				</div>
				`;
				
				elemento.parentNode.appendChild(msgErro);
				
				if (!document.querySelector('.campo-invalido:focus')) {
					elemento.focus();
				}
			}
			
			function limparErros() {
				document.querySelectorAll('.campo-invalido').forEach(campo => {
					campo.classList.remove('campo-invalido');
				});
				
				document.querySelectorAll('.erro-validacao').forEach(erro => {
					erro.remove();
				});
			}
					function validarFormularioMP(event) {
				event.preventDefault();
				
				limparErros();
				
				const tipoMP = document.getElementById('tipomp').value;
				let formValido = true;
				
				if (!tipoMP) {
					mostrarErro(document.getElementById('tipomp'), "Preencha todos os campos");
					formValido = false;
				}
				
				const formularioVisivel = document.getElementById(`form_${tipoMP}`);
				if (formularioVisivel && !formularioVisivel.classList.contains('hidden')) {
				
				if (tipoMP === 'carta_adv') {					const camposObrigatorios = [
					'nome_adv',
					'infracao_adv',
					'provas_adv'
					];
					
					camposObrigatorios.forEach(campo => {
						const elemento = document.querySelector(`[name="${campo}"]`);
						if (elemento && !elemento.value.trim()) {
							mostrarErro(elemento, "Preencha todos os campos");
							formValido = false;
						}
					});
				} 
				else if (tipoMP === 'carta_10') {					const camposObrigatorios = [
					'nome_10',
					'infracao_10',
					'provas_10'
					];
					
					camposObrigatorios.forEach(campo => {
						const elemento = document.querySelector(`[name="${campo}"]`);
						if (elemento && !elemento.value.trim()) {
							mostrarErro(elemento, "Preencha todos os campos");
							formValido = false;
						}
					});
				}
				else if (tipoMP === 'carta_advint') {					const camposObrigatorios = [
					'nome_advint',
					'infracao_advint',
					'provas_advint'
					];
					
					camposObrigatorios.forEach(campo => {
						const elemento = document.querySelector(`[name="${campo}"]`);
						if (elemento && !elemento.value.trim()) {
							mostrarErro(elemento, "Preencha todos os campos");
							formValido = false;
						}
					});
				}
				else if (tipoMP === 'carta_r') {					const camposObrigatorios = [
					'nome_r',
					'infracao_r',
					'provas_r'
					];
					
					camposObrigatorios.forEach(campo => {
						const elemento = document.querySelector(`[name="${campo}"]`);
						if (elemento && !elemento.value.trim()) {
							mostrarErro(elemento, "Preencha todos os campos");
							formValido = false;
						}
					});
				}
				else if (tipoMP === 'carta_exp') {					const camposObrigatorios = [
					'nome_exp',
					'infracao_exp',
					'provas_exp'
					];
					
					camposObrigatorios.forEach(campo => {
						const elemento = document.querySelector(`[name="${campo}"]`);
						if (elemento && !elemento.value.trim()) {
							mostrarErro(elemento, "Preencha todos os campos");
							formValido = false;
						}
					});				}
				}
				
				if (formValido) {
					enviarMp(event);
				}
				
				return formValido;
			}
			
			document.addEventListener("DOMContentLoaded", function() {
				document.querySelectorAll('.form-mp input[required]').forEach(input => {
					input.setAttribute('data-was-required', 'true');
				});
				
				const tipoFuncao = document.getElementById("tipo_funcao");
				const ministerio = document.getElementById("ministerio");
				const atividadeJustificada = document.getElementById("atividade_justificada");
				const tipoMp = document.getElementById("tipomp");
				
				if (tipoFuncao) {
					tipoFuncao.addEventListener("change", FieldManager.toggleFields);
				}
				
				if (ministerio) {
					ministerio.addEventListener("change", function() {
						const tipo = document.getElementById("tipo_funcao").value;
						if (tipo === "Conclusão") {
							CheckboxManager.mostrarCheckboxes(this.value);
						}
					});
				}
				
				
				if (atividadeJustificada) {
					atividadeJustificada.addEventListener("change", FieldManager.toggleMinisterioSelect);
				}
				
				if (tipoMp) {
					tipoMp.addEventListener("change", MpManager.toggleMpOptions);
				}
						const formFuncao = document.getElementById("postagem_funcao_forms");
				const formMp = document.getElementById("enviar_Mp");
				
				if (formFuncao) {
					formFuncao.removeAttribute('onsubmit');
					formFuncao.addEventListener("submit", enviarFormulario);
				}
				
				if (formMp) {
					formMp.removeAttribute('onsubmit');
					formMp.addEventListener("submit", validarFormularioMP);
				}
				
				document.querySelectorAll('select').forEach(function(selectElement) {
					selectElement.choicesInstance = new Choices(selectElement, {
						searchEnabled: false,
						itemSelectText: '',
						shouldSort: false,
					});
				});
			});
			
			window.mostrarFormularioFuncao = mostrarFormularioFuncao;
			window.mostrarFormularioMP = mostrarFormularioMP;
			window.toggleSubmenu = toggleSubmenu;
			window.toggleSubmenuuteis = toggleSubmenuuteis;
			window.mostrarLinksMinisterio = mostrarLinksMinisterio;
			window.voltarAoMenu = voltarAoMenu;
			window.toggleFields = FieldManager.toggleFields;
			window.toggleMinisterioSelect = FieldManager.toggleMinisterioSelect;
			window.toggleMpOptions = MpManager.toggleMpOptions;
			window.mostrarCheckboxes = CheckboxManager.mostrarCheckboxes;
			window.enviarFormulario = enviarFormulario;
			window.enviarMp = enviarMp;
			
			function enviarMp(event) {
				event.preventDefault();
				const loadingOverlay = document.createElement('div');
				loadingOverlay.id = 'loadingCarregamento';
				loadingOverlay.innerHTML = `
				<div style="
				position: fixed;
				top: 0;
				left: 0;
				width: 100vw;
				height: 100vh;
				background: rgba(0, 0, 0, 0.7);
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 10000;
				">
				<div style="text-align: center;">
				<img src="https://i.imgur.com/UcfqvsC.png" alt="Loading" style="
				width: 256px;
				height: 256px;
				animation: spin 2s linear infinite;
				">
				<style>
				@keyframes spin {
				0% { transform: rotate(0deg); }
				100% { transform: rotate(360deg); }
				}
				</style>
				<p style="color: white; margin-top: 5px; font-weight: bold;">Enviando mensagem...</p>
				</div>
				</div>
				`;
				document.body.appendChild(loadingOverlay);				
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
					
					dados.mensagem = `[table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][img]https://i.imgur.com/u6WVshP.gif[/img]
                
                 [table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#f8f8ff" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][color=#f8f8ff][size=18][font=Poppins][b]CARTA DE NOTIFICAÇÃO[/b][/font][/size][/color][/td][/tr][/table]
                
                 [font=Poppins]Saudações, [color=#f67828][b]RONDEIRO {USERNAME}[/b][/color]!
                
                 [left][justify]Venho, por meio desta mensagem privada, informar que você está sendo notificado por [b][color=#f67828]${dados.infracao}[/b][/color] na subcompanhia dos Organizadores de Rondas. 
                 Como consequência, será penalizado com [color=#f67828][b]Advertência Verbal[/b][/color].  \n
					[b]Data:[/b] ${hoje}  
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} \n
					 Caso tenha dúvidas ou deseje mais esclarecimentos, entre em contato com o [b]ministério[/b] ou com a [b]liderança[/b] dos [b]Organizadores de Rondas[/b].[/left][/justify]
                
                 [right][i]Atenciosamente,
                 Ministério dos [b][color=#f67828]Organizadores de Rondas[/color][/b].[/i][/right][/font][/td][/tr][/table]
                 [font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;
					
					case "carta_10":
					dados.tipo = "Carta de Infração -10 medalhas";
					dados.nome = document.querySelector('[name="nome_10"]').value;
					dados.infracao = document.querySelector('[name="infracao_10"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_10"]').value;
					dados.provas = document.querySelector('[name="provas_10"]').value;
					
					dados.mensagem = `[table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][img]https://i.imgur.com/u6WVshP.gif[/img]
                
                 [table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#f8f8ff" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][color=#f8f8ff][size=18][font=Poppins][b]CARTA DE NOTIFICAÇÃO[/b][/font][/size][/color][/td][/tr][/table]
                
                 [font=Poppins]Saudações, [color=#f67828][b]RONDEIRO {USERNAME}[/b][/color]!
                
                 [left][justify]Venho, por meio desta mensagem privada, informar que você está sendo notificado por [b][color=#f67828]${dados.infracao}[/b][/color] na subcompanhia dos Organizadores de Rondas. 
                 Como consequência, será penalizado com [color=#f67828][b]10 medalhas efetivas negativas[/b][/color].  \n
					[b]Data:[/b] ${hoje}  
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} \n
					 Caso tenha dúvidas ou deseje mais esclarecimentos, entre em contato com o [b]ministério[/b] ou com a [b]liderança[/b] dos [b]Organizadores de Rondas[/b].[/left][/justify]
                
                 [right][i]Atenciosamente,
                 Ministério dos [b][color=#f67828]Organizadores de Rondas[/color][/b].[/i][/right][/font][/td][/tr][/table]
                 [font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;							
					
					case "carta_advint":
					dados.tipo = "Advertência Escrita Interna";
					dados.nome = document.querySelector('[name="nome_advint"]').value;
					dados.infracao = document.querySelector('[name="infracao_advint"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_advint"]').value;
					dados.provas = document.querySelector('[name="provas_advint"]').value;
					
					const hojeAdv = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][img]https://i.imgur.com/u6WVshP.gif[/img]
                
                 [table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#f8f8ff" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][color=#f8f8ff][size=18][font=Poppins][b]CARTA DE NOTIFICAÇÃO[/b][/font][/size][/color][/td][/tr][/table]
                
                 [font=Poppins]Saudações, [color=#f67828][b]RONDEIRO {USERNAME}[/b][/color]!
                
                 [left][justify]Venho, por meio desta mensagem privada, informar que você está sendo notificado por [b][color=#f67828]${dados.infracao}[/b][/color] na subcompanhia dos Organizadores de Rondas. 
                 Como consequência, será penalizado com [color=#f67828][b]Advertência Escrita Interna[/b][/color].  \n
					[b]Data:[/b] ${hoje}  
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} \n
					 Caso tenha dúvidas ou deseje mais esclarecimentos, entre em contato com o [b]ministério[/b] ou com a [b]liderança[/b] dos [b]Organizadores de Rondas[/b].[/left][/justify]
                
                 [right][i]Atenciosamente,
                 Ministério dos [b][color=#f67828]Organizadores de Rondas[/color][/b].[/i][/right][/font][/td][/tr][/table]
                 [font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;					
					
					case "carta_r":
					dados.tipo = "Carta de Rebaixamento";
					dados.nome = document.querySelector('[name="nome_r"]').value;
					dados.infracao = document.querySelector('[name="infracao_r"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_r"]').value;
					dados.provas = document.querySelector('[name="provas_r"]').value;
					
					const hojeReb = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][img]https://i.imgur.com/u6WVshP.gif[/img]
                
                 [table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#f8f8ff" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][color=#f8f8ff][size=18][font=Poppins][b]CARTA DE NOTIFICAÇÃO[/b][/font][/size][/color][/td][/tr][/table]
                
                 [font=Poppins]Saudações, [color=#f67828][b]RONDEIRO {USERNAME}[/b][/color]!
                
                 [left][justify]Venho, por meio desta mensagem privada, informar que você está sendo notificado por [b][color=#f67828]${dados.infracao}[/b][/color] na subcompanhia dos Organizadores de Rondas. 
                 Como consequência, será penalizado com [color=#f67828][b]Rebaixamento Interno[/b][/color].  \n
					[b]Data:[/b] ${hoje}  
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} \n
					 Caso tenha dúvidas ou deseje mais esclarecimentos, entre em contato com o [b]ministério[/b] ou com a [b]liderança[/b] dos [b]Organizadores de Rondas[/b].[/left][/justify]
                
                 [right][i]Atenciosamente,
                 Ministério dos [b][color=#f67828]Organizadores de Rondas[/color][/b].[/i][/right][/font][/td][/tr][/table]
                 [font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;
					
					case "carta_exp":
					dados.tipo = "Carta de Expulsão";
					dados.nome = document.querySelector('[name="nome_exp"]').value;
					dados.infracao = document.querySelector('[name="infracao_exp"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_exp"]').value;
					dados.provas = document.querySelector('[name="provas_exp"]').value;
					
					const hojeExp = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[table style="border-color: black; border-radius: 20px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][img]https://i.imgur.com/u6WVshP.gif[/img]
                
                 [table style="border-color: black; border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="#f8f8ff" border="1"][tr][td][table style="border-radius: 14px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);" bgcolor="f67828" border="1"][tr][td][color=#f8f8ff][size=18][font=Poppins][b]CARTA DE NOTIFICAÇÃO[/b][/font][/size][/color][/td][/tr][/table]
                
                 [font=Poppins]Saudações, [color=#f67828][b]RONDEIRO {USERNAME}[/b][/color]!
                
                 [left][justify]Venho, por meio desta mensagem privada, informar que você está sendo notificado por [b][color=#f67828]${dados.infracao}[/b][/color] na subcompanhia dos Organizadores de Rondas. 
                 Como consequência, será penalizado com [color=#f67828][b]Expulsão[/b][/color].  \n
					[b]Data:[/b] ${hoje}  
					[b]Considerações:[/b] ${dados.consideracoes} 
					[b]Provas:[/b] ${dados.provas} \n
					 Caso tenha dúvidas ou deseje mais esclarecimentos, entre em contato com o [b]ministério[/b] ou com a [b]liderança[/b] dos [b]Organizadores de Rondas[/b].[/left][/justify]
                
                 [right][i]Atenciosamente,
                 Ministério dos [b][color=#f67828]Organizadores de Rondas[/color][/b].[/i][/right][/font][/td][/tr][/table]
                 [font=Poppins][size=12][color=#f8f8ff][b]Reservam-se os direitos aos Organizadores de Rondas.[/b][/color][/size][/font][/td][/tr][/table]`;
					break;	
					
					default:
					alert("Por favor, selecione um tipo de MP.");
					document.getElementById('loadingCarregamento').remove();
					return;
				}
				
				const tituloMP = `[ROND] ${dados.tipo}`;
				const mensagemMP = dados.mensagem;
				
				send_MP(tituloMP, dados.nome, mensagemMP);
				
				document.getElementById("enviar_Mp").reset();
				document.getElementById("enviar_Mp").style.display = "none";
				
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
						if (completedRequests === totalRequests) {
							const loadingOverlay = document.getElementById('loadingCarregamento');
							if (loadingOverlay) {
								setTimeout(() => {
									loadingOverlay.remove();
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
									width: 500px;
									">
									<h2 style="margin-top: 0;">Mensagem enviada!</h2>
									<p>Deseja enviar outra mensagem?</p>
									<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
									<button id="btnSimMP" style="
									padding: 10px 20px;
									background-color: #ff7300;
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
								}, 3000);
							}
						}
					})
					.fail(function () {
						const loadingOverlay = document.getElementById('loadingCarregamento');
						if (loadingOverlay) {
							setTimeout(() => {
								loadingOverlay.remove();
								alert(`Erro ao enviar a mensagem para ${nome}.`);
							}, 3000); 
						}
					})
					.always(function () {
						console.log("Usuário:", nome);
						console.log("Assunto:", title);
						console.log("Mensagem:", message);
					});
				});
			}
