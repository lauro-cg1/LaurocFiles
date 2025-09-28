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
                'basica': `[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#3e8025"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table    class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO BÁSICA[/font][/size][/color][/td][/tr][/table]

[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]A [color=#189600][b]Graduação Básica[/b][/color] destina-se exclusivamente aos supervisores da companhia, com o objetivo de capacitá-los para o desempenho de suas novas funções. Utilize o link abaixo (clique no brasão) para acessar o material em formato de apresentação [b](slide) referente à graduação[/b] e mantenha-se ativo durante o período em sala de aula. Ao concluir a leitura, [b]comunique o(a) graduador(a)[/b] e prepare-se para a realização do teste prático em seguida.[/justify][/font][/color][/size]

[center][table     class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 450px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 10px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][url=https://docs.google.com/presentation/d/161HBq5LwZWvMUlXZGtTueyWHXWDohQDXHwpBH0C2Dws/edit?slide=id.p1#slide=id.p1][img]https://i.servimg.com/u/f10/20/25/55/99/b0903410.gif[/img][/url][/td][/tr][/table][/center]

[center][size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/center][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`,
                
                'intermediaria': `[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#3e8025"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table    class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO INTERMEDIÁRIA[/font][/size][/color][/td][/tr][/table]

[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]A [color=#189600][b]Graduação intermediária[/b][/color] destina-se exclusivamente aos tutores da companhia, com o objetivo de capacitá-los para o desempenho de suas novas funções. Utilize o link abaixo (clique no brasão) para acessar o material em formato de apresentação [b](slide) referente à graduação[/b] e mantenha-se ativo durante o período em sala de aula. Ao concluir a leitura, [b]comunique o(a) graduador(a)[/b].[/justify][/font][/color][/size]

[center][table     class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 450px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 10px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][url=https://docs.google.com/presentation/d/1LVKTvlyCRaR0eCZFehZ_jQX1RyqPDLXMtKducdwkbXU/edit?slide=id.p1#slide=id.p1][img]https://i.servimg.com/u/f10/20/25/55/99/b0903410.gif[/img][/url][/td][/tr][/table][/center]

[center][size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/center][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`,
                
                'avancada': `[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#3e8025"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: black; height: 36px; width: -webkit-fill-available; border-radius: 24px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#f2f2f2"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][img]https://i.imgur.com/DpGLqxW.png[/img]

[table    class="rank" style="transition: none 0ms ease 0s; margin: auto; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 90%; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][color=white][size=18][font=Poppins]GRADUAÇÃO AVANÇADA[/font][/size][/color][/td][/tr][/table]

[table    class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 500; height: 36px; width: -webkit-fill-available; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="#ffffff"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][size=13][font=Poppins][color=black][justify]A [color=#189600][b]Graduação Avançada[/b][/color] destina-se exclusivamente aos fiscalizadores da companhia, com o objetivo de capacitá-los para o desempenho de suas novas funções. Utilize o link abaixo (clique no brasão) para acessar o material em formato de apresentação [b](slide) referente à graduação[/b] e mantenha-se ativo durante o período em sala de aula. Ao concluir a leitura, [b]comunique o(a) graduador(a)[/b].[/justify][/font][/color][/size]

[center][table     class="rank" style="transition: none 0ms ease 0s; margin: 0em; color: rgb(255, 255, 255); font-weight: 600; height: 36px; width: 450px; border-radius: 12px; box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 1px 2px, rgba(0, 0, 0, 0.1) 0px 0px 1px 1px inset; text-align: center; line-height: 1.4em; RCC - SÓ A VERDADEIRA!: rgba(0, 0, 0, 0.2) 0px 1px 1px; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;" bgcolor="189600"][tr style="transition: none 0ms ease 0s; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"][td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 10px; border-width: initial !important; border-style: none !important; border-color: initial !important;"][url=https://docs.google.com/presentation/d/16lkGZUH5lukBWjIvHeKcp1N1GlV5ru7sr_vfxqPTg1c/edit?slide=id.p1#slide=id.p1][img]https://i.servimg.com/u/f10/20/25/55/99/b0903410.gif[/img][/url][/td][/tr][/table][/center]

[center][size=10][font=Poppins][color=#189600]<i class="fas fa-dragon"></i>[/color]
[color=black]Todos os direitos reservados a [b][color=#189600]Companhia dos Supervisores[/color][/b]
BBCode inspirado em modelos de cardinalle e .Lord[/color][/font][/size][/center][/td][/tr][/table][/td][/tr][/table][/td][/tr][/table]`
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
