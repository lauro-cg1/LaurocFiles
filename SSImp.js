 console.log("SSI MP v1.0");
        
        if (typeof selectedMessageType === 'undefined') {
            var selectedMessageType = null;
        }

        function initSSI() {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', setupSSIEventListeners);
            } else {
                setupSSIEventListeners();
            }
        }

        function setupSSIEventListeners() {
            fixBrokenEmojis();
            document.querySelectorAll('.menu-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    document.querySelectorAll('.menu-btn').forEach(el => el.classList.remove('selected'));
                    this.classList.add('selected'); 
                    selectedMessageType = this.getAttribute('data-type');
                    generateFormFields(selectedMessageType);
                    
                    document.getElementById('formContainer').classList.add('active');
                });
            });

            const sendBtn = document.getElementById('sendBtn');
            if (sendBtn) {
                sendBtn.addEventListener('click', sendMessage);
            }
        }

        function fixBrokenEmojis() {
            const walker = document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );

            const textNodes = [];
            let node;
            
            while (node = walker.nextNode()) {
                textNodes.push(node);
            }

            textNodes.forEach(textNode => {
                let text = textNode.textContent;
                
                text = text.replace(/\?\?\?\? Punição/g, '📋 Punição');
                text = text.replace(/\?\?\?\? Convocação/g, '📞 Convocação');
                
                text = text.replace(/📋/g, '📋');
                text = text.replace(/📞/g, '📞');
                
                if (text !== textNode.textContent) {
                    textNode.textContent = text;
                }
            });
        }

        function generateFormFields(type) {
            const selectedTypeDiv = document.getElementById('selectedType');
            const formFieldsDiv = document.getElementById('formFields');
            
            let typeTitle = '';
            let fieldsHTML = '';
            
            if (type === 'punicao') {
                typeTitle = '📋 Punição';
                fieldsHTML = `
                    <div class="form-group">
                        <label for="userName">Nick do Usuário:</label>
                        <input type="text" id="userName" placeholder="Digite o nick do usuário">
                        <div class="error-message-container">
                            <div class="error-message" id="userNameError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="dataOcorrido">Data do Ocorrido:</label>
                        <input type="date" id="dataOcorrido">
                        <div class="error-message-container">
                            <div class="error-message" id="dataOcorridoError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="descricaoInfracao">Descrição da Infração:</label>
                        <textarea id="descricaoInfracao" placeholder="Descreva detalhadamente a infração cometida"></textarea>
                        <div class="error-message-container">
                            <div class="error-message" id="descricaoInfracaoError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="provas">Provas:</label>
                        <textarea id="provas" placeholder="Inclua links ou descrições das provas"></textarea>
                        <div class="error-message-container">
                            <div class="error-message" id="provasError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="orientacoes">Orientações:</label>
                        <textarea id="orientacoes" placeholder="Orientações para o usuário"></textarea>
                        <div class="error-message-container">
                            <div class="error-message" id="orientacoesError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="punicao">Punição:</label>
                        <input type="text" id="punicao" placeholder="Ex: Advertência, Expulsão, etc.">
                        <div class="error-message-container">
                            <div class="error-message" id="punicaoError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="crime">Crime:</label>
                        <input type="text" id="crime" placeholder="Especifique o crime cometido">
                        <div class="error-message-container">
                            <div class="error-message" id="crimeError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="capitulo">Selecione o Capítulo:</label>
                        <div class="select-wrapper">
                            <select id="capitulo">
                                <option value="">Selecione um capítulo</option>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                <option value="V">V</option>
                                <option value="VI">VI</option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                                <option value="IX">IX</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                            </select>
                        </div>
                        <div class="error-message-container">
                            <div class="error-message" id="capituloError"></div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="secao">Selecione a Seção:</label>
                        <div class="select-wrapper">
                            <select id="secao">
                                <option value="">Selecione uma seção</option>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                <option value="V">V</option>
                                <option value="VI">VI</option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                                <option value="IX">IX</option>
                                <option value="X">X</option>
                            </select>
                        </div>
                        <div class="error-message-container">
                            <div class="error-message" id="secaoError"></div>
                        </div>
                    </div>
                `;
            } else if (type === 'convocacao') {
                typeTitle = '📞 Convocação';
                fieldsHTML = `
                    <div class="form-group">
                        <label for="userName">Nick do Usuário:</label>
                        <input type="text" id="userName" placeholder="Digite o nick do usuário">
                        <div class="error-message-container">
                            <div class="error-message" id="userNameError"></div>
                        </div>
                    </div>
                `;
            }
            
            selectedTypeDiv.innerHTML = `<strong>${typeTitle}</strong>`;
            formFieldsDiv.innerHTML = fieldsHTML;
        }

        function clearError(inputId) {
            const input = document.getElementById(inputId);
            const errorDiv = document.getElementById(inputId + 'Error');
            
            if (input) {
                input.classList.remove('input-error');
            }
            if (errorDiv) {
                errorDiv.textContent = '';
            }
        }

        function showError(inputId, message) {
            const input = document.getElementById(inputId);
            const errorDiv = document.getElementById(inputId + 'Error');
            
            if (input) {
                input.classList.add('input-error');
            }
            if (errorDiv) {
                errorDiv.textContent = message;
            }
        }

        function resetForm() {
            document.querySelectorAll('.menu-btn').forEach(el => el.classList.remove('selected'));
            
            document.getElementById('formContainer').classList.remove('active');
            
            selectedMessageType = null;
            
            document.getElementById('formFields').innerHTML = '';
            document.getElementById('selectedType').innerHTML = '';
        }

        function validateForm() {
            let isValid = true;
            
            const userName = document.getElementById('userName');
            if (!userName || !userName.value.trim()) {
                showError('userName', 'Nome de usuário é obrigatório');
                isValid = false;
            } else {
                clearError('userName');
            }
            
            if (selectedMessageType === 'punicao') {
                const requiredFields = [
                    'dataOcorrido', 'descricaoInfracao', 'provas', 
                    'orientacoes', 'punicao', 'crime', 'capitulo', 'secao'
                ];
                
                requiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    if (!field || !field.value.trim()) {
                        showError(fieldId, 'Este campo é obrigatório');
                        isValid = false;
                    } else {
                        clearError(fieldId);
                    }
                });
            }
            
            return isValid;
        }

        function formatDate(dateString) {
            const date = new Date(dateString + 'T00:00:00');
            const months = [
                'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
                'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
            ];
            
            const day = date.getDate().toString().padStart(2, '0');
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            
            return `${day} ${month} ${year}`;
        }

        function generateMessage() {
            const userName = document.getElementById('userName').value.trim();
            
            if (selectedMessageType === 'punicao') {
                const dataOcorrido = formatDate(document.getElementById('dataOcorrido').value);
                const descricaoInfracao = document.getElementById('descricaoInfracao').value.trim();
                const provas = document.getElementById('provas').value.trim();
                const orientacoes = document.getElementById('orientacoes').value.trim();
                const punicao = document.getElementById('punicao').value.trim();
                const crime = document.getElementById('crime').value.trim();
                const capitulo = document.getElementById('capitulo').value;
                const secao = document.getElementById('secao').value;
                
                return `[center][table bgcolor="1e2a4d" style="border-radius: 23px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][img]https://i.imgur.com/WVgmuES.gif[/img]

[center][table bgcolor="#f8f8ff" style="border-radius: 16px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][font=Poppins][center][table bgcolor="1e2a4d" style="border-radius: 14px 5px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][color=#f8f8ff][b][size=18]PUNIÇÃO POR INFRAÇÃO[/size][/b][/color][/td][/tr][/table][/center]

Saudações, [b]${userName}![/b]

O [b][color=#00529e]Setor de Segurança dos Instrutores[/color][/b], por meio de uma fiscalização dos formulários de aulas, observou que alguns erros foram cometidos na postagem de sua aplicação ao longo da semana, na data de [b]${dataOcorrido}[/b].

[center][table  bgcolor="#edf5fc" style="border-radius: 16px; overflow: hidden; width: 100%; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);"][tr][td][center][table  bgcolor="1e2a4d" style="border-radius: 14px 5px 14px 5px; overflow: hidden; width: 35%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td style="padding: 7px;"][color=#f8f8ff][size=13][b]RESOLUÇÃO[/b][/size][/color][/td][/tr][/table][/center]

[justify][b][color=#1e2a4d]➥[/color][/b][b][color=#00529e] Descrição da infração:[/color][/b] ${descricaoInfracao}
[b][color=#1e2a4d]➥[/color][/b][b][color=#00529e] Provas da infração:[/color][/b] ${provas}
[b][color=#1e2a4d]➥[/color][/b][b][color=#00529e] Orientações:[/color][/b] ${orientacoes}[/justify][/td][/tr][/table][/center]

[justify][b][color=#1e2a4d]➥[/color][/b] Através desta Mensagem Privada, você está sendo notificado que foi punido com um(a) [b]${punicao}[/b] pelo crime de [b]${crime}[/b], disposto no capítulo [b]${capitulo}[/b], seção [b]${secao}[/b] do Código Penal dos Instrutores. Em caso de dúvidas sobre a punição, procure um [b]membro do Setor de Segurança dos Instrutores[/b].[/justify][/font][/td][/tr][/table][/center]

[font=Poppins][size=11][color=#f8f8ff][b][img(10px,10px)]https://i.imgur.com/GoqL8ud.png[/img] Reservam-se os direitos à Companhia dos Instrutores[/b][/size][/color][/font][/td][/tr][/table][/center]`;
                
            } else if (selectedMessageType === 'convocacao') {
                return `[center][table bgcolor="1e2a4d" style="border-radius: 23px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][img]https://i.imgur.com/WVgmuES.gif[/img]

[center][table bgcolor="#f8f8ff" style="border-radius: 16px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][font=Poppins][center][table bgcolor="1e2a4d" style="border-radius: 14px 5px; overflow: hidden; width: 100%; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);"][tr][td][color=#f8f8ff][b][size=18]CONVOCAÇÃO[/size][/b][/color][/td][/tr][/table][/center]

Saudações, [b]${userName}![/b]

O [b][color=#00529e]Setor de Segurança dos Instrutores[/color][/b], por meio de uma fiscalização dos formulários de aulas, observou que alguns erros foram cometidos na postagem de sua aplicação ao longo da semana.

[center][table  bgcolor="#edf5fc" style="border-radius: 16px; overflow: hidden; width: 100%; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);"][tr][td][justify][b][color=#1e2a4d]➥[/color][/b][b][color=#00529e] Provas da infração:[/color][/b] Conforme fiscalização realizada pelo SSI[/justify][/td][/tr][/table][/center]

[justify][b][color=#1e2a4d]➥[/color][/b] Através desta Mensagem Privada, você está sendo convocado a procurar o membro que lhe enviou essa mensagem privada, por meio do habbo hotel, em quaisquer dependências da polícia ou mesmo via console, em até 24 horas após o recebimento deste contato. Caso não o faça, será devidamente punido pelo crime cometido de acordo com o Código Penal dos Instrutores. Em caso de dúvidas, contate um [b]membro do Setor de Segurança dos Instrutores.[/b][/justify][/font][/td][/tr][/table][/center]

[font=Poppins][size=11][color=#f8f8ff][b][img(10px,10px)]https://i.imgur.com/GoqL8ud.png[/img] Reservam-se os direitos à Companhia dos Instrutores[/b][/size][/color][/font][/td][/tr][/table][/center]`;
            }
            
            return '';
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
            
            const title = selectedMessageType === 'punicao' ? '[SSI] Carta de Infração' : '[SSI] Carta de Convocação';
            
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
                successModal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                <div style="background-color: black; color: white; padding: 30px 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 1px solid #a30010;">
                <h3 style="color: white; margin-bottom: 15px;">Sucesso!</h3>
                <p>Mensagem Privada enviada para ${userName}.</p>
                <p style="margin-top: 15px;">Deseja enviar outra mensagem?</p>
                <div style="margin-top: 20px;">
                <button onclick="this.closest('.success-modal-container').remove(); resetForm();" style="padding: 10px 20px; margin: 0 10px; border: none; border-radius: 5px; background: #00529e; color: white; cursor: pointer;">Sim</button>
                <button onclick="window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox'; this.closest('.success-modal-container').remove();" style="padding: 10px 20px; margin: 0 10px; border: none; border-radius: 5px; background: #a30010; color: white; cursor: pointer;">Não</button>
                </div>
                </div>
                </div>
                `;
                successModal.firstElementChild.classList.add('success-modal-container');
                document.body.appendChild(successModal);
                
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Erro ao enviar mensagem:', textStatus, errorThrown);
                resetButton();
                
                const errorModal = document.createElement('div');
                errorModal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                <div style="background-color: black; color: white; padding: 30px 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 1px solid red;">
                <h3 style="color: white; margin-bottom: 15px;">Erro!</h3>
                <p>Ocorreu um erro ao enviar a Mensagem Privada.</p>
                <button onclick="this.parentElement.parentElement.remove();" style="padding: 10px 20px; margin-top: 15px; border: none; border-radius: 5px; background: red; color: white; cursor: pointer;">OK</button>
                </div>
                </div>
                `;
                document.body.appendChild(errorModal);
            });
        }

        (function() {
            if (typeof window !== 'undefined' && window.document) {
                setTimeout(function() {
                    initSSI();
                }, 100);
            } else {
                initSSI();
            }
        })();
