          console.log("V1.12");
  let selectedNotificationType = null;

        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function () {
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                selectedNotificationType = this.getAttribute('data-type');

                setTimeout(() => {
                    document.getElementById('menuContainer').style.display = 'none';
                    document.getElementById('formContainer').classList.add('active');
                    document.getElementById('selectedType').textContent = this.querySelector('.menu-text').textContent;
                    generateFormFields(selectedNotificationType);
                }, 300);
            });
        });

        function generateFormFields(type) {
            const formFields = document.getElementById('formFields');
            let fieldsHTML = '';

            switch (type) {
                case 'advertencia_verbal':
                case 'advertencia_interna':
                case 'expulsao':
                    fieldsHTML = `
                        <div class="form-group">
                            <label for="userName">Nome do Usuário: <small style="color: #4ade80; font-weight: normal;">(separe múltiplos usuários com /)</small></label>
                            <input type="text" id="userName" placeholder="Digite o nome do usuário (use / para múltiplos: user1 / user2 / user3)">
                            <div class="error-message-container">
                                <span class="error-message" id="error-userName"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="motivo">Motivo:</label>
                            <input type="text" id="motivo" placeholder="Digite o motivo">
                            <div class="error-message-container">
                                <span class="error-message" id="error-motivo"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="provas">Provas:</label>
                            <input type="text" id="provas" placeholder="Insira as provas">
                            <div class="error-message-container">
                                <span class="error-message" id="error-provas"></span>
                            </div>
                        </div>
                    `;
                    break;
                case 'rebaixamento':
                    fieldsHTML = `
                        <div class="form-group">
                            <label for="userName">Nome do Usuário: <small style="color: #4ade80; font-weight: normal;">(separe múltiplos usuários com /)</small></label>
                            <input type="text" id="userName" placeholder="Digite o nome do usuário (use / para múltiplos: user1 / user2 / user3)">
                            <div class="error-message-container">
                                <span class="error-message" id="error-userName"></span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="motivo">Motivo:</label>
                            <input type="text" id="motivo" placeholder="Digite o motivo">
                            <div class="error-message-container">
                                <span class="error-message" id="error-motivo"></span>
                            </div>
                        </div>
                    `;
                    break;
                default:
                    fieldsHTML = `
                        <div class="form-group">
                            <label for="userName">Nome do Usuário: <small style="color: #4ade80; font-weight: normal;">(separe múltiplos usuários com /)</small></label>
                            <input type="text" id="userName" placeholder="Digite o nome do usuário (use / para múltiplos: user1 / user2 / user3)">
                            <div class="error-message-container">
                                <span class="error-message" id="error-userName"></span>
                            </div>
                        </div>
                    `;
                    break;
            }
            formFields.innerHTML = fieldsHTML;
            formFields.querySelectorAll('input[type="text"]').forEach(input => {
                input.addEventListener('input', () => clearError(input.id));
            });
        }

        function clearError(inputId) {
            const errorSpan = document.getElementById(`error-${inputId}`);
            const inputElement = document.getElementById(inputId);

            if (errorSpan) {
                errorSpan.style.display = 'none';
                errorSpan.textContent = '';

                const errorContainer = errorSpan.closest('.error-message-container');
                if (errorContainer) {
                    errorContainer.style.display = 'none';
                }
            }
            if (inputElement) {
                inputElement.classList.remove('input-error');
            }
        }

        function showError(inputId, message) {
            const errorSpan = document.getElementById(`error-${inputId}`);
            const inputElement = document.getElementById(inputId);

            if (errorSpan) {
                errorSpan.textContent = message;
                errorSpan.style.display = 'inline-block';

                const errorContainer = errorSpan.closest('.error-message-container');
                if (errorContainer) {
                    errorContainer.style.display = 'block';
                }
            }
            if (inputElement) {
                inputElement.classList.add('input-error');
            }
        }

        function resetForm() {
            document.getElementById('formContainer').classList.remove('active');
            document.getElementById('menuContainer').style.display = 'block';
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('selected'));
            const formFields = document.getElementById('formFields');
            formFields.querySelectorAll('input[type="text"]').forEach(input => {
                clearError(input.id);
                input.value = '';
            });
            selectedNotificationType = null;
            const selectedTypeDisplay = document.getElementById('selectedType');
            if (selectedTypeDisplay) {
                selectedTypeDisplay.textContent = '';
            }
        }


        function sendNotification() {
            const sendButton = document.querySelector('.btn-primary');
            if (sendButton.disabled) {
                return;
            }

            document.querySelectorAll('.error-message').forEach(span => {
                span.style.display = 'none';
                span.textContent = '';
            });
            document.querySelectorAll('input[type="text"]').forEach(input => {
                input.classList.remove('input-error');
            });

            let isValid = true;
            const fieldsToValidate = [];

            const userNameInput = document.getElementById('userName');
            if (userNameInput) {
                const userNameValue = userNameInput.value.trim();
                if (userNameValue === '') {
                    showError('userName', 'O campo "Nome do Usuário" é obrigatório.');
                    isValid = false;
                } else {
                    const users = userNameValue.split('/').map(name => name.trim()).filter(name => name.length > 0);
                    if (users.length === 0) {
                        showError('userName', 'Nenhum nome de usuário válido foi encontrado.');
                        isValid = false;
                    } else {
                        const invalidUsers = users.filter(user => user.length < 2);
                        if (invalidUsers.length > 0) {
                            showError('userName', `Usuários muito curtos (mínimo 2 caracteres): ${invalidUsers.join(', ')}`);
                            isValid = false;
                        }
                    }
                }
            }

            if (['advertencia_verbal', 'advertencia_interna', 'expulsao', 'rebaixamento'].includes(selectedNotificationType)) {
                const motivoInput = document.getElementById('motivo');
                if (motivoInput) fieldsToValidate.push({ id: 'motivo', input: motivoInput, name: 'Motivo' });
            }
            if (['advertencia_verbal', 'advertencia_interna', 'expulsao'].includes(selectedNotificationType)) {
                const provasInput = document.getElementById('provas');
                if (provasInput) fieldsToValidate.push({ id: 'provas', input: provasInput, name: 'Provas' });
            }

            fieldsToValidate.forEach(field => {
                if (!field.input || field.input.value.trim() === '') {
                    showError(field.id, `O campo "${field.name}" é obrigatório.`);
                    isValid = false;
                }
            });

            if (!selectedNotificationType) {
                console.error("Tipo de notificação não selecionado.");
                isValid = false;
            }

            if (!isValid) {
                return;
            }

            sendButton.disabled = true;
            const originalText = sendButton.textContent;
            sendButton.textContent = 'Enviando...';
            sendButton.style.opacity = '0.6';

            const userNameInputValue = document.getElementById('userName')?.value.trim();
            let motivo = '';
            let provas = '';

            if (['advertencia_verbal', 'advertencia_interna', 'expulsao', 'rebaixamento'].includes(selectedNotificationType)) {
                motivo = document.getElementById('motivo')?.value.trim();
            }
            if (['advertencia_verbal', 'advertencia_interna', 'expulsao'].includes(selectedNotificationType)) {
                provas = document.getElementById('provas')?.value.trim();
            }

            const userNames = userNameInputValue.split('/').map(name => name.trim()).filter(name => name.length > 0);
            
            console.log(`📤 Enviando mensagem para ${userNames.length} usuário(s):`, userNames);
            
            const resetButton = () => {
                sendButton.disabled = false;
                sendButton.textContent = originalText;
                sendButton.style.opacity = '1';
            };

            sendMultipleMessages(userNames, selectedNotificationType, motivo, provas, resetButton);
        }


        function getNotificationData(type, userName = '', motivo = '', provas = '') {
            switch (type) {
                case 'advertencia_verbal':
                    return {
                        title: '(AF) Advertência Verbal',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Notificação[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Através desta carta informo-lhe que você está recebendo uma [b]ADVERTÊNCIA VERBAL[/b] na [b]AUDITORIA FISCAL.[/b] Recomendo que tenha total atenção às suas ações futuras.
						
						[b]Motivo:[/b] ${motivo}
						[b]Provas:[/b] ${provas}
						
						[quote][size=13][b]➙[/b] A [b]notificação[/b] é consequência de uma infração leve, de caráter instrutivo;
						[b]➙[/b] A notificação possui duração de [b]30 (trinta)[/b] dias;
						[b]➙[/b] O acúmulo de [b]03 (três)[/b] notificações resulta em uma advertência escrita interna;
						[b]➙[/b] Você possui o direito de [b]recorrer[/b] aos secretários do seu departamento e, se [b]persistir[/b] a insatisfação, a diretoria.[/size][/quote]
						Em caso de dúvidas, consulte o [b]regimento interno[/b] ou entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'advertencia_interna':
                    return {
                        title: '(AF) Advertência Interna',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Advertência Escrita Interna[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Através desta carta informo-lhe que você está sendo punido com uma [b]ADVERTÊNCIA INTERNA[/b] na [b]AUDITORIA FISCAL.[/b] Recomendo que tenha total atenção às suas ações futuras.
						
						[b]Motivo:[/b] ${motivo}
						[b]Provas:[/b] ${provas}
						
						[quote][size=13][b]➙[/b] A [b]advertência interna[/b] é consequência de uma infração mediana ou grave, de caráter advertivo;
						[b]➙[/b] A advertência interna possui duração de [b]30 (trinta)[/b] dias;
						[b]➙[/b] O acúmulo de [b]03 (três)[/b] advertências internas resulta em um rebaixamento para auditores+;
						[b]➙[/b] O acúmulo de [b]03 (três)[/b] advertências internas resulta em uma expulsão para auditores trainees;
						[b]➙[/b] Você possui o direito de [b]recorrer[/b] aos secretários do seu departamento e, se [b]persistir[/b] a insatisfação, a diretoria.[/size][/quote]
						Em caso de dúvidas, consulte o [b]regimento interno[/b] ou entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'expulsao':
                    return {
                        title: '(AF) Expulsão',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Expulsão[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Através deste comunicado informo-lhe que você está sendo [b]EXPULSO(a)[/b] da [b]AUDITORIA FISCAL.[/b] A expulsão se dá em virtude de ${motivo}.
						[b]Provas:[/b] ${provas}
						Como punição, receberá [b]100 medalhas efetivas negativas[/b] de acordo com as normativas documentais. Caso seja oficial do corpo militar ou corpo executivo com especialização intermediária, [b]também será punido com uma advertência escrita pelo crime de Abandono de Dever/Negligência.[/b] Recomendo que tenha total atenção às suas ações futuras.
						
						É necessário que [b]atualize suas tarefas no RCCSystem[/b] removendo o cargo ocupado na [b]Auditoria Fiscal.[/b]
						
						Você terá até 48 horas para atualizar suas tarefas, caso não o faça, será punido com uma [b]advertência escrita pelo crime de Abandono de Dever/Negligência, na hierarquia da RCC.[/b] 
						
						Em caso de dúvidas, entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'promocao_supervisor_secretario_dc':
                    return {
                        title: '(AF) Você foi promovido(a)!',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Promoção[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]A [b]Auditoria Fiscal[/b] vem, por meio desta Mensagem Privada, parabenizá-lo pela sua [b]promoção[/b] no Departamento de Contabilidade da subcompanhia! Para ficar a par dos seus novos afazeres, leia a carta de promoção na sua totalidade.
						
						Enquanto [b]Secretário do Departamento de Contabilidade[/b], você poderá fazer parte da secretaria de administração ou da secretaria de assuntos técnicos, em que deverá cumprir com as funções de cada uma, assim como abaixo: 
						
						[quote][size=13][b]Secretário de Administração do Departamento de Contabilidade:[/b]
						
						[b]•[/b] Fiscalizar o subfórum do Departamento de Contabilidade e seu respectivo grupo, em até 24 horas após a saída de membros do departamento;
						[b]•[/b] Realizar a postagem das medalhas do departamento até o dia 06 de cada mês;
						[b]•[/b] Realizar os devidos backups de escalas e registros de funções em até 24 horas antes da mudança da escala;
						[b]•[/b] Acompanhar e corrigir os registros de funções dos Auditores Trainees, Auditores e Agentes Supervisores;
						[b]•[/b] Emitir o Relatório de Vendas de cargos, em até 48 horas após o encerramento do mês;
						[b]•[/b] Promover melhorias na organização e na administração do grupo;
						[b]•[/b] Participar das decisões de promoções no departamento;
						[b]•[/b] Organizar o pagamento mensal bimestralmente.[/size][/quote]
						[quote][size=13][b]Secretário de Assuntos Técnicos do Departamento de Contabilidade:[/b]
						
						[b]•[/b] Criação das escalas de medalhas todo dia 07 de cada mês;
						[b]•[/b] Alterar permissões nas planilhas de controle de gratificações;
						[b]•[/b] Criação da escala de pagamento até o dia 02 de cada mês;
						[b]•[/b] Criação do quadro de pagamentos até o dia 07 de cada mês;
						[b]•[/b] Emitir o relatório do pagamento mensal, em até 48 horas após o pagamento;
						[b]•[/b] Acompanhar e coordenar os Agentes Supervisores e suas atividades;
						[b]•[/b] Promover melhorias no cumprimento de funções do departamento;
						[b]•[/b] Participar das decisões de promoções no departamento;
						[b]•[/b] Organizar o pagamento mensal bimestralmente.[/size][/quote]
						Caso não cumpra com suas metas/funções, o agente supervisor estará sujeito a alguma [b]punições[/b], sendo elas:
						
						[quote][size=13][b]Advertência escrita interna:[/b] São utilizadas como forma de punição em infrações moderadas, a cada 3 advertências internas, estará sujeito a um rebaixamento.
						[b]Rebaixamento:[/b] São utilizadas como forma de punição em infrações graves.
						
						[b]Obs:[/b] As advertências internas possuem o prazo de 30 dias. Você pode as consultar no quadro de advertências, juntamente das regras que você deverá seguir para que não seja punido.[/size][/quote]
						Por fim, não se esqueça de atualizar as suas tarefas no RCCSystem, no período de até 48 horas após o envio desta Mensagem Privada. A sua nova sigla é [b][S.AF][/b].
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'promocao_auditor_supervisor_dc':
                    return {
                        title: '(AF) Você foi promovido(a)!',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Promoção[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]A [b]Auditoria Fiscal[/b] vem, por meio desta Mensagem Privada, parabenizá-lo pela sua [b]promoção[/b] no Departamento de Contabilidade da subcompanhia! Para ficar a par dos seus novos afazeres, leia a carta de promoção na sua totalidade.
						
						Enquanto [b]Agente Supervisor do Departamento de Contabilidade[/b], você poderá fazer parte da secretaria de administração ou da secretaria de assuntos técnicos, em que deverá cumprir com as funções de cada uma, assim como abaixo: 
						
						[quote][size=13][b]Secretário de Administração do Departamento de Contabilidade:[/b]
						
						[b]•[/b] Fiscalizar o subfórum do Departamento de Contabilidade e seu respectivo grupo, em até 24 horas após a saída de membros do departamento;
						[b]•[/b] Realizar a postagem das medalhas do departamento até o dia 06 de cada mês;
						[b]•[/b] Realizar os devidos backups de escalas e registros de funções em até 24 horas antes da mudança da escala;
						[b]•[/b] Acompanhar e corrigir os registros de funções dos Auditores Trainees, Auditores e Agentes Supervisores;
						[b]•[/b] Emitir o Relatório de Vendas de cargos, em até 48 horas após o encerramento do mês;
						[b]•[/b] Promover melhorias na organização e na administração do grupo;
						[b]•[/b] Participar das decisões de promoções no departamento;
						[b]•[/b] Organizar o pagamento mensal bimestralmente.[/size][/quote]
						[quote][size=13][b]Secretário de Assuntos Técnicos do Departamento de Contabilidade:[/b]
						
						[b]•[/b] Criação das escalas de medalhas todo dia 07 de cada mês;
						[b]•[/b] Alterar permissões nas planilhas de controle de gratificações;
						[b]•[/b] Criação da escala de pagamento até o dia 02 de cada mês;
						[b]•[/b] Criação do quadro de pagamentos até o dia 07 de cada mês;
						[b]•[/b] Emitir o relatório do pagamento mensal, em até 48 horas após o pagamento;
						[b]•[/b] Acompanhar e coordenar os Agentes Supervisores e suas atividades;
						[b]•[/b] Promover melhorias no cumprimento de funções do departamento;
						[b]•[/b] Participar das decisões de promoções no departamento;
						[b]•[/b] Organizar o pagamento mensal bimestralmente.[/size][/quote]
						Caso não cumpra com suas metas/funções, o agente supervisor estará sujeito a alguma [b]punições[/b], sendo elas:
						
						[quote][size=13][b]Advertência escrita interna:[/b] São utilizadas como forma de punição em infrações moderadas, a cada 3 advertências internas, estará sujeito a um rebaixamento.
						[b]Rebaixamento:[/b] São utilizadas como forma de punição em infrações graves.
						
						[b]Obs:[/b] As advertências internas possuem o prazo de 30 dias. Você pode as consultar no quadro de advertências, juntamente das regras que você deverá seguir para que não seja punido.[/size][/quote]
						Por fim, não se esqueça de atualizar as suas tarefas no RCCSystem, no período de até 48 horas após o envio desta Mensagem Privada. A sua nova sigla é [b][S.AF][/b].
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'promocao_auditor_supervisor_dp':
                    return {
                        title: '(AF) Você foi promovido(a)!',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Promoção[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]A [b]Auditoria Fiscal[/b] vem, por meio desta Mensagem Privada, parabenizá-lo pela sua [b]promoção[/b] no Departamento de Pesquisa da subcompanhia! Para ficar a par dos seus novos afazeres, leia a carta de promoção na sua totalidade.
						
						Enquanto [b]Agente Supervisor do Departamento de Pesquisa[/b], é da sua responsabilidade atender as [b]demandas solicitadas[/b] pelo Secretário de Assuntos Técnicos do Departamento de Pesquisa com primor e da forma correta, se atentando aos [b]prazos[/b] e cumprindo-os. Logo, também é seu dever [b]repassar tais demandas[/b] aos auditores/trainees do seu setor, desta forma, supervisionar, orientar, revisar, fiscalizar e direcionar as atividades, além de punir caso seja necessário. É necessário [b]cobrir[/b] algum escalado caso haja um desfalque de função, desta forma, sendo fiel à [b]missão institucional[/b] da subcompanhia, garantindo o sucesso operacional.
						
						Caso não cumpra com suas metas/funções, o agente supervisor estará sujeito a algumas [b]punições[/b], sendo elas:
						
						[quote][size=13][b]Advertência escrita interna:[/b] São utilizadas como forma de punição em infrações moderadas, a cada 3 advertências internas, estará sujeito a um rebaixamento.
						[b]Rebaixamento:[/b] São utilizadas como forma de punição em infrações graves.
						
						[b]Obs:[/b] As advertências internas possuem o prazo de 30 dias. Você pode as consultar no quadro de advertências, juntamente das regras que você deverá seguir para que não seja punido.[/size][/quote]
						Por fim, não se esqueça de atualizar as suas tarefas no RCCSystem, no período de até 48 horas após o envio desta Mensagem Privada. A sua nova sigla é [b][AS.AF][/b].
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com o [b]Secretário de Assuntos Técnicos do seu departamento.[/b][/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'promocao_trainee_auditor_dp':
                    return {
                        title: '(AF) Você foi promovido(a)!',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Promoção[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]A [b]Auditoria Fiscal[/b] vem, por meio desta Mensagem Privada, parabenizá-lo pela sua [b]promoção[/b] no Departamento de Pesquisa da subcompanhia! Para ficar a par dos seus novos afazeres, leia a carta de promoção na sua totalidade.
						
						Enquanto [b]Auditor Fiscal do Departamento de Pesquisa[/b], é da sua responsabilidade a elaboração de textos e trabalhos propostos pelos Agentes Supervisores do seu setor, respeitando os prazos estabelecidos e seguindo de forma constante e consciente a missão institucional garantindo, dessa forma, o sucesso de cada operação realizada pelo setor.
						
						Caso não cumpra com suas metas/funções, o auditor estará sujeito a algumas [b]punições[/b], sendo elas:
						
						[quote][size=13][b]Notificações:[/b] São utilizadas como forma de punição em infrações leves, a cada 3 notificações, estará sujeito a uma advertência escrita interna.
						[b]Advertência escrita interna:[/b] São utilizadas como forma de punição em infrações moderadas e graves, a cada 3 advertências, estará sujeito a um rebaixamento.
						
						[b]Obs:[/b] As notificações e advertências internas possuem o prazo de 30 dias. Você pode as consultar no quadro de notificações ou advertências, dependendo de qual recebeu, lá possuem algumas regras que você deverá seguir para que não seja punido.[/size][/quote]
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com um [b]Agente Supervisor do Departamento de Contabilidade.[/b]
						
						Por fim, não se esqueça de atualizar as suas tarefas no RCCSystem, no período de até 48 horas após o envio desta Mensagem Privada. A sua nova sigla é [b][A.AF][/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'reintegracao_dc':
                    return {
                        title: '(AF) Reintegração',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Orientação[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor! Seja bem-vindo novamente![/b][/center]
						
						[justify]Inicialmente, a Auditoria Fiscal lhe parabeniza pelo retorno a subcompanhia, você retornará no cargo de [b]Auditor Trainee![/b] 
						Portanto, atualize suas tarefas com: [b](Tr.AF)[/b]. Você ingressou no [b]Departamento de Contabilidade[/b], leia esta carta para entender melhor sobre o funcionamento do departamento, importância, funções e prazos no cargo inicial.
						
						O [b]Departamento de Contabilidade[/b] é responsável pela entrega, fiscalização e monitoramento das medalhas efetivas e temporárias, atuação direta nos pagamentos mensais e administração do departamento financeiro da instituição.
						O departamento também tem um [b]papel fundamental[/b] na criação e disseminação dos relatórios financeiros, como dos pagamentos mensais e da venda de cargos, além da responsabilidade de cuidar do cofre de medalhas.
						
						[quote][size=13][b]O auxílio na realização do pagamento mensal -[/b] Bimestral (A cada 2 meses);
						[b]Relatório de vendas de cargos e pagamentos mensais -[/b] Mensal (A cada mês) e anual (A cada ano);
						[b]Contagem de gratificações efetivas/temporárias das companhias, subcompanhias ou órgãos -[/b] Mensal (A cada mês).[/size][/quote]
						O [b]prazo[/b] de cumprimento das funções de um auditor trainee são previstas em escalas determinadas pela secretária e garantidas pelo agente supervisor de cada setor.
						
						[b]Agentes supervisores:[/b] Daemon / Aloscon / Vilete / Draward / s0viet-chief / bebpaulore
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com o [b]Agente Supervisor do seu setor.[/b][/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'reintegracao_dp':
                    return {
                        title: '(AF) Reintegração',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Orientação[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor! Seja bem-vindo novamente![/b][/center]
						
						[justify]Inicialmente, a Auditoria Fiscal lhe parabeniza pelo retorno a subcompanhia, você retornará no cargo de [b]Auditor Trainee![/b] 
						Portanto, atualize suas tarefas com: [b](Tr.AF)[/b]. Você ingressou no [b]Departamento de Pesquisa[/b], leia esta carta para entender melhor sobre o funcionamento do departamento, importância, funções e prazos no cargo inicial.
						
						O [b]Departamento de Pesquisa[/b] é responsável pela retratação da instituição com informações necessárias e essenciais ao conhecimento de sua realidade por meio da produção, análise e pesquisa de natureza estatística com o objetivo de buscar soluções e inovações nos grupos de tarefas, possuindo funções fixas, sendo:
						
						[b]I -[/b] realização da Auditoria de Confiança, Censo Demográfico e Balanço das Companhias;
						[b]II -[/b] realização de auditorias expositivas a respeito dos grupos de tarefas;
						[b]III -[/b] realização de auditorias especiais e extraordinárias;
						[b]IV -[/b] auxílio na realização do pagamento mensal.
						
						Ele é dividido em quatro setores, sendo eles: [b]inteligência de dados, marketing, redação e design,[/b] que ficarão responsáveis pelas funções fixas de forma mais específica e organizada entre estes.
						
						[quote][size=13]O setor de [b]inteligência de dados[/b] é responsável pela criação de planilhas, análise de elegibilidade, codificação, coleta e criação de gráficos. - [b]Agente Supervisor:[/b] Gkwr
						O setor de [b]marketing[/b] é responsável pela divulgação e marketing dos resultados relacionados à Auditoria Fiscal e pela criação de tópicos e envio de mensagens privadas. - [b]Agente Supervisor:[/b] Cole
						O setor de [b]redação[/b] é responsável pela produção e manutenção de textos relacionados às auditorias e relatórios da subcompanhia. - [b]Agente Supervisor:[/b] !weniyori?
						O setor de [b]design[/b] é responsável pelo desenvolvimento de interfaces e aprimoração da experiência dos policiais no uso das ferramentas da Auditoria Fiscal. - [b]Agente Supervisor:[/b] Zeyn[/size][/quote]
						O [b]prazo[/b] de cumprimento das funções de um auditor trainee são previstas em escalas determinadas pela secretária e garantidas pelo agente supervisor de cada setor.
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com o [b]Agente Supervisor do seu setor.[/b][/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'licenca':
                    return {
                        title: '(AF) Licença',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Licença/Retorno[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Você solicitou uma [b]licença de serviço[/b], sendo assim, lembre-se que ao final do prazo deverá postar o seu [b]retorno[/b] de acordo com o modelo de requerimento da Auditoria Fiscal, caso o período se encerre e você precise de [b]mais tempo em licença[/b], basta postar o [b]prolongamento da licença[/b], lembrando que o período máximo é de [b]30 dias.[/b] Se você precisar de mais que 30 dias em licença, terá que solicitar uma [b]reserva ao diretor-geral da Auditoria Fiscal (benjlfbaby)[/b] que terá o tempo máximo de [b]90 dias.[/b]
						
						Ao retornar do seu período de licença/reserva ou prolongamento desta, o membro deverá fazer a [b]postagem do retorno de sua licença/reserva[/b] nos requerimentos da Auditoria Fiscal em um prazo de até [b]vinte e quatro horas (24 horas)[/b] após o encerramento desta. Caso a postagem não seja efetuada no período estipulado, Auditores+ serão [b]rebaixados a cada 24 horas que se passem após o prazo, até a expulsão.[/b] Auditores Traineers serão [b]expulsos da subcompanhia de forma imediata.[/b]
						
						Vale ressaltar que, os Auditores devem pedir licença com até [b]24 horas de antecedência[/b] antes de iniciar o prazo de alguma função escalada. Se a licença for solicitada durante ou após o prazo, e a função não tiver sido realizada, o Auditor receberá uma [b]Advertência Interna.[/b] Da mesma forma, os Agentes Supervisores também precisam solicitar licença com [b]24 horas de antecedência, estando sujeitos à mesma punição.[/b]
						
						Em caso de dúvidas entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'entrada_dc':
                    return {
                        title: '(AF) Carta de Boas Vindas',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Orientação[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Inicialmente, a Auditoria Fiscal lhe parabeniza pela aprovação no processo seletivo, você começará no cargo de [b]Auditor Trainee![/b] 
						Portanto, atualize suas tarefas com: [b](Tr.AF)[/b]. Você ingressou no [b]Departamento de Contabilidade[/b], leia esta carta para entender melhor sobre o funcionamento do departamento, importância, funções e prazos no cargo inicial.
						
						O [b]Departamento de Contabilidade[/b] é responsável pela entrega, fiscalização e monitoramento das medalhas efetivas e temporárias, atuação direta nos pagamentos mensais e administração do departamento financeiro da instituição.
						O departamento também tem um [b]papel fundamental[/b] na criação e disseminação dos relatórios financeiros, como dos pagamentos mensais e da venda de cargos, além da responsabilidade de cuidar do cofre de medalhas.
						
						[quote][size=13][b]O auxílio na realização do pagamento mensal -[/b] Bimestral (A cada 2 meses);
						[b]Relatório de vendas de cargos e pagamentos mensais -[/b] Mensal (A cada mês) e anual (A cada ano);
						[b]Contagem de gratificações efetivas/temporárias das companhias, subcompanhias ou órgãos -[/b] Mensal (A cada mês).[/size][/quote]
						O [b]prazo[/b] de cumprimento das funções de um auditor trainee são previstas em escalas determinadas pela secretária e garantidas pelo agente supervisor de cada setor.
						
						[b]Agentes supervisores:[/b] Daemon / Aloscon / Vilete / Draward / s0viet-chief / bebpaulore
						
						Em caso de dúvidas, consulte o [b]regimento interno da subcompanhia[/b] ou entre em contato com o [b]Agente Supervisor do seu setor.[/b][/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                case 'rebaixamento':
                    return {
                        title: '(AF) Rebaixamento',
                        message: `[table style="border: none!important; overflow: hidden; border-radius: 15px; width: auto; padding: 0; margin: 0 auto; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); text-align: center;" bgcolor="#D9A404"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.8em; margin: 0 auto;" bgcolor="#010D05"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 14px"][img]https://i.imgur.com/dw33NA3.png[/img]
						
						[font=Poppins][table style="border: none!important; border-radius: 40px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); overflow: hidden; width: 40%; margin: -2% auto; top: 1.8em; position: relative; z-index: 10; justify-content: center;" bgcolor="094e21"][tr style="border: none !important;"][td style="border: none!important;"][center][color=#ffffff][b][size=18][AF] Carta de Rebaixamento[/size][/b][/color][/center][/td][/tr][/table]
						
						[table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; position: relative; z-index: 1; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 0.6em; margin: 0 auto;" bgcolor="094e21"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); line-height: 1em; margin: 0 auto;" bgcolor="ffffff"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 7px"][table style="width: 100%; border-radius: 15px; border: none!important; overflow: hidden; line-height: 1.5em; margin: 0 auto;" bgcolor="f2f2f2"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden; padding: 10px"]
						[center][b]Saudações, auditor![/b][/center]
						
						[justify]Através desta carta informo-lhe que você está sendo [b]REBAIXADO(a)[/b] da [b]AUDITORIA FISCAL.[/b] O rebaixamento se dá em virtude de ${motivo}, e devido a isso, será punido com [b]50 medalhas efetivas negativas[/b] de acordo com as normativas documentais. Caso seja oficial do corpo militar ou corpo executivo portador da especialização intermediária, [b]também será punido com uma advertência escrita pelo crime de Abandono de Dever/Negligência, na hierarquia da RCC.[/b] Recomendo que tenha total atenção às suas ações futuras.
						
						É necessário que [b]atualize suas tarefas no RCCSystem[/b] de acordo com o novo cargo ocupado na subcompanhia, sendo:
						
						[quote][size=13]• Auditor Trainee [b](Tr.AF)[/b]
						• Auditor [b](A.AF)[/b]
						• Agente Supervisor [b](AS.AF)[/b]
						• Secretário [b](S.AF)[/b] 
						• Vice-Diretor [b](VL.AF)[/b]
						• Diretor-Geral [b](L.AF)[/b][/size][/quote]
						Você terá até 48 horas para atualizar suas tarefas, caso não o faça, será punido com uma [b]advertência escrita pelo crime de Abandono de Dever/Negligência, na hierarquia da RCC.[/b] 
						
						Em caso de dúvidas, entre em contato com a [b]diretoria[/b] da [b]Auditoria Fiscal (benjlfbaby, Annehatfield1 e Slintow)[/b].[/justify][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]
						
						[size=11][color=white]Todos os direitos reservados à [b]Auditoria Fiscal[/b] [size=15]℠[/size].[/color][/size][/td][/tr][/table][/td][/tr][/table][/font]`
                    };

                default:
                    return {
                        title: '(AF) Notificação',
                        message: `[Mensagem não configurada para o tipo: ${type}, Usuário: ${userName}]`
                    };
            }
        }


        function send_MP(title, user, message, resetButton, retryCount = 0) {
            const maxRetries = 2;
            const timestamp = new Date().toISOString();
            
            console.log(`--- Tentativa de Envio de Mensagem (${retryCount + 1}/${maxRetries + 1}) ---`);
            console.log("Timestamp:", timestamp);
            console.log("Título:", title);
            console.log("Usuário:", user);
            console.log("Mensagem :", message);
            console.log("--------------------------------------");

            $.ajaxSetup({
                timeout: 30000
            });

            $.post('/privmsg', {
                folder: 'inbox',
                mode: 'post',
                post: '1',
                username: user,
                subject: title,
                message: message
            }).done(function (response) {
                console.log("Resposta do servidor (sucesso):", response);
                
                const responseText = typeof response === 'string' ? response : JSON.stringify(response);
                const isSuccess = responseText.includes('message sent') || 
                                responseText.includes('success') || 
                                responseText.includes('enviada') ||
                                responseText.includes('Message sent') ||
                                (!responseText.includes('error') && !responseText.includes('erro') && !responseText.includes('Error'));
                
                if (isSuccess) {
                    console.log("✅ Mensagem enviada com sucesso!");
                    const successModal = document.createElement('div');
                    successModal.innerHTML = `
                        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                            <div style="background-color: #1a3d2e; color: white; padding: 30px 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 1px solid #4ade80;">
                                <h3 style="color: #4ade80; margin-bottom: 15px;">✅ Enviado com sucesso!</h3>
                                <p style="margin-top: 15px;">Deseja enviar uma nova mensagem?</p>
                                <div style="margin-top: 20px;">
                                    <button onclick="this.closest('.success-modal-container').remove(); resetForm();" class="modal-btn modal-btn-sim">Sim</button>
                                    <button onclick="window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox'; this.closest('.success-modal-container').remove();" class="modal-btn modal-btn-nao">Ir para Caixa de Mensagens</button>
                                </div>
                            </div>
                        </div>
                    `;
                    successModal.firstElementChild.classList.add('success-modal-container');
                    document.body.appendChild(successModal);
                } else {
                    console.error("❌ Resposta do servidor não indica sucesso:", response);
                    
                    if (retryCount < maxRetries) {
                        console.log(`🔄 Tentando novamente... (${retryCount + 1}/${maxRetries})`);
                        setTimeout(() => {
                            send_MP(title, user, message, resetButton, retryCount + 1);
                        }, 2000);
                    } else {
                        showErrorModal("A resposta do servidor não confirma o envio da mensagem após múltiplas tentativas.");
                        resetButton();
                    }
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("❌ Erro na requisição:", textStatus, errorThrown);
                console.error("Resposta do servidor:", jqXHR.responseText);
                
                if (retryCount < maxRetries && (textStatus === 'timeout' || jqXHR.status === 0 || jqXHR.status >= 500)) {
                    console.log(`🔄 Tentando novamente devido a erro de rede... (${retryCount + 1}/${maxRetries})`);
                    setTimeout(() => {
                        send_MP(title, user, message, resetButton, retryCount + 1);
                    }, 3000);
                    return;
                }
                
                let errorMessage = "Ocorreu um erro ao enviar a Mensagem Privada.";
                if (textStatus === 'timeout') {
                    errorMessage = "Tempo limite excedido após múltiplas tentativas. Tente novamente mais tarde.";
                } else if (jqXHR.status === 0) {
                    errorMessage = "Erro de conexão após múltiplas tentativas. Verifique sua internet.";
                } else if (jqXHR.status >= 400 && jqXHR.status < 500) {
                    errorMessage = "Erro do cliente. Verifique os dados informados.";
                } else if (jqXHR.status >= 500) {
                    errorMessage = "Erro do servidor após múltiplas tentativas. Tente novamente mais tarde.";
                }
                
                showErrorModal(errorMessage);
                resetButton();
            }).always(function() {
                $.ajaxSetup({
                    timeout: 0
                });
            });
        }

        function showErrorModal(message) {
            const errorModal = document.createElement('div');
            errorModal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                    <div style="background-color: #1a3d2e; color: white; padding: 30px 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 1px solid #ff7675;">
                        <h3 style="color: #ff7675; margin-bottom: 15px;">Erro!</h3>
                        <p>${message}</p>
                        <button onclick="this.parentElement.parentElement.remove();" class="modal-btn modal-btn-error">OK</button>
                    </div>
                </div>
            `;
            document.body.appendChild(errorModal);
        }

        function sendMultipleMessages(userNames, notificationType, motivo, provas, resetButton) {
            if (userNames.length === 0) {
                showErrorModal("Nenhum usuário válido foi encontrado.");
                resetButton();
                return;
            }

            console.log(`🚀 Iniciando envio para ${userNames.length} usuário(s)`);

            let successCount = 0;
            let errorCount = 0;
            let processedCount = 0;
            const results = [];

            const updateProgress = () => {
                const sendButton = document.querySelector('.btn-primary');
                sendButton.textContent = `Enviando... (${processedCount}/${userNames.length})`;
            };

            const processUser = (userName, index) => {
                return new Promise((resolve) => {
                    const { title, message } = getNotificationData(notificationType, userName, motivo, provas);
                    
                    setTimeout(() => {
                        console.log(`📤 Enviando para ${userName} (${index + 1}/${userNames.length})`);
                        
                        const userCallback = (success, error) => {
                            processedCount++;
                            updateProgress();
                            
                            if (success) {
                                successCount++;
                                results.push({ user: userName, success: true });
                                console.log(`✅ Sucesso para ${userName}`);
                            } else {
                                errorCount++;
                                results.push({ user: userName, success: false, error: error });
                                console.log(`❌ Erro para ${userName}:`, error);
                            }
                            
                            if (processedCount === userNames.length) {
                                showMultipleResults(results, successCount, errorCount);
                                resetButton();
                            }
                            
                            resolve();
                        };

                        send_MP_with_callback(title, userName, message, userCallback);
                    }, index * 1000);
                });
            };

            userNames.forEach((userName, index) => {
                processUser(userName, index);
            });
        }

        function showMultipleResults(results, successCount, errorCount) {
            const modal = document.createElement('div');
            modal.innerHTML = `
                <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); display: flex; justify-content: center; align-items: center; z-index: 1000;">
                    <div style="background-color: #1a3d2e; color: white; padding: 30px 40px; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.3); border: 1px solid #4ade80;">
                        <h3 style="color: #4ade80; margin-bottom: 15px;">✅ Enviado com sucesso!</h3>
                        <p style="margin-top: 15px;">Deseja enviar uma nova mensagem?</p>
                        <div style="margin-top: 20px;">
                            <button onclick="this.closest('.multiple-results-modal').remove(); resetForm();" class="modal-btn modal-btn-sim">Sim</button>
                            <button onclick="window.location.href = 'https://www.policiarcc.com/privmsg?folder=outbox'; this.closest('.multiple-results-modal').remove();" class="modal-btn modal-btn-nao">Ir para Caixa de Mensagens</button>
                        </div>
                    </div>
                </div>
            `;
            modal.firstElementChild.classList.add('multiple-results-modal');
            document.body.appendChild(modal);
        }

        function send_MP_with_callback(title, user, message, callback) {
            $.ajaxSetup({
                timeout: 30000
            });

            $.post('/privmsg', {
                folder: 'inbox',
                mode: 'post',
                post: '1',
                username: user,
                subject: title,
                message: message
            }).done(function (response) {
                const responseText = typeof response === 'string' ? response : JSON.stringify(response);
                const isSuccess = responseText.includes('message sent') || 
                                responseText.includes('success') || 
                                responseText.includes('enviada') ||
                                responseText.includes('Message sent') ||
                                (!responseText.includes('error') && !responseText.includes('erro') && !responseText.includes('Error'));
                
                if (isSuccess) {
                    callback(true, null);
                } else {
                    callback(false, 'Resposta do servidor não confirma o envio');
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                let errorMessage = "Erro desconhecido";
                if (textStatus === 'timeout') {
                    errorMessage = "Tempo limite excedido";
                } else if (jqXHR.status === 0) {
                    errorMessage = "Erro de conexão";
                } else if (jqXHR.status >= 400 && jqXHR.status < 500) {
                    errorMessage = "Erro do cliente";
                } else if (jqXHR.status >= 500) {
                    errorMessage = "Erro do servidor";
                }
                callback(false, errorMessage);
            }).always(function() {
                $.ajaxSetup({
                    timeout: 0
                });
            });
        }
