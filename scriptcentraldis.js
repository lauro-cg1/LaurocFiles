console.log("V1.04");
			
			function forceCustomCursor() {
				const customCursor = "url('https://i.imgur.com/JgKyhbO.png') 14 4, auto";
				
				const style = document.createElement('style');
				style.id = 'force-cursor-styles';
				style.textContent = `
					* {
						cursor: ${customCursor} !important;
					}
					*:hover, *:focus, *:active {
						cursor: ${customCursor} !important;
					}
					input, textarea, select, button, a, div, span, label, form, fieldset {
						cursor: ${customCursor} !important;
					}
				`;
				document.head.appendChild(style);
				
				const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
				CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
					if (property === 'cursor' && value !== customCursor) {
						return originalSetProperty.call(this, property, customCursor, 'important');
					}
					return originalSetProperty.call(this, property, value, priority);
				};
				
				const originalStyle = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'style') || 
								   Object.getOwnPropertyDescriptor(Element.prototype, 'style');
				
				function applyCursorToAll() {
					const allElements = document.querySelectorAll('*');
					allElements.forEach(element => {
						if (element.style) {
							element.style.setProperty('cursor', customCursor, 'important');
						}
					});
				}
				
				document.addEventListener('mouseover', function(e) {
					if (e.target && e.target.style) {
						e.target.style.setProperty('cursor', customCursor, 'important');
					}
				}, true);
				
				document.addEventListener('mouseenter', function(e) {
					if (e.target && e.target.style) {
						e.target.style.setProperty('cursor', customCursor, 'important');
					}
				}, true);
				
				document.addEventListener('mousemove', function(e) {
					if (e.target && e.target.style) {
						e.target.style.setProperty('cursor', customCursor, 'important');
					}
				}, true);
				
				document.addEventListener('focus', function(e) {
					if (e.target && e.target.style) {
						e.target.style.setProperty('cursor', customCursor, 'important');
					}
				}, true);
				
				const observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if (mutation.type === 'childList') {
							mutation.addedNodes.forEach(function(node) {
								if (node.nodeType === 1) {
									if (node.style) {
										node.style.setProperty('cursor', customCursor, 'important');
									}
									const allChildren = node.querySelectorAll ? node.querySelectorAll('*') : [];
									allChildren.forEach(child => {
										if (child.style) {
											child.style.setProperty('cursor', customCursor, 'important');
										}
									});
								}
							});
						}
						if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
							if (mutation.target && mutation.target.style) {
								mutation.target.style.setProperty('cursor', customCursor, 'important');
							}
						}
					});
				});
				
				observer.observe(document.body, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ['style', 'class']
				});
				
				applyCursorToAll();
				
				setInterval(applyCursorToAll, 100);
				
				document.addEventListener('DOMSubtreeModified', function(e) {
					if (e.target && e.target.style) {
						e.target.style.setProperty('cursor', customCursor, 'important');
					}
				}, true);
				
				const originalAddEventListener = EventTarget.prototype.addEventListener;
				EventTarget.prototype.addEventListener = function(type, listener, options) {
					if (type === 'mouseenter' || type === 'mouseover' || type === 'mousemove' || type === 'focus') {
						const wrappedListener = function(e) {
							if (e.target && e.target.style) {
								e.target.style.setProperty('cursor', customCursor, 'important');
							}
							if (typeof listener === 'function') {
								listener.call(this, e);
							}
						};
						return originalAddEventListener.call(this, type, wrappedListener, options);
					}
					return originalAddEventListener.call(this, type, listener, options);
				};
				
				document.body.style.setProperty('cursor', customCursor, 'important');
				
				console.log('Cursor personalizado forçado em todos os elementos');
			}
			
			function debounce(func, wait) {
				let timeout;
				return function executedFunction(...args) {
					const context = this;
					const later = () => {
						clearTimeout(timeout);
						func.apply(context, args);
					};
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
				};
			}
			
			function showError(message, element) {
				console.error('DIS App Error:', message);
				if (element) {
					const errorDiv = document.createElement('div');
					errorDiv.className = 'erro-campo';
					errorDiv.innerHTML = `⚠️ ${message}`;
					element.appendChild(errorDiv);
				}
			}
			
			function addKeyboardSupport() {
				document.querySelectorAll('.nav-card').forEach(card => {
					card.addEventListener('keydown', function(e) {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							this.click();
						}
					});
				});
			}
			function hideAllForms() {
				const forms = [
					'postagem_casos_forms',
					'postagem_funcao_forms', 
					'enviar_Mp',
					'container-manuais',
					'container-planilhas',
					'container-uteis',
					'requerimentos_container'
				];
				forms.forEach(id => {
					const element = document.getElementById(id);
					if (element) {
						element.classList.add('hidden');
					}
				});
			}
			
			function showElement(id) {
				const element = document.getElementById(id);
				if (element) {
					element.classList.remove('hidden');
				}
			}
			
			function toggleSubmenu() {
				hideAllForms();
				const container = document.getElementById('container-manuais');
				if (container.classList.contains('hidden')) {
					showElement('container-manuais');
				} else {
					container.classList.add('hidden');
				}
			}
			
			function toggleSubmenuplan() {
				hideAllForms();
				const container = document.getElementById('container-planilhas');
				if (container.classList.contains('hidden')) {
					showElement('container-planilhas');
				} else {
					container.classList.add('hidden');
				}
			}
			
			function toggleSubmenuuteis() {
				hideAllForms();
				const container = document.getElementById('container-uteis');
				if (container.classList.contains('hidden')) {
					showElement('container-uteis');
				} else {
					container.classList.add('hidden');
				}
			}
			
			function mostrarFormulario() {
				hideAllForms();
				showElement('postagem_casos_forms');
			}
			
			function mostrarFormulario2() {
				hideAllForms();
				showElement('postagem_funcao_forms');
			}
			
			function mostrarFormulario3() {
				hideAllForms();
				showElement('enviar_Mp');
			}
			
			function mostrarRequerimentos() {
				hideAllForms();
				showElement('requerimentos_container');
				
				setTimeout(() => {
					initializeRequerimentosDropdown();
				}, 100);
			}
			
			function toggleFields() {
				toggleCargoOptions();
				
				const tipo = document.getElementById("tipo_caso");
				if (!tipo) return;
				
				const tipoValue = tipo.value;
				
				const fields = ['abertura_infracao', 'fechamento_infracao', 'registro_falhas'];
				fields.forEach(id => {
					const element = document.getElementById(id);
					if (element) {
						element.classList.add('hidden');
					}
				});
				
				if (tipoValue === "Abertura de Infração") {
					const element = document.getElementById("abertura_infracao");
					if (element) element.classList.remove('hidden');
				} else if (tipoValue === "Fechamento de Infração") {
					const element = document.getElementById("fechamento_infracao");
					if (element) element.classList.remove('hidden');
				} else if (tipoValue === "Registro de Falhas") {
					const element = document.getElementById("registro_falhas");
					if (element) element.classList.remove('hidden');
				}
			}
			function toggleCargoOptions() {
				const cargo = document.getElementById("cargo2")?.value;
				const fiscalizadorConclusao = document.getElementById("fiscalizador_conclusao");
				const peritoConclusao = document.getElementById("perito_conclusao");
				const fiscalizadorJustificativa = document.getElementById("fiscalizador_justificativa");
				const peritoJustificativa = document.getElementById("perito_justificativa");
				
				[fiscalizadorConclusao, peritoConclusao, fiscalizadorJustificativa, peritoJustificativa].forEach(el => {
					if (el) el.classList.add('hidden');
				});
				
				const tipoFuncao = document.getElementById("tipo_funcao")?.value;
				
				if (cargo === "Fiscalizador" && tipoFuncao === "Conclusão") {
					if (fiscalizadorConclusao) fiscalizadorConclusao.classList.remove('hidden');
				} else if (cargo === "Perito" && tipoFuncao === "Conclusão") {
					if (peritoConclusao) peritoConclusao.classList.remove('hidden');
				} else if (cargo === "Fiscalizador" && tipoFuncao === "Justificativa") {
					if (fiscalizadorJustificativa) fiscalizadorJustificativa.classList.remove('hidden');
				} else if (cargo === "Perito" && tipoFuncao === "Justificativa") {
					if (peritoJustificativa) peritoJustificativa.classList.remove('hidden');
				}
			}
			
			function toggleMpOptions() {
				const tipoMp = document.getElementById("tipomp")?.value;
				const mpForms = document.querySelectorAll('.form-mp');
				
				mpForms.forEach(form => {
					form.classList.add('hidden');
				});
				
				if (tipoMp) {
					const selectedForm = document.getElementById('form_' + tipoMp);
					if (selectedForm) {
						selectedForm.classList.remove('hidden');
					}
				}
			}
			
			function togglePrimeiraSegunda() {
			}
			
			function togglePrimeiraSegundaJustificativa() {
			}
			
			function setRequiredAttributes() {
				const fiscalizadorConclusao = document.getElementById("fiscalizador_conclusao");
				const peritoConclusao = document.getElementById("perito_conclusao");
				const fiscalizadorJustificativa = document.getElementById("fiscalizador_justificativa");
				const peritoJustificativa = document.getElementById("perito_justificativa");
				
				const allInputs = document.querySelectorAll('#postagem_funcao_forms input, #postagem_funcao_forms select');
				allInputs.forEach(input => {
					if (input.id !== 'cargo2' && input.id !== 'nickname_membro2' && input.id !== 'tipo_funcao') {
						input.required = false;
					}
				});
				
				if (fiscalizadorConclusao && !fiscalizadorConclusao.classList.contains('hidden')) {
					document.getElementById("tipo_funcao_fiscalizador").required = true;
					document.getElementById("comprovacao_conclusao").required = true;
				}
				
				if (peritoConclusao && !peritoConclusao.classList.contains('hidden')) {
					document.getElementById("tipo_funcao_perito").required = true;
					document.getElementById("comprovacao_conclusao_perito").required = true;
				}
				
				if (fiscalizadorJustificativa && !fiscalizadorJustificativa.classList.contains('hidden')) {
					document.getElementById("tipo_funcao_fiscalizador_justificativa").required = true;
					document.getElementById("motivo_justificativa_fiscalizador").required = true;
				}
				
				if (peritoJustificativa && !peritoJustificativa.classList.contains('hidden')) {
					document.getElementById("tipo_funcao_perito_justificativa").required = true;
					document.getElementById("motivo_justificativa_perito").required = true;
				}
			}
			
			function enviarFormulario(event) {
				event.preventDefault();
				
				const formContainer = document.getElementById("postagem_casos_forms");
				const form = formContainer.querySelector('form');
				const submitButton = form.querySelector('button[type="submit"]');
				
				form.querySelectorAll(".erro-campo").forEach(el => el.remove());
				
				if (!validateForm(form)) {
					return;
				}
				
				setButtonLoading(submitButton, true);
				
				const formData = new FormData(form);
				
				fetch('https://script.google.com/macros/s/AKfycbyrPOjUDUVSrbHRcpb5qea7PevcHKo802tTvHg-u_ElQsDmg5uR3jV57Bw44TtGt-s2Tg/exec', {
					method: 'POST',
					body: formData
				})
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}
					return response;
				})
				.then(() => {
					const tipoSelect = form.querySelector('#tipo_caso');
					if (tipoSelect && tipoSelect.value === 'Fechamento de Infração') {
						return fetch('https://script.google.com/macros/s/AKfycbw8hRJtJGpx2T40sYPAGQDTC-ECdQLzQy8Y1K_kcaVLc3jwqW0t-a7QyvRfSGvBZEvG/exec', {
							method: 'GET',
							mode: 'no-cors'
						})
						.then(response => {
							console.log('Additional script executed for Fechamento de Infração');
							return response;
						})
						.catch(error => {
							console.warn('Warning: Additional script execution failed:', error);
						});
					}
				})
				.then(() => {
					showSuccessModal({
						title: 'Caso enviado',
						message: 'Deseja ir para a central de casos?',
						onConfirm: () => {
							window.location.href = 'https://docs.google.com/spreadsheets/d/1RRd7a8-1EoWZpPUqz5D-vm9JazqOi9vdV5DjySxZFQE/edit?gid=205896872';
						},
						onCancel: () => {
							resetForm(form, formContainer);
						}
					});
				})
				.catch(error => {
					console.error('Error submitting form:', error);
					showError("Erro ao enviar: " + error.message, form);
				})
				.finally(() => {
					setButtonLoading(submitButton, false);
				});
			}
			
			function validateForm(form) {
				let isValid = true;
				
				const visibleFields = Array.from(form.querySelectorAll("input, select, textarea")).filter(el => {
					return !el.closest('.hidden') && el.style.display !== 'none' && el.type !== 'hidden';
				});
				
				for (let field of visibleFields) {
					if (field.required && !field.value.trim()) {
						isValid = false;
						showFieldError(field, "Preencha este campo.");
					}
				}
				
				return isValid;
			}
			
			function showFieldError(field, message) {
				const inputGroup = field.closest('.input-group');
				if (inputGroup && !inputGroup.querySelector('.erro-campo')) {
					const errorDiv = document.createElement("div");
					errorDiv.className = "erro-campo";
					errorDiv.innerHTML = `⚠️ ${message}`;
					inputGroup.appendChild(errorDiv);
					
					field.addEventListener("input", function handler() {
						if (field.value.trim()) {
							const errorMsg = inputGroup.querySelector('.erro-campo');
							if (errorMsg) {
								errorMsg.remove();
							}
							field.removeEventListener("input", handler);
						}
					});
				}
			}
			
			function setButtonLoading(button, isLoading) {
				if (isLoading) {
					button.disabled = true;
					button.dataset.originalText = button.innerHTML;
					button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
				} else {
					button.disabled = false;
					button.innerHTML = button.dataset.originalText || button.innerHTML;
				}
			}
			
			function openEscalaModal() {
				const modal = document.createElement('div');
				modal.className = 'escala-modal';
				modal.innerHTML = `
					<div class="modal-overlay" onclick="closeEscalaModal()">
						<div class="modal-content escala-content" onclick="event.stopPropagation()">
							<div class="modal-header">
								<h2><i class="fas fa-calendar-alt"></i> Escala Semanal</h2>
								<button class="modal-close" onclick="closeEscalaModal()" aria-label="Fechar modal">
									<i class="fas fa-times"></i>
								</button>
							</div>
							<div class="modal-body">
								<div class="iframe-container">
									<iframe 
										src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTkkbzfjBvqccwhF7iuQ5SMojs17G1BdJxvSUZw7cb4iIVue9mAVAMlBNWpK6wyvFvL0-V0iee3ACbZ/pubhtml?gid=1427731203&single=true&widget=true&headers=false"
										frameborder="0"
										allowfullscreen="true"
										title="Escala Semanal DIS">
									</iframe>
								</div>
							</div>
						</div>
					</div>
				`;
				
				const style = document.createElement('style');
				style.textContent = `
					.escala-modal .modal-overlay {
						position: fixed;
						top: 0;
						left: 0;
						width: 100vw;
						height: 100vh;
						background: rgba(0, 0, 0, 0.8);
						display: flex;
						align-items: center;
						justify-content: center;
						z-index: 9999;
						backdrop-filter: blur(5px);
					}
					.escala-modal .modal-content {
						background: var(--bg-card);
						color: var(--text-primary);
						border-radius: 16px;
						max-width: 95vw;
						max-height: 95vh;
						width: 1200px;
						height: 800px;
						box-shadow: 0 20px 60px rgba(0, 255, 136, 0.2);
						border: 1px solid var(--border-color);
						display: flex;
						flex-direction: column;
						overflow: hidden;
					}
					.escala-modal .modal-header {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20px 25px;
						border-bottom: 1px solid var(--border-color);
						background: var(--bg-secondary);
					}
					.escala-modal .modal-header h2 {
						margin: 0;
						font-size: 1.4rem;
						color: var(--primary-green);
						display: flex;
						align-items: center;
						gap: 10px;
					}
					.escala-modal .modal-close {
						background: none;
						border: none;
						color: var(--text-secondary);
						font-size: 1.5rem;
						cursor: pointer;
						padding: 8px;
						border-radius: 50%;
						transition: all 0.3s ease;
						display: flex;
						align-items: center;
						justify-content: center;
						width: 40px;
						height: 40px;
					}
					.escala-modal .modal-close:hover {
						background: rgba(255, 255, 255, 0.1);
						color: var(--primary-green);
						transform: scale(1.1);
					}
					.escala-modal .modal-body {
						flex: 1;
						padding: 0;
						overflow: hidden;
					}
					.escala-modal .iframe-container {
						width: 100%;
						height: 100%;
						position: relative;
					}
					.escala-modal .iframe-container iframe {
						width: 100%;
						height: 100%;
						border: none;
						border-radius: 0 0 16px 16px;
					}
					
					@media (max-width: 768px) {
						.escala-modal .modal-content {
							width: 95vw;
							height: 90vh;
							margin: 20px;
						}
						.escala-modal .modal-header {
							padding: 15px 20px;
						}
						.escala-modal .modal-header h2 {
							font-size: 1.2rem;
						}
					}
				`;
				document.head.appendChild(style);
				document.body.appendChild(modal);
				
				const closeOnEsc = (e) => {
					if (e.key === 'Escape') {
						closeEscalaModal();
						document.removeEventListener('keydown', closeOnEsc);
					}
				};
				document.addEventListener('keydown', closeOnEsc);
				
				modal.style.display = 'flex';
				window.currentEscalaModal = modal;
				window.currentEscalaStyle = style;
			}
			
			function closeEscalaModal() {
				if (window.currentEscalaModal) {
					document.body.removeChild(window.currentEscalaModal);
					window.currentEscalaModal = null;
				}
				if (window.currentEscalaStyle) {
					document.head.removeChild(window.currentEscalaStyle);
					window.currentEscalaStyle = null;
				}
			}
			
			function showSuccessModal({ title, message, onConfirm, onCancel }) {
				const modal = document.createElement('div');
				modal.className = 'success-modal';
				modal.innerHTML = `
					<div class="modal-overlay">
						<div class="modal-content">
							<h2>${title}</h2>
							<p>${message}</p>
							<div class="modal-buttons">
								<button class="modal-btn modal-btn-confirm">Sim</button>
								<button class="modal-btn modal-btn-cancel">Não</button>
							</div>
						</div>
					</div>
				`;
				
				const style = document.createElement('style');
				style.textContent = `
					.success-modal .modal-overlay {
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
					}
					.success-modal .modal-content {
						background: white;
						color: black;
						padding: 30px;
						border-radius: 12px;
						text-align: center;
						max-width: 90%;
						width: 400px;
						box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
					}
					.success-modal .modal-buttons {
						margin-top: 20px;
						display: flex;
						justify-content: center;
						gap: 20px;
					}
					.success-modal .modal-btn {
						padding: 10px 20px;
						border: none;
						border-radius: 8px;
						cursor: pointer;
						font-weight: bold;
						transition: all 0.3s ease;
					}
					.success-modal .modal-btn-confirm {
						background-color: #33ff88;
						color: white;
					}
					.success-modal .modal-btn-cancel {
						background-color: #ff6666;
						color: white;
					}
					.success-modal .modal-btn:hover {
						transform: translateY(-2px);
						box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
					}
				`;
				document.head.appendChild(style);
				
				document.body.appendChild(modal);
				
				modal.querySelector('.modal-btn-confirm').addEventListener('click', () => {
					document.body.removeChild(modal);
					document.head.removeChild(style);
					if (onConfirm) onConfirm();
				});
				
				modal.querySelector('.modal-btn-cancel').addEventListener('click', () => {
					document.body.removeChild(modal);
					document.head.removeChild(style);
					if (onCancel) onCancel();
				});
			}
			
			function resetForm(form, container) {
				form.reset();
				
				const choicesElements = form.querySelectorAll('select');
				choicesElements.forEach(select => {
					if (select.choicesInstance) {
						select.choicesInstance.removeActiveItems();
						select.choicesInstance.setChoiceByValue('');
					}
				});
				
				const sections = ['abertura_infracao', 'fechamento_infracao', 'registro_falhas'];
				sections.forEach(id => {
					const element = document.getElementById(id);
					if (element) element.classList.add('hidden');
				});
				
				container.classList.add('hidden');
			}
			
			function enviarFormulario2(event) {
				event.preventDefault();
				
				const formContainer2 = document.getElementById("postagem_funcao_forms");
				const form2 = formContainer2.querySelector('form');
				const submitButton2 = form2.querySelector('button[type="submit"]');
				
				form2.querySelectorAll(".erro-campo").forEach(el => el.remove());
				
				if (!validateForm(form2)) {
					return;
				}
				
				setButtonLoading(submitButton2, true);
				
				const formData2 = new FormData(form2);
				
				fetch('https://script.google.com/macros/s/AKfycbwjy2plzeLCiX2u10w_R-uz6hgsMKXuhl3FQJZhd7-NDo_O7YsjvPxbqks1SZIOvys0/exec', {
					method: 'POST',
					body: formData2
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
						window.location.href = 'https://docs.google.com/spreadsheets/d/1ooPcYuXntzbW-Yj2bgCYGd_3S_xNAbwgk6D1opsVgXs/edit?resourcekey=&gid=618835355';
					});
					
					document.getElementById('btnNao').addEventListener('click', () => {
						form.reset();
						
						const choicesElements = form2.querySelectorAll('select');
						choicesElements.forEach(select => {
							if (select.choicesInstance) {
								select.choicesInstance.removeActiveItems();
								select.choicesInstance.setChoiceByValue('');
							}
						});
						
						const sections = ['fiscalizador_conclusao', 'perito_conclusao', 'fiscalizador_justificativa', 'perito_justificativa'];
						sections.forEach(id => {
							const element = document.getElementById(id);
							if (element) element.classList.add('hidden');
						});
						
						formContainer2.classList.add('hidden');
						
						popup.remove();
						setButtonLoading(submitButton2, false);
					});	
				}).catch(error => {
					showError("Erro ao enviar: " + error.message, form2);
					setButtonLoading(submitButton2, false);
				});
			}
			
			function enviarMp(event) {
				event.preventDefault();
				
				const mpFormContainer = document.getElementById("enviar_Mp");
				const mpForm = mpFormContainer.querySelector('form');
				const mpSubmitButton = mpForm.querySelector('button[type="submit"]');
				
				mpForm.querySelectorAll(".erro-campo").forEach(el => el.remove());
				
				if (!validateForm(mpForm)) {
					return;
				}
				
				const tipoMP = document.getElementById("tipomp").value;
				if (!tipoMP) {
					const tipoMpField = document.getElementById("tipomp");
					showFieldError(tipoMpField, "Selecione um tipo de MP.");
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
					
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE INFRAÇÃO[/color][/size][/b]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores, por meio de uma fiscalização, observou que erros foram cometidos na hora da sua postagem de aula. Confira:
					
					[b]Data:[/b] ${hoje}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]Caso cometa novamente este erro, você será punido com [b]10 medalhas efetivas negativas[/b].[/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][font=Poppins][color=white]COMPROVAÇÃO[/color][/size][/b]
					[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/font][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;
					
					case "carta_50":
					dados.tipo = "Carta de Infração -50 Medalhas";
					dados.nome = document.querySelector('[name="nome_50"]').value;
					dados.infracao = document.querySelector('[name="infracao_50"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_50"]').value;
					dados.provas = document.querySelector('[name="provas_50"]').value;
					
					titulo = `[DIS] ${dados.tipo}`;
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE INFRAÇÃO[/color][/size][/b]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores, por meio de uma fiscalização, observou que erros foram cometidos na hora da sua postagem de aula. Confira:
					
					[b]Data:[/b] ${hoje}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]O erro será punido conforme os regulamentos da companhia, resultando em [b]50 medalhas efetivas negativas[/b].[/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][font=Poppins][color=white]COMPROVAÇÃO[/color][/size][/b]
					[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/font][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;
					
					case "carta_10":
					dados.tipo = "Carta de Infração -10 medalhas";
					const nome10 = document.querySelector('[name="nome_10"]').value;
					const infracao10 = document.querySelector('[name="infracao_10"]').value;
					const consideracoes10 = document.querySelector('[name="consideracoes_10"]').value;
					const prova1_10 = document.querySelector('[name="provas1_10"]').value;
					const prova2_10 = document.querySelector('[name="provas2_10"]').value;
					
					dados.nome = nome10;
					dados.infracao = infracao10;
					dados.consideracoes = consideracoes10;
					dados.provas = `Prova 1: ${prova1_10}\nProva 2: ${prova2_10}`;
					
					dados.mensagem = `[font=Poppins][table  style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE REINCIDÊNCIA[/color][/size][/b]
					
					[table  style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"]
					[center]Saudações, [color=#065708][b]${nome10}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores vem por meio de essa Mensagem Privada comunicar que você foi punido com [b]10 medalhas efetivas negativas[/b] por [b]Reincidência de infrações idênticas[/b], conforme descrito abaixo:
					
					[b]Infração:[/b] ${infracao10}
					[b]Considerações adicionais:[/b] ${consideracoes10}
					
					Reiteramos a importância da leitura de nossos documentos internos a fim de evitar punições, sendo eles:
					[url=https://www.policiarcc.com/t24992-sup-codigo-de-conduta-do-supervisor][color=green]⤳ [b][SUP] Código de Conduta do Supervisor[/b][/color][/url]
					[url=https://www.policiarcc.com/t34525-sup-codigo-penal-dos-supervisores][color=green]⤳ [b][SUP] Código Penal dos Supervisores[/b][/color][/url].
					
					[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.2em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 20px" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="width: 25%; border: none!important; overflow: hidden"][size=18][color=white][b]COMPROVAÇÃO[/b][/size]
					[size=12]DE INFRAÇÕES[/size][/color][/td][td style="border: none!important; overflow: hidden"][table style="border: none!important; overflow: hidden; padding: 15px; border-radius: 20px" bgcolor="ffffff"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][url=${prova1_10}][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmO5kei-QnqRX4JH8vq1iqKDZzrytl1DtqheLrZS18XOqq-hEedtVR467jd_pWJiVZZ-DF0UW1AzjNwerWx0Di-JvDZa7QHGV_jaHowcYswpJHlOpwDzUl6f7zveQebXK82xRH8IQyl5s/s1600/up-bb1756f80d.gif[/img]
					[color=black][size=14][b]PRIMEIRA INFRAÇÃO:[/size][/b]
					[size=11]Comprovação da primeira infração[/size][/color][/url][/td][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][url=${prova2_10}][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF3XNSFnhoM6joIZzQjK5wEm6UU7ChJQvP89CcaWI7NmRUYIY7cSSWhep4cVzO7IekIgdleFs9UCwivcz-lzI46DnUtIgAxIvJDvXuwdaH7JcluhSDMYndmbUIylh75icYChFKFVW5Icc/s1600/up-992b28f658.gif[/img]
					[color=black][size=14][b]SEGUNDA INFRAÇÃO:[/size][/b]
					[size=11]Comprovação da segunda infração[/size][/color][/url][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#E8F5E9"][size=11][center]Caso cometa novamente este erro, você será punido com uma [b]advertência escrita interna[/b].[/center][/size][/td][/tr][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					case "carta_falhas":
					dados.tipo = "Carta de Infração - Falhas";
					dados.nome = document.querySelector('[name="nome_falhas"]').value;
					dados.infracao = document.querySelector('[name="infracao_falhas"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_falhas"]').value;
					dados.provas = document.querySelector('[name="provas_falhas"]').value;
					
					const hojeFalhas = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE FALHA[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores, por meio de uma fiscalização, identificou erros em sua postagem de acompanhamentos, mensagem privada ou fiscalização. Confira:
					
					[b]Data:[/b] ${hojeFalhas}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]Caso cometa novamente este erro na próxima semana, você será punido com uma [b]Advertência Escrita Interna.[/b][/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjmO5kei-QnqRX4JH8vq1iqKDZzrytl1DtqheLrZS18XOqq-hEedtVR467jd_pWJiVZZ-DF0UW1AzjNwerWx0Di-JvDZa7QHGV_jaHowcYswpJHlOpwDzUl6f7zveQebXK82xRH8IQyl5s/s1600/up-bb1756f80d.gif[/img]
					[color=black][size=14][b]PRIMEIRA INFRAÇÃO:[/size][/b]
					[size=11]Comprovação da primeira infração[/size][/color][/url][/td][td style="border: none!important; overflow: hidden" bgcolor="f0f0f0"][url=${prova2_10}][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhF3XNSFnhoM6joIZzQjK5wEm6UU7ChJQvP89CcaWI7NmRUYIY7cSSWhep4cVzO7IekIgdleFs9UCwivcz-lzI46DnUtIgAxIvJDvXuwdaH7JcluhSDMYndmbUIylh75icYChFKFVW5Icc/s1600/up-992b28f658.gif[/img]
					[color=black][size=14][b]SEGUNDA INFRAÇÃO:[/size][/b]
					[size=11]Comprovação da segunda infração[/size][/color][/url][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#E8F5E9"][size=11][center]Caso cometa novamente este erro, você será punido com uma [b]advertência escrita interna[/b].[/center][/size][/td][/tr][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					case "carta_advint":
					dados.tipo = "Advertência Escrita Interna";
					dados.nome = document.querySelector('[name="nome_advint"]').value;
					dados.infracao = document.querySelector('[name="infracao_advint"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_advint"]').value;
					dados.provas = document.querySelector('[name="provas_advint"]').value;
					
					const hojeAdv = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE ADVERTÊNCIA[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores vem através desta Mensagem Privada informá-lo de irregularidades encontradas durante sua estadia na companhia dos supervisores. Confira: 
					
					[b]Data:[/b] ${hojeAdv}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]Advertência Escrita Interna.[/b][/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][font=Poppins][color=white]COMPROVAÇÃO[/color][/size][/b] 
					[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/font][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					case "carta_r":
					dados.tipo = "Carta de Rebaixamento";
					dados.nome = document.querySelector('[name="nome_r"]').value;
					dados.infracao = document.querySelector('[name="infracao_r"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_r"]').value;
					dados.provas = document.querySelector('[name="provas_r"]').value;
					
					const hojeReb = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE REBAIXAMENTO[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores vem através desta Mensagem Privada informá-lo de irregularidades encontradas durante sua estadia na companhia dos supervisores. Confira: 
					
					[b]Data:[/b] ${hojeReb}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]O erro será punido conforme os regulamentos da companhia, resultando em um [b]rebaixamento[/b].[/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][font=Poppins][color=white]COMPROVAÇÃO[/color][/size][/b] 
					[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/font][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;
					
					case "carta_exp":
					dados.tipo = "Carta de Expulsão";
					dados.nome = document.querySelector('[name="nome_exp"]').value;
					dados.infracao = document.querySelector('[name="infracao_exp"]').value;
					dados.consideracoes = document.querySelector('[name="consideracoes_exp"]').value;
					dados.provas = document.querySelector('[name="provas_exp"]').value;
					
					const hojeExp = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=Poppins][table       style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img]
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]NOTIFICAÇÃO DE EXPULSÃO[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores vem através desta Mensagem Privada informá-lo de irregularidades encontradas durante sua estadia na companhia dos supervisores. Confira: 
					
					[b]Data:[/b] ${hojeExp}
					[b]Infração:[/b] ${dados.infracao}
					[b]Considerações:[/b] ${dados.consideracoes}
					
					[/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="E8F5E9"][center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]expulsão[/b].[/center][/td][/tr][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][center][table  style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#033b05"][url=${dados.provas}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${dados.provas}][font=Poppins][color=white]COMPROVAÇÃO[/color][/size][/b] 
					[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/font][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					case "carta_canc":
					dados.tipo = "Carta de Cancelamento de Infração";
					dados.nome = document.querySelector('[name="nome_canc"]').value;
					dados.infracao = document.querySelector('[name="infracao_canc"]').value;
					dados.consideracoes = document.querySelector('[name="explicativa_canc"]').value;
					
					const hojeCanc = new Date().toLocaleDateString("pt-BR");
					
					dados.mensagem = `[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img][/td][/tr]
					
					[tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]CANCELAMENTO DE INFRAÇÃO[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores, por meio de uma fiscalização, observou que uma infração foi aplicada de forma errônea para você. Confira:
					
					[b]Data:[/b] ${hojeCanc}
					[b]Infração Cancelada:[/b] ${dados.infracao}
					[b]Explicativa:[/b] ${dados.consideracoes} [/td][/tr][/table][/td][/tr]
					
					[tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][table style="border-radius: 15px; overflow: hidden; width: 40%; margin: auto;" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden; text-align: center; vertical-align: middle;"][b][size=12][color=white]Pedimos desculpas pelo equívoco.[/size][/color][/b]
					[size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					case "carta_int":
					dados.tipo = "Carta de Intimação";
					dados.nome = document.querySelector('[name="nome_int"]').value;
					dados.consideracoes = document.querySelector('[name="comunicado_int"]').value;
					
					dados.mensagem = `[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#044906"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/VgblWsZ.gif[/img][/td][/tr]
					
					[tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden"][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#033b05"]
					[img(50px,50px)]https://i.imgur.com/HbZjO3l.png[/img]
					[b][size=18][color=white]CARTA DE INTIMAÇÃO[/color][/size][/b] 
					
					[table       style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${dados.nome}[/b][/color].[/center]
					A [color=#065708][b]Divisão de Investigação e Segurança[/b][/color] da Companhia dos Supervisores necessita entrar em contato com você. Confira as instruções:
					
					[b]Comunicado:[/b] ${dados.consideracoes}
					
					[center][b]Ao ler esta mensagem, entre em contato com a pessoa que enviou esta mensagem.[/b][/center]  [/td][/tr][/table][/td][/tr]
					
					[tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden" bgcolor="#044906"][table style="border-radius: 15px; overflow: hidden; width: 40%; margin: auto;" bgcolor="#033b05"][tr style="border: none!important; overflow: hidden"][td style="border: none!important; overflow: hidden; text-align: center; vertical-align: middle;"][size=11][color=white]BBCode por [url=https://system.policercc.com.br/membros/.Brendon][color=white][b].Brendon[/b][/color][/url][/color][/size][/td][/tr][/table][/td][/tr][/table][/font]
					[scroll][b]Em casos de dúvidas, procure um membro da Divisão de Investigação e Segurança[/b][/scroll]`;
					break;					
					
					default:
					alert("Tipo de MP não reconhecido.");
					return;
				}
				
				const tituloMP = `[DIS] ${dados.tipo}`;
				const mensagemMP = dados.mensagem;
				
				setButtonLoading(mpSubmitButton, true);
				
				send_MP(tituloMP, dados.nome, mensagemMP);
				
				
				const mpFormContainer2 = document.getElementById("enviar_Mp");
				const mpForm2 = mpFormContainer2.querySelector('form');
				mpForm2.reset();
				mpFormContainer2.classList.add('hidden');
				
				const blocos = document.querySelectorAll('.form-mp');
				blocos.forEach(div => div.classList.add('hidden'));
			}
			
			function send_MP(title, user, message) {
				console.log('=== ENVIANDO MENSAGEM PRIVADA ===');
				console.log('Título:', title);
				console.log('Usuário:', user);
				console.log('BBCode da mensagem:', message);
				console.log('==================================');
				
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
						const form = document.querySelector('#enviar_Mp form');
						if (form) {
							form.reset();
							
							const choicesElements = form.querySelectorAll('select');
							choicesElements.forEach(select => {
								if (select.choicesInstance) {
									select.choicesInstance.removeActiveItems();
									select.choicesInstance.setChoiceByValue('');
								}
							});
							
							const mpForms = document.querySelectorAll('.form-mp');
							mpForms.forEach(mpForm => {
								mpForm.classList.add('hidden');
							});
							
							toggleMpOptions();
						}
						popup.remove();
					});
					
					document.getElementById('btnNaoMP').addEventListener('click', () => {
						window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox';
					});
				})
				.fail(function () {
					const mpFormContainer3 = document.getElementById("enviar_Mp");
					const mpForm3 = mpFormContainer3.querySelector('form');
					const mpSubmitButton3 = mpForm3.querySelector('button[type="submit"]');
					showError("Erro ao enviar a mensagem.", mpForm3);
					setButtonLoading(mpSubmitButton3, false);
				})
				.always(function () {
					const mpFormContainer4 = document.getElementById("enviar_Mp");
					const mpForm4 = mpFormContainer4.querySelector('form');
					const mpSubmitButton4 = mpForm4.querySelector('button[type="submit"]');					setButtonLoading(mpSubmitButton4, false);
				});
			}
			
			function copiarBBCode() {
				const preview = document.getElementById('preview');
				if (!preview) {
					alert('Nenhum BBCode para copiar');
					return;
				}
				
				const bbcodeText = preview.textContent;
				
				const textarea = document.createElement('textarea');
				textarea.value = bbcodeText;
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
				
				const button = event.target;
				const originalText = button.innerHTML;
				button.innerHTML = '<i class="fas fa-check"></i> Copiado!';
				button.style.background = '#00cc6b';
				
				setTimeout(() => {
					button.innerHTML = originalText;
					button.style.background = '';
				}, 2000);
			}
			
			function fecharPreview() {
				const preview = document.getElementById('preview');
				if (preview) {
					preview.style.display = 'none';
				}
			}
			
			function enviarRequerimento(tipo) {
				const formId = tipo + '-form';
				const form = document.getElementById(formId);
				
				if (!form) {
					alert('Formulário não encontrado!');
					return;
				}
				
				form.querySelectorAll('.erro-campo').forEach(el => el.remove());
				
				let camposValidos = true;
				const camposObrigatorios = form.querySelectorAll('input[required], select[required]');
				
				camposObrigatorios.forEach(campo => {
					if (!campo.value.trim()) {
						camposValidos = false;
						
						const aviso = document.createElement('div');
						aviso.className = 'erro-campo';
						aviso.style.color = '#ff6666';
						aviso.style.fontSize = '0.875rem';
						aviso.style.marginTop = '0.5rem';
						aviso.innerHTML = '⚠️ Este campo é obrigatório';
						
						const inputGroup = campo.closest('.input-group');
						if (inputGroup && !inputGroup.querySelector('.erro-campo')) {
							inputGroup.appendChild(aviso);
						}
					}
					
					if (campo.id === 'licenca-dis-dias' && parseInt(campo.value) < 7) {
						camposValidos = false;
						
						const aviso = document.createElement('div');
						aviso.className = 'erro-campo';
						aviso.style.color = '#ff6666';
						aviso.style.fontSize = '0.875rem';
						aviso.style.marginTop = '0.5rem';
						aviso.innerHTML = '⚠️ Mínimo de 7 dias para licença';
						
						const inputGroup = campo.closest('.input-group');
						if (inputGroup && !inputGroup.querySelector('.erro-campo')) {
							inputGroup.appendChild(aviso);
						}
					}
				});
				
				if (!camposValidos) {
					alert('Por favor, preencha todos os campos obrigatórios.');
					return;
				}
				
				const bbcode = gerarBBCodeRequerimento(tipo);
				
				const textarea = document.createElement('textarea');
				textarea.id = 'fa-generated-message';
				textarea.name = 'message';
				textarea.style.display = 'none';
				textarea.value = bbcode;
				document.body.appendChild(textarea);
				
				const button = form.querySelector('button[type="button"]');
				const originalText = button.innerHTML;
				button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
				button.disabled = true;
				
				setTimeout(() => {
					console.log('=== ENVIANDO REQUERIMENTO AO TÓPICO ===');
					console.log('BBCode do requerimento:', bbcode);
					console.log('=======================================');
					
					$.post('/post', {
						t: 34995,
						message: bbcode,
						mode: 'reply',
						tid: $('[name="tid"]:first').val(),
						post: 1
					}).done(() => {
						mostrarConfirmacao();
						button.innerHTML = originalText;
						button.disabled = false;
					}).fail(() => {
						alert('Houve um erro ao enviar o requerimento! Tente novamente.');
						button.innerHTML = originalText;
						button.disabled = false;
					});
				}, 600);
			}
			
			function gerarBBCodeRequerimento(tipo) {
				let bbcode = '';
				let titulo = '';
				let nome = '';
				let campos = {};
				
				switch(tipo) {
					case 'entrada-dis':
						titulo = 'ENTRADA DE MEMBRO';
						nome = document.getElementById('entrada-dis-nome').value;
						const dataEntrada = document.getElementById('entrada-dis-data').value;
						campos.data = formatarData(dataEntrada);
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'promocao-dis':
						titulo = 'PROMOÇÃO DE MEMBRO';
						nome = document.getElementById('promocao-dis-nome').value;
						campos.cargoAtual = document.getElementById('promocao-dis-cargo-atual').value;
						campos.novoCargo = document.getElementById('promocao-dis-novo-cargo').value;
						campos.motivo = document.getElementById('promocao-dis-motivo').value;
						campos.data = formatarData(document.getElementById('promocao-dis-data').value);
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'rebaixamento-dis':
						titulo = 'REBAIXAMENTO DE MEMBRO';
						nome = document.getElementById('rebaixamento-dis-nome').value;
						campos.cargoAtual = document.getElementById('rebaixamento-dis-cargo-atual').value;
						campos.novoCargo = document.getElementById('rebaixamento-dis-novo-cargo').value;
						campos.motivo = document.getElementById('rebaixamento-dis-motivo').value;
						campos.data = formatarData(document.getElementById('rebaixamento-dis-data').value);
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'expulsao-dis':
						titulo = 'EXPULSÃO DE MEMBRO';
						nome = document.getElementById('expulsao-dis-nome').value;
						campos.motivo = document.getElementById('expulsao-dis-motivo').value;
						campos.comprovacoes = document.getElementById('expulsao-dis-comprovacoes').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'advertencia-dis':
						titulo = 'ADVERTÊNCIA';
						nome = document.getElementById('advertencia-dis-nome').value;
						campos.motivo = document.getElementById('advertencia-dis-motivo').value;
						campos.permissao = document.getElementById('advertencia-dis-permissao').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'licenca-dis':
						titulo = 'LICENÇA / RESERVA';
						nome = document.getElementById('licenca-dis-nome').value;
						campos.dias = document.getElementById('licenca-dis-dias').value;
						campos.permissao = document.getElementById('licenca-dis-permissao').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'saida-dis':
						titulo = 'SAÍDA DE MEMBRO';
						nome = document.getElementById('saida-dis-nome').value;
						campos.motivo = document.getElementById('saida-dis-motivo').value;
						campos.permissao = document.getElementById('saida-dis-permissao').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'prolongamento-dis':
						titulo = 'PROLONGAMENTO DE LICENÇA';
						nome = document.getElementById('prolongamento-dis-nome').value;
						campos.dias = document.getElementById('prolongamento-dis-dias').value;
						campos.permissao = document.getElementById('prolongamento-dis-permissao').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'retorno-dis':
						titulo = 'RETORNO DE LICENÇA / RESERVA';
						nome = document.getElementById('retorno-dis-nome').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'alteracao-dis':
						titulo = 'ALTERAÇÃO DE NICKNAME';
						nome = document.getElementById('alteracao-dis-nome-antigo').value;
						campos.cargo = document.getElementById('alteracao-dis-cargo').value;
						campos.nomeNovo = document.getElementById('alteracao-dis-nome-novo').value;
						bbcode = gerarBBCodeBase(titulo, nome, campos);
						break;
						
					case 'atualizacao-dis':
						titulo = 'ATUALIZAÇÃO DE LISTAGEM';
						const tag = document.getElementById('atualizacao-dis-nome').value;
						
						bbcode = '[color=#30a737][b][/b][/color] [table  class="rank suptable" style="border: none!important; margin: 1em; padding: 1.4em; line-height: 1.4em;"][tr style="border: none;"][td style="border: none!important;"][img]https://i.imgur.com/HbZjO3l.png[/img]\n';
						bbcode += `[font=Poppins][color=white][size=15][b][DIS] Atualização realizada! [${tag}][/b][/size]\n`;
						bbcode += '[b]Foi realizada uma atualização neste horário, em caso de erros, consulte um membro da Liderança da DIS.[/b][/color][/font][/td][/tr][/table]';
						break;
				}
				
				return bbcode;
			}
			
			function gerarBBCodeBase(titulo, nome, campos = {}) {
				let camposHtml = '';
				
				if (campos.cargoAtual) {
					camposHtml += `[color=#ffffff][b]• Cargo Atual:[/b][/color] [color=#b0b0b0]${campos.cargoAtual}[/color]\n`;
				}
				if (campos.novoCargo) {
					camposHtml += `[color=#ffffff][b]• Novo Cargo:[/b][/color] [color=#b0b0b0]${campos.novoCargo}[/color]\n`;
				}
				if (campos.motivo) {
					camposHtml += `[color=#ffffff][b]• Motivo:[/b][/color] [color=#b0b0b0]${campos.motivo}[/color]\n`;
				}
				if (campos.data) {
					camposHtml += `[color=#ffffff][b]• Data:[/b][/color] [color=#b0b0b0]${campos.data}[/color]\n`;
				}
				if (campos.dias) {
					camposHtml += `[color=#ffffff][b]• Quantidade de Dias:[/b][/color] [color=#b0b0b0]${campos.dias}[/color]\n`;
				}
				if (campos.permissao) {
					camposHtml += `[color=#ffffff][b]• Permissão de:[/b][/color] [color=#b0b0b0]${campos.permissao}[/color]\n`;
				}
				if (campos.comprovacoes) {
					camposHtml += `[color=#ffffff][b]• Comprovações:[/b][/color] [color=#b0b0b0]${campos.comprovacoes}[/color]\n`;
				}
				if (campos.cargo) {
					camposHtml += `[color=#ffffff][b]• Cargo:[/b][/color] [color=#b0b0b0]${campos.cargo}[/color]\n`;
				}
				if (campos.nomeNovo) {
					camposHtml += `[color=#ffffff][b]• Novo Nome:[/b][/color] [color=#b0b0b0]${campos.nomeNovo}[/color]\n`;
				}

				return `[font=Poppins][table style="width: 100%; border: none!important; border-radius: 10px; overflow: hidden;" bgcolor="#000000"][tr style="border: none!important;"][td style="border: none!important; padding: 0;"]

[table style="width: 100%; border: none!important; background: linear-gradient(135deg, #1a1a1a 0%, #0a2a0a 50%, #1a4d1a 100%);" bgcolor="#1a1a1a"][tr style="border: none!important;"][td style="border: none!important; text-align: center; padding: 15px;"][img(80px,80px)]https://i.imgur.com/fAzB0kn.png[/img]
[size=15][b][color=#228b22]${titulo}[/color][/b][/size]
[size=10][color=#b0b0b0]Divisão de Investigação e Segurança[/color][/size]

[color=#ffffff][b]• Nome:[/b][/color] [color=#b0b0b0]${nome}[/color]
${camposHtml}
[/td][/tr][/table]

[center][color=white][b][size=10] BBCode por laurocg2 - Todos os direitos reservados à Divisão de Investigação e Segurança (DIS).[/size][/b][/color][/center]
[/td][/tr][/table][/font]`;
			}
			
			function formatarData(dataISO) {
				if (!dataISO) return '';
				const [ano, mes, dia] = dataISO.split('T')[0].split('-');
				return `${dia}/${mes}/${ano}`;
			}
			
			function mostrarConfirmacao() {
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
						<h2 style="margin-top: 0; color: #00cc6b;">Requerimento Enviado!</h2>
						<p>Seu requerimento foi postado com sucesso no tópico oficial.</p>
						<div style="margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
							<button id="btnSim" style="
								padding: 10px 20px;
								background-color: #00cc6b;
								color: white;
								border: none;
								border-radius: 8px;
								cursor: pointer;
								font-weight: bold;
							">Enviar Outro</button>
							<button id="btnNao" style="
								padding: 10px 20px;
								background-color: #ff6666;
								color: white;
								border: none;
								border-radius: 8px;
								cursor: pointer;
								font-weight: bold;
							">Ver Tópico</button>
						</div>
					</div>
				</div>
				`;
				
				document.body.appendChild(popup);
				
				document.getElementById('btnSim').addEventListener('click', () => {
					document.querySelectorAll('.requerimento-form').forEach(form => {
						form.reset();
						form.style.display = 'none';
					});
					
					const selectedText = document.querySelector('#requerimentos-dropdown-btn .selected-text');
					if (selectedText) {
						selectedText.textContent = 'Selecione um tipo de requerimento';
					}
					
					popup.remove();
				});
				
				document.getElementById('btnNao').addEventListener('click', () => {
					window.location.href = 'https://' + location.host + '/t34995-?view=newest';
				});
			}
			
			function initializeRequerimentosDropdown() {
				console.log('Tentando inicializar dropdown de requerimentos...');
				
				const dropdownBtn = document.getElementById('requerimentos-dropdown-btn');
				const dropdownContent = document.getElementById('requerimentos-dropdown-content');
				
				if (!dropdownBtn || !dropdownContent) {
					console.log('Elementos do dropdown de requerimentos não encontrados');
					return;
				}
				
				const dropdownItems = document.querySelectorAll('#requerimentos-dropdown-content .dropdown-item');
				const selectedText = dropdownBtn.querySelector('.selected-text');
				const chevronIcon = dropdownBtn.querySelector('.fas.fa-chevron-down');
				
				if (!selectedText || !chevronIcon || dropdownItems.length === 0) {
					console.log('Elementos internos do dropdown não encontrados');
					return;
				}
				
				if (dropdownBtn.hasAttribute('data-initialized')) {
					console.log('Dropdown já foi inicializado');
					return;
				}
				dropdownBtn.setAttribute('data-initialized', 'true');
				
				function closeDropdown() {
					dropdownContent.style.display = 'none';
					chevronIcon.style.transform = 'rotate(0deg)';
				}
				
				function openDropdown() {
					dropdownContent.style.display = 'block';
					chevronIcon.style.transform = 'rotate(180deg)';
				}
				
				dropdownBtn.addEventListener('click', function(e) {
					console.log('Dropdown button clicked!');
					e.stopPropagation();
					if (dropdownContent.style.display === 'block') {
						console.log('Fechando dropdown');
						closeDropdown();
					} else {
						console.log('Abrindo dropdown');
						openDropdown();
					}
				});
				
				dropdownItems.forEach(item => {
					item.addEventListener('click', function(e) {
						e.stopPropagation();
						
						selectedText.textContent = this.textContent.trim();
						
						document.querySelectorAll('.requerimento-form').forEach(form => {
							form.style.display = 'none';
						});
						
						const formId = this.dataset.form + '-form';
						const selectedForm = document.getElementById(formId);
						if (selectedForm) {
							selectedForm.style.display = 'block';
						}
						
						closeDropdown();
					});
				});
				
				document.addEventListener('click', function(e) {
					if (!dropdownBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
						closeDropdown();
					}
				});
				
				console.log('Dropdown de requerimentos inicializado com sucesso!');
			}
			
			document.addEventListener('DOMContentLoaded', function () {
				forceCustomCursor();
				
				
				addKeyboardSupport();
				
				try {
					initializeChoices();
				} catch (error) {
					showError('Erro ao inicializar seletores: ' + error.message);
				}
				
				enhanceFormValidation();
			});
			
			function initializeChoices() {
				document.querySelectorAll('select').forEach(function(selectElement) {
					if (!selectElement.choicesInstance && !selectElement.classList.contains('choices__input')) {
						selectElement.choicesInstance = new Choices(selectElement, {
							searchEnabled: false,
							itemSelectText: '',
							shouldSort: false,
							placeholder: true,
							placeholderValue: 'Selecione uma opção...',
							allowHTML: true,
							classNames: {
								containerOuter: 'choices',
								containerInner: 'choices__inner',
								input: 'choices__input',
								inputCloned: 'choices__input--cloned',
								list: 'choices__list',
								listItems: 'choices__list--multiple',
								listSingle: 'choices__list--single',
								listDropdown: 'choices__list--dropdown',
								item: 'choices__item',
								itemSelectable: 'choices__item--selectable',
								itemDisabled: 'choices__item--disabled',
								itemChoice: 'choices__item--choice',
								placeholder: 'choices__placeholder',
								group: 'choices__group',
								groupHeading: 'choices__heading',
								button: 'choices__button',
								activeState: 'is-active',
								focusState: 'is-focused',
								openState: 'is-open',
								disabledState: 'is-disabled',
								highlightedState: 'is-highlighted',
								selectedState: 'is-selected',
								flippedState: 'is-flipped',
								loadingState: 'is-loading',
								noResults: 'has-no-results',
								noChoices: 'has-no-choices'
							}
						});
					}
				});
			}
			
			function enhanceFormValidation() {
				const forms = document.querySelectorAll('form');
				forms.forEach(form => {
					const inputs = form.querySelectorAll('input, select, textarea');
					inputs.forEach(input => {
						input.addEventListener('blur', debounce(function() {
							validateField(this);
						}, 300));
					});
				});
			}
			
			function validateField(field) {
				if (!field || !field.parentElement) {
					console.warn('Invalid field passed to validateField');
					return false;
				}
				
				if (field.required && !field.value.trim()) {
					return false;
				}
				
				const inputGroup = field.closest('.input-group');
				if (!inputGroup) {
					return true;
				}
				
				const existingError = inputGroup.querySelector('.erro-campo');
				if (existingError) {
					existingError.remove();
				}
				
				return true;
			}
			
			function mostrarManual(tipoManual) {
				const modal = document.getElementById('modal-manual');
				const modalTitle = document.getElementById('modal-title');
				const manualContent = document.getElementById('manual-content');
				
				const manuais = {
					'agente-mensagens': {
						titulo: 'Manual do Agente de Mensagens Diretas',
						conteudo: `
							<h1>MANUAL DO AGENTE DE MENSAGENS DIRETAS</h1>
							
							<p>O Agente de Mensagens Diretas tem por função fechar os casos e enviar as mensagens privadas aos supervisores infratores, garantindo que estes sejam notificados devidamente sobre suas infrações e como corrigi-las. Para certificar-se em qual função foi escalado, acesse o tópico [DIS] Escala Semanal e verifique a escala semanal.</p>
							
							<div class="etapa">
								<div class="etapa-titulo">• Execução da Função</div>
								<p>Ao realizar a função dos dias a qual foi designado, acesse a planilha [DIS] Central de Casos.</p>
							</div>
							
							<div class="observacao">
								<p><strong>OBSERVAÇÃO:</strong> Se houver mensagens privadas não enviadas nos dias anteriores ao seu, é seu dever enviá-las também.</p>
								<p>➜ Utilize a ferramenta de Envios de MP's diretamente na página.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Verificação de Casos</div>
								<p>Após abrir a central de casos, irá verificar quais foram os casos APROVADOS ou APROVADO (DIAS) e assim, irá fechá-los. Portanto, é necessário que abra os prints, verifique qual foi a infração cometida e envie a mensagem privada explicando detalhadamente qual foi o erro cometido e como evitá-lo nas próximas vezes.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Fechamento da Infração</div>
								<p>Ao enviar a mensagem privada, é necessário FECHAR A INFRAÇÃO para que o link da mensagem privada enviada apareça na central de casos, e assim, evitar de que haja o reenvio acidental por outro agente. Portanto, acesse a <a href="https://docs.google.com/spreadsheets/d/1ooPcYuXntzbW-Yj2bgCYGd_3S_xNAbwgk6D1opsVgXs/edit?resourcekey=&gid=618835355" target="_blank">[DIS] Central de Acessos</a>, vá até a aba Registros de casos e selecione Fechamento de Infração, coloque a ordem (coluna B da planilha) do seu caso, e anexe o print da MP no campo de Comprovação.</p>
							</div>
							
							<div class="observacao">
								<p><strong>OBSERVAÇÃO:</strong> No campo VEREDITO escreva Advertência Verbal, visto que o veredito já estará designado pelo perito.</p>
								<p><strong>OBSERVAÇÃO 2:</strong> O Agente de Mensagens Diretas só irá fechar os casos em que o veredito seja Advertência Verbal; Qualquer veredito diferente o caso deverá ser fechado pelo perito.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Envio de Mensagem Privada</div>
								<p>Na ferramenta de envio de MP, selecione a opção Advertência Verbal, coloque o nome do supervisor infrator, a infração cometida (de acordo com a central de casos), as considerações (detalhamento e explicações do erro e como evitá-lo) e por fim, as provas, que já estarão anexadas na central de caso, bastando copiar e colar o link enviado pelo fiscalizador.</p>
							</div>
							
							<h2>QUADRO DE ADVERTÊNCIAS</h2>
							
							<p>O ultimo passo para concluir sua função é a postagem das advertências verbais aprovadas no tópico <a href="https://www.policiarcc.com/t35859-sup-quadro-de-advertencias" target="_blank">[SUP] Quadro de Advertências</a>.</p>
							
							<p>Ao abrir o tópico, preencha com as informações pedidas:</p>
							
							<ul>
								<li>➜ Seu nick</li>
								<li>➜ Nick do infrator: (Nome do supervisor infrator)</li>
								<li>➜ Cargo do infrator: (Supervisor, Tutor, Fiscalizador ou Graduador)</li>
								<li>➜ Motivo: (Cole aqui a infração da central de casos)</li>
								<li>➜ Data de começo: (dia em que a mensagem privada foi enviada)</li>
							</ul>
							
							<p>Após isso, clique em enviar.</p>
							
							<div class="etapa">
								<div class="etapa-titulo">• Conclusão da Função</div>
								<p>Ao finalizar a sua função, você deve postar a conclusão de sua função, para isso, acesse a Central de Acessos e utilize a aba de Conclusão de Funções.</p>
							</div>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> Caso não realize sua função a tempo, terá 24h após o fim dela para justificar. As justificativas são para casos de extrema necessidade, o que demanda bom senso para utilizar este recurso, que é limitado a dois por quinzena.</p>
							</div>
						`
					},
					'fiscalizacao-listagem': {
						titulo: 'Manual de Fiscalização de Listagem',
						conteudo: `
							<h1>MANUAL DE FISCALIZAÇÃO DE LISTAGEM</h1>
							
							<p>A fiscalização de listagem envolve a análise do trabalho realizado pelos fiscalizadores (Fisc.SUP) da companhia dos Supervisores em suas respectivas funções. Durante essa fiscalização, é possível identificar erros, corrigi-los e/ou aplicar punições conforme a gravidade, sendo essa uma responsabilidade dos membros da Divisão de Investigação e Segurança. A função da fiscalização de listagem é dividida em duas etapas: a primeira função ocorre na quarta-feira e a segunda função no domingo da semana vigente. Para confirmar a função para a qual foi escalado, acesse o tópico [DIS] Escala Semanal e consulte a escala semanal.</p>
							
							<h2>PRIMEIRA FUNÇÃO</h2>
							
							<div class="etapa">
								<div class="etapa-titulo">• Execução da Fiscalização</div>
								<p>Na primeira função, o fiscalizador da DIS deverá desempenhar a mesma função dos Fisc.SUP, que é fiscalizar a listagem no RCCSystem. Após verificar na escala qual patente/cargo e quantidade de militares que irá fiscalizar, deverá acessar a listagem da respectiva patente/cargo.</p>
							</div>
							
							<div class="destaque">
								<p>➜ Para acessar a listagem do Corpo de Praças, <a href="https://system.policercc.com.br/listagem/pracas" target="_blank">clique aqui</a>.</p>
								<p>➜ Para acessar a listagem do Corpo Executivo, <a href="https://system.policercc.com.br/listagem/executivos" target="_blank">clique aqui</a>.</p>
							</div>
							
							<div class="observacao">
								<p><strong>Exemplo:</strong> A fiscalizadora da DIS Shadye foi escalada para verificar o cargo Assessor de 1 a 50, então ela acessará a listagem e pesquisará no console do Habbo (aba de Procurar Habbos) os primeiros 50 nicks que aparecem na listagem do respectivo cargo e verificará se eles infringem alguma regra estabelecida pelo manual.</p>
							</div>
							
							<h3>Regras para Verificação e Remoção:</h3>
							
							<ul>
								<li>➤ Não possuem mais vínculo com a RCC;</li>
								<li>➤ Nick inexistente no Habbo Hotel;</li>
								<li>➤ Praças do Corpo Militar com mais de 31 dias offline;</li>
								<li>➤ Praças do Corpo Militar que não possuem o grupo Corpo de Praças ou de Asp. a Oficial/Equivalência após 03 meses de sua promoção;</li>
								<li>➤ Praças do Corpo Militar que tenham ultrapassado 31 dias na mesma patente e esteja com o perfil em modo oculto;</li>
								<li>➤ Praças do Corpo Militar ou Executivos que estão em outras organizações militares (traição);</li>
								<li>➤ Executivos com mais de 89 dias offline.</li>
							</ul>
							
							<div class="observacao">
								<p><strong>Observação:</strong> Caso seja mobile, sugerimos o Contador de Dias para certificar-se corretamente dos dias offline do militar.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Registro de Irregularidades</div>
								<p>Caso encontre um militar que deva ser retirado na fiscalização, registre-o na planilha <a href="https://docs.google.com/spreadsheets/d/1vueKsH92BbWkLx-t2YRTJjtXnUyB78DJTB1BdLeoU_8/edit#gid=1213688892" target="_blank">[DIS] Fiscalização de Listagem</a>, com o nick, motivo pelo qual deve ser removido e link do print screen hospedado comprovando a irregularidade.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Conclusão da Primeira Função</div>
								<p>Ao finalizar a fiscalização da primeira função, poste a conclusão da função com a opção "Primeira função" na aba Conclusão de Funções da Central de Acessos.</p>
							</div>
							
							<h2>SEGUNDA FUNÇÃO</h2>
							
							<div class="etapa">
								<div class="etapa-titulo">• Fiscalização do Trabalho do Fisc.SUP</div>
								<p>Na segunda função, realizada no domingo, é necessário fiscalizar o trabalho postado pelo Fisc.SUP durante a execução de sua função. Acesse a aba de fiscalização de listagens no RCCSystem <a href="https://system.policercc.com.br/requerimentos/fiscalizacao_listagem" target="_blank">clicando aqui</a> e localize a postagem da patente/cargo fiscalizada na primeira função. Compare os nicks adicionados na planilha com os postados pelo Fisc.SUP. Se algum nick registrado na planilha não tiver sido removido, o Fisc.SUP deverá receber uma advertência verbal.</p>
							</div>
							
							<div class="observacao">
								<p><strong>Exemplo:</strong> A fiscalizadora Shadye registrou na planilha o nick do Assessor Joãozinho, pois ele estava offline há mais de 89 dias com a devida comprovação. No entanto, ele não foi removido na fiscalização de listagem realizada pelo Fisc.SUP responsável por aquele cargo, portanto, o fiscalizador será punido.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Abertura de Infração</div>
								<p>Para postar uma irregularidade após encontrá-la, registre a abertura da infração na aba Registros de Casos da Central de Acessos, indicando qual foi o erro encontrado, neste caso, o motivo é "Não retirar algum militar na fiscalização de listagem que contenha os requisitos para retirada.". Se for reincidente, a infração deve ser aberta com o motivo "Reincidência de infrações idênticas."</p>
								<p><strong>Lembre-se:</strong> O Agente de Mensagens Diretas é quem irá fechar a infração e enviar a mensagem privada.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Conclusão da Segunda Função</div>
								<p>Ao finalizar a fiscalização da segunda função, poste a conclusão da função com a opção "Segunda Função" na aba Conclusão de Funções da Central de Acessos.</p>
								<p><strong>Observação:</strong> O campo "Comprovações" só deve ser preenchido em caso de registro de infrações.</p>
								<p>➜ O print screen anexado deve conter todas as infrações registradas naquela fiscalização na planilha [DIS] Central de Casos.</p>
							</div>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> Caso não realize sua função a tempo, terá 24h após o fim dela para justificar. As justificativas são para casos de extrema necessidade, o que demanda bom senso para utilizar este recurso, que é limitado a uma por quinzena.</p>
							</div>
						`
					},
					'fiscalizacao-falhas': {
						titulo: 'Manual de Fiscalização de Falhas',
						conteudo: `
							<h1>MANUAL DE FISCALIZAÇÃO DE FALHAS</h1>
							
							<p>A fiscalização de falhas trata-se de analisar as funções realizadas pelos tutores e fiscalizadores dos Supervisores. A função é dividida em duas partes: uma de fiscalização de segunda a quarta-feira e outra de quinta-feira a sábado, devendo ser concluída 24h após o dia escalado, ou seja, até às 23h59 das quintas e domingos. Para certificar-se em qual função foi escalado, use a Central de Acessos e verifique a escala semanal.</p>
							
							<div class="etapa">
								<div class="etapa-titulo">• Acesso às Planilhas</div>
								<p>Ao realizar a fiscalização do dia a qual foi designado, acesse a planilha <a href="https://docs.google.com/spreadsheets/d/1CCppNkbcAYZVCpTTPkVRcC59CZEQy-TL1KGmquwTtTY/edit?gid=1928847610" target="_blank">[DIS] Fiscalizações de Relatórios</a>.</p>
							</div>
							
							<div class="destaque">
								<p>➜ Para acessar a planilha de fiscalização de relatórios dos <strong>TUTORES</strong>, <a href="https://docs.google.com/spreadsheets/d/1CCppNkbcAYZVCpTTPkVRcC59CZEQy-TL1KGmquwTtTY/edit?gid=1622910416#gid=1622910416" target="_blank">clique aqui</a>.</p>
								<p>➜ Para acessar a planilha de fiscalização de relatórios dos <strong>FISCALIZADORES</strong>, <a href="https://docs.google.com/spreadsheets/d/1CCppNkbcAYZVCpTTPkVRcC59CZEQy-TL1KGmquwTtTY/edit?gid=1917912599#gid=1917912599" target="_blank">clique aqui</a>.</p>
								<p>➜ As aulas aplicadas na semana anterior, ficam armazenadas na aba [SUP] Backup.</p>
							</div>
							
							<h2>REGRAS DE FISCALIZAÇÃO</h2>
							
							<p>Após abrir o relatório, deve atentar-se às seguintes regras:</p>
							
							<ul>
								<li>➜ Prints em desacordo com o manual da função dos tutores e fiscalizadores;</li>
								<li>➜ Comprovações incompletas, inexistentes ou inacessíveis;</li>
								<li>➜ Comprovações de tutoria sem início, meio ou fim (pelo menos três prints). Verifique um exemplo de uma tutoria correta;</li>
								<li>➜ Acompanhamento de uma mesma modalidade de aula aplicada pelo mesmo supervisor;</li>
								<li>➜ Não envio da Mensagem Privada a todos os supervisores escalados (para isto, verifique a escala semanal dos tutores);</li>
								<li>➜ Não envio da Mensagem Privada dentro do prazo estipulado (quarta-feira da semana vigente);</li>
								<li>➜ Comentários no local designado aos prints;</li>
								<li>➜ Postagem de fiscalização de listagem não aprovada pelo Centro de Recursos Humanos. Verifique um exemplo de postagem correta.</li>
							</ul>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> O fiscalizador que estiver verificando as falhas de Segunda a Quarta NÃO deve postar falhas pelo não envio das mensagens privadas, visto que o tutor tem até sábado para fazer a postagem do envio.</p>
							</div>
							
							<div class="destaque">
								<p>➜ Para acessar o manual de função dos <strong>TUTORES</strong>, <a href="https://www.policiarcc.com/t36073-tut-manual-de-funcao" target="_blank">clique aqui</a>.</p>
								<p>➜ Para acessar o manual de função dos <strong>FISCALIZADORES</strong>, <a href="https://www.policiarcc.com/t25023-fisc-manual-de-funcao" target="_blank">clique aqui</a>.</p>
							</div>
							
							<div class="observacao">
								<p><strong>Observação¹:</strong> Caso o tutor/fiscalizador cometa a mesma falha por duas semanas consecutivas, este deve receber uma advertência escrita interna.</p>
								<p><strong>Observação²:</strong> Nos casos em que não houver erros na fiscalização, deve-se apenas registrar a função no formulário de conclusão. No entanto, se forem encontradas falhas não reportadas, o fiscalizador responsável será punido.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Verificação de Justificativas</div>
								<p>Ao encontrar uma função não feita (Ex: Envio de mensagens privadas pelo tutor) em sua fiscalização, acesse a planilha <a href="https://docs.google.com/spreadsheets/d/1B0u3QEtrV8vYLkrQLxZteUNQYSntnTqnRZGgGwbZc24/edit?gid=230664176" target="_blank">[SUP] Justificativas de metas</a> para verificar se houve justificativa da meta. Caso haja, a punição não deve ser aplicada.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Registro de Falhas</div>
								<p>Ao encontrar falhas na sua fiscalização, use a aba Registros de Casos da Central de Acesso e registre a falha encontrada.</p>
								<p>➜ Para verificar possíveis reincidências acesse <a href="https://docs.google.com/spreadsheets/d/1RRd7a8-1EoWZpPUqz5D-vm9JazqOi9vdV5DjySxZFQE/edit?gid=205896872" target="_blank">[DIS] Central de Casos</a> e verifique a aba [DIS] Falhas.</p>
								<p>➜ Caso o tutor/fiscalizador obtenha falhas em semanas consecutivas, o fiscalizador da DIS deverá apenas abrir a infração em [DIS] Central de Registros de Casos para que um perito aplique a advertência escrita interna e feche a infração.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Envio de Mensagem Privada</div>
								<p>Após registrar a falha cometida pelo tutor/fiscalizador, envie uma Mensagem Privada para o infrator alertando-o do erro, seguindo o modelo do tópico <a href="https://www.policiarcc.com/t35000-dis-notificacoes" target="_blank">[DIS] Notificações</a>.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Conclusão da Função</div>
								<p>Ao finalizar, poste a conclusão da função na aba Conclusão de Funções da Central de Acessos.</p>
								<p><strong>Observação:</strong> O campo "Comprovações" só deve ser preenchido em caso de registro de falhas.</p>
								<p>➜ O printscreen anexado deve conter todas as falhas registradas em [DIS] Central de Casos.</p>
							</div>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> Caso não realize sua função a tempo, terá 24h após o fim dela para justificar. As justificativas são para casos de extrema necessidade, o que demanda bom senso para utilizar este recurso, que é limitado a uma por quinzena.</p>
							</div>
						`
					},
					'fiscalizacao-aulas': {
						titulo: 'Manual de Fiscalização de Aulas e Graduações',
						conteudo: `
							<h1>MANUAL DE FISCALIZAÇÃO DE AULAS E GRADUAÇÕES</h1>
							
							<p>A fiscalização de aulas e graduações consiste em analisar as aplicações realizadas pelos membros da companhia dos Supervisores nas aulas de SUP, SEG, PRO e graduações. Durante essa fiscalização, é possível identificar erros, corrigi-los e/ou aplicar punições conforme a gravidade, sendo essa uma responsabilidade dos membros da Divisão de Investigação e Segurança. Para confirmar a função para a qual foi escalado, use a Central de Acessos e verifique a escala semanal.</p>
							
							<h2>FISCALIZAÇÃO DE AULAS</h2>
							
							<div class="observacao">
								<p><strong>Exemplo:</strong> A fiscalizadora Shadye foi escalada para verificar as aulas e graduações do dia 2 de junho de 2024. Dessa forma, ela realizará a função 48 horas depois, ou seja, no dia 4 de junho de 2024.</p>
								<p><strong>Por que essa distância de tempo?</strong> O supervisor tem 24 horas a partir da postagem da aula para corrigir qualquer erro cometido. Assim, o membro da companhia pode ter consertado o erro, tornando o trabalho do fiscalizador mais fluido e objetivo.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Execução da Fiscalização</div>
								<p>Para realizar sua função, deve abrir a planilha de <a href="https://docs.google.com/spreadsheets/d/1CCppNkbcAYZVCpTTPkVRcC59CZEQy-TL1KGmquwTtTY/edit?gid=1928847610" target="_blank">[DIS] Fiscalização de Relatórios</a>. Em seguida, encontre o dia das aulas e graduações aplicadas no dia da FUNÇÃO na escala. Exemplo: FUNÇÃO dia 10 e PRAZO dia 12: No dia 12 irei fiscalizar as aulas do dia 10.</p>
							</div>
							
							<h3>Regras para Fiscalização de Aulas:</h3>
							
							<ul>
								<li>➜ Data e hora em que a aula foi postada (compare a data e horário postado com o iniciado);</li>
								<li>➜ Nickname do supervisor e aluno;</li>
								<li>➜ Modalidade da aula;</li>
								<li>➜ Postagem no RCCSystem (se foi postada dentro de 15 minutos após a finalização no relatório e vice-versa);</li>
								<li>➜ Se o aluno possuía os cursos corretos (CAS para Soldados, CFC para Cabos, API/Av-CE para membros do Corpo Executivo e CAP para Subtenentes);</li>
								<li>➜ Local de aplicação da aula;</li>
								<li>➜ Se o supervisor+ aplicou a mesma modalidade de aula três vezes ou mais para o mesmo aluno;</li>
								<li>➜ Comprovante que o aluno caiu na metade da aula, com balão de fala, histórico e perfil do aluno visíveis;</li>
								<li>➜ Comprovações completas, com data e hora, sem cortes ou rasuras desnecessárias;</li>
								<li>➜ Postagem duplicada;</li>
								<li>➜ Postagem do próprio PRO em relatórios de aplicação;</li>
								<li>➜ Aplicação de PRO para outro supervisor;</li>
								<li>➜ Postagem apenas no RCCSystem e não em relatórios de aplicações (para isto, deve fiscalizar o dia no qual ficou responsável no RCCSystem também).</li>
							</ul>
							
							<div class="observacao">
								<p><strong>Observação:</strong> Ao encontrar uma irregularidade na sua fiscalização, veja na aba CORREÇÕES da planilha se o supervisor postou alguma correção para o erro encontrado. Se sim, verifique se foi dentro do prazo de 24 horas (caso não esteja dentro do prazo, a punição segue). Se não houve postagem de correção, então uma punição deve ser aplicada.</p>
							</div>
							
							<h2>FISCALIZAÇÃO DE GRADUAÇÕES</h2>
							
							<div class="etapa">
								<div class="etapa-titulo">• Execução da Fiscalização</div>
								<p>Para realizar a fiscalização de graduações, abra o tópico Requerimentos da Companhia junto da aba de relatórios de graduações na planilha de Fiscalização de Relatórios, seguindo as seguintes regras:</p>
							</div>
							
							<ul>
								<li>➜ Momento em que a graduação foi postada (a graduação deve ser postada no relatório e requerimentos no mesmo dia);</li>
								<li>➜ Nickname do Graduador e aluno;</li>
								<li>➜ Modalidade da graduação;</li>
								<li>➜ Postagem nos requerimentos da companhia;</li>
								<li>➜ Se o supervisor possuía os requisitos;</li>
								<li>➜ Se a graduação foi postada em ambos os destinos (Requerimentos da Companhia e Relatório de Graduações).</li>
							</ul>
							
							<div class="observacao">
								<p><strong>Observação:</strong> A graduação pode ser postada com mais de 15 minutos de diferença, desde que seja postada em ambos os destinos no mesmo dia, até as 23h59.</p>
							</div>
							
							<h2>REINCIDÊNCIA</h2>
							
							<div class="etapa">
								<div class="etapa-titulo">• Verificação de Reincidência</div>
								<p>O primeiro passo após encontrar uma irregularidade é verificar se ela é reincidente, para isso, utilize a planilha <a href="https://docs.google.com/spreadsheets/d/1RRd7a8-1EoWZpPUqz5D-vm9JazqOi9vdV5DjySxZFQE/edit?gid=205896872" target="_blank">[DIS] Central de Casos</a>, na aba [DIS] Consulta, pesquise o nick que deseja verificar. Caso apareça uma infração com 48 horas ou mais de diferença para o dia da fiscalização vigente, a reincidência deve ser aplicada.</p>
							</div>
							
							<div class="observacao">
								<p><strong>Exemplo:</strong> A supervisora Beltrana recebeu uma punição no dia 08 de Janeiro por preenchimento incorreto de informações. Sendo assim, ela só se enquadrará em reincidência se ela cometer o mesmo erro de preenchimento incorreto de informações no dia 10 de Janeiro, 48 horas após a primeira punição.</p>
							</div>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> A punição tem validade de 1 mês, portanto, o período para se configurar reincidência é:</p>
								<p>➜ 2 ocorrências do mesmo erro em um período maior que 48 horas, e menor de 30 dias.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Abertura de Infração</div>
								<p>Para postar uma irregularidade após encontrá-la, registre a abertura da infração na aba Registros de Casos da Central de Acessos, indicando qual foi o erro encontrado. Se for reincidente, a infração deve ser aberta com o motivo "Reincidência de infrações idênticas."</p>
								<p><strong>Observação:</strong> Caso tenha dúvidas sobre o procedimento para registrar uma infração ou em qual punição ela se encaixa, consulte a aba [DIS] Quadro de Infrações na planilha [DIS] Central de Casos, que detalha as ações a serem tomadas para cada tipo de infração.</p>
							</div>
							
							<div class="etapa">
								<div class="etapa-titulo">• Conclusão da Função</div>
								<p>Ao finalizar, poste a conclusão da função na aba Conclusão de Funções da Central de Acessos.</p>
								<p><strong>Observação:</strong> O campo "Comprovações" só deve ser preenchido em caso de registro de infrações.</p>
								<p>➜ O print screen anexado deve conter todas as infrações registradas naquela fiscalização na planilha [DIS] Central de Casos.</p>
							</div>
							
							<div class="atencao">
								<p><strong>ATENÇÃO:</strong> Caso não realize sua função a tempo, terá 24h após o fim dela para justificar. As justificativas são para casos de extrema necessidade, o que demanda bom senso para utilizar este recurso, que é limitado a uma por quinzena.</p>
							</div>
						`
					}
				};
				
				if (manuais[tipoManual]) {
					modalTitle.innerHTML = `<i class="fas fa-book"></i> ${manuais[tipoManual].titulo}`;
					manualContent.innerHTML = manuais[tipoManual].conteudo;
					modal.classList.remove('hidden');
					
					const closeOnEsc = (e) => {
						if (e.key === 'Escape') {
							fecharManual();
							document.removeEventListener('keydown', closeOnEsc);
						}
					};
					document.addEventListener('keydown', closeOnEsc);
				}
			}
			
			function fecharManual() {
				const modal = document.getElementById('modal-manual');
				modal.classList.add('hidden');
			}
