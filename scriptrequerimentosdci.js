			$(document).ready(function() {
				$('.dropdown-btn').click(function(e) {
					e.stopPropagation();
					$('.dropdown-content').toggleClass('show');
					$(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
				});
				
				$(document).click(function(e) {
					if (!$(e.target).closest('.dropdown-container').length) {
						$('.dropdown-content').removeClass('show');
						$('.dropdown-btn i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
					}
				});
				
				$('.dropdown-item').click(function() {
					const selectedText = $(this).text().trim();
					const formType = $(this).data('form');
					
					$('.selected-text').text(selectedText);
					$('.dropdown-content').removeClass('show');
					$('.dropdown-btn i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
					
					$('form').hide();
					$(`#${formType}-form`).show();
				});
				
				$('#btn-sim').click(function() {
					$('#confirmation-modal').css({
						'display': 'flex',
						'align-items': 'center',
						'justify-content': 'center'
					}).fadeOut(300);
					
					$('form').each(function() {
						this.reset();
						$(this).find('.erro-validacao').hide();
						$(this).find('input, select, textarea').removeClass('campo-invalido');
					});
					
					$('form').hide();
					$('.dropdown-container').show();
					$('.selected-text').text('Selecione um tipo de requerimento   ');
				});
				
				$('#btn-nao').click(function() {
					location.href = 'https://' + location.host + '/t37262-?view=newest';
				});
				
				$('.enviar-btn').click(function() {
					const formType = $(this).data('form');
					const form = $(`#${formType}-form`);
					let isValid = true;
					
					form.find('.erro-validacao').hide();
					form.find('input, select, textarea').removeClass('campo-invalido');
					
					form.find('input[required], select[required], textarea[required]').each(function() {
						if ($(this).val() === '') {
							$(this).addClass('campo-invalido');
							$(this).siblings('.erro-validacao').show();
							isValid = false;
						}
						
						if ($(this).attr('id') === 'licenca-dias' && parseInt($(this).val()) < 7) {
							$(this).addClass('campo-invalido');
							$(this).siblings('.erro-validacao').show();
							isValid = false;
						}
					});
					
					if (!isValid) {
						return;
					}
					
					let bbcode = gerarBBCode(formType);
					
					console.log("BBCode gerado:", bbcode);
					
					$('#fa-generated-message').val(bbcode);
					
					$(this).text('Enviando...');
					const btn = $(this); 
					
					setTimeout(function () {
						$.post('/post', {
							t: 37262,
							message: $('#fa-generated-message').val().trim(),
							mode: 'reply',
							tid: $('[name="tid"]:first').val(),
							post: 1,
							}).done(function () {
							$('#confirmation-modal').css({
								'display': 'flex',
								'align-items': 'center',
								'justify-content': 'center'
							}).fadeIn(300);
							
							btn.text('Enviar');
							}).fail(function () {
							$('#confirmation-modal').css({
								'display': 'flex',
								'align-items': 'center',
								'justify-content': 'center'
							}).fadeIn(300);
							alert('Houve um erro ao enviar a postagem! Tente novamente.');
							btn.text('Enviar');
						});
					}, 600);
				});
				
				function gerarBBCode(formType) {
					let bbcode = '';
					let titulo = '';
					let nome = '';
					
					switch(formType) {
						case 'entrada':
						titulo = 'ENTRADA DE MEMBROS';
						nome = $('#entrada-nome').val();
						const dataEntrada = $('#entrada-data').val();
						const dataEntradaFormatada = formatarData(dataEntrada);
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Data[/b][/color]: ${dataEntradaFormatada} [/font][/size][/center]\n`;
						break;
						
						case 'promocao':
						titulo = 'PROMOÇÃO DE MEMBRO';
						nome = $('#promocao-nome').val();
						const cargoAtualProm = $('#promocao-cargo-atual').val();
						const novoCargoPromo = $('#promocao-novo-cargo').val();
						const motivoPromo = $('#promocao-motivo').val();
						const dataPromo = $('#promocao-data').val();
						const dataFormatada = formatarData(dataPromo);
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Cargo Atual[/b][/color]: ${cargoAtualProm}\n`;
						bbcode += `[color=#174b1a][b]Novo Cargo[/b][/color]: ${novoCargoPromo}\n`;
						bbcode += `[color=#174b1a][b]Motivo[/b][/color]: ${motivoPromo}\n`;
						bbcode += `[color=#174b1a][b]Data[/b][/color]: ${dataFormatada} [/font][/size][/center]\n`;
						break;
						
						case 'rebaixamento':
						titulo = 'REBAIXAMENTO DE MEMBRO';
						nome = $('#rebaixamento-nome').val();
						const cargoAtualReb = $('#rebaixamento-cargo-atual').val();
						const novoCargoReb = $('#rebaixamento-novo-cargo').val();
						const motivoReb = $('#rebaixamento-motivo').val();
						const dataReb = $('#rebaixamento-data').val();
						const dataRebFormatada = formatarData(dataReb);
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Cargo Atual[/b][/color]: ${cargoAtualReb}\n`;
						bbcode += `[color=#174b1a][b]Novo Cargo[/b][/color]: ${novoCargoReb}\n`;
						bbcode += `[color=#174b1a][b]Motivo[/b][/color]: ${motivoReb}\n`;
						bbcode += `[color=#174b1a][b]Data[/b][/color]: ${dataRebFormatada} [/font][/size][/center]\n`;
						break;
						
						case 'expulsao':
						titulo = 'EXPULSÃO DE MEMBRO';
						nome = $('#expulsao-nome').val();
						const motivoExp = $('#expulsao-motivo').val();
						const comprovacoesExp = $('#expulsao-comprovacoes').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Motivo[/b][/color]: ${motivoExp}\n`;
						bbcode += `[color=#174b1a][b]Comprovações[/b][/color]: ${comprovacoesExp} [/font][/size][/center]\n`;
						break;
						
						case 'advertencia':
						titulo = 'ADVERTÊNCIA';
						nome = $('#advertencia-nome').val();
						const motivoAdv = $('#advertencia-motivo').val();
						const permissaoAdv = $('#advertencia-permissao').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Motivo[/b][/color]: ${motivoAdv}\n`;
						bbcode += `[color=#174b1a][b]Permissão[/b][/color]: ${permissaoAdv} [/font][/size][/center]\n`;
						break;
						
						case 'licenca':
						titulo = 'LICENÇA / RESERVA';
						nome = $('#licenca-nome').val();
						const diasLic = $('#licenca-dias').val();
						const permissaoLic = $('#licenca-permissao').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Quantidade de Dias[/b][/color]: ${diasLic}\n`;
						bbcode += `[color=#174b1a][b]Permissão[/b][/color]: ${permissaoLic} [/font][/size][/center]\n`;
						break;
						
						case 'saida':
						titulo = 'SAÍDA DE MEMBRO';
						nome = $('#saida-nome').val();
						const motivoSaida = $('#saida-motivo').val();
						const permissaoSaida = $('#saida-permissao').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Motivo[/b][/color]: ${motivoSaida}\n`;
						bbcode += `[color=#174b1a][b]Permissão[/b][/color]: ${permissaoSaida} [/font][/size][/center]\n`;
						break;
						
						case 'prolongamento':
						titulo = 'PROLONGAMENTO DE LICENÇA';
						nome = $('#prolongamento-nome').val();
						const diasProl = $('#prolongamento-dias').val();
						const permissaoProl = $('#prolongamento-permissao').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Quantidade de Dias[/b][/color]: ${diasProl}\n`;
						bbcode += `[color=#174b1a][b]Permissão[/b][/color]: ${permissaoProl} [/font][/size][/center]\n`;
						break;
						
						case 'retorno':
						titulo = 'RETORNO DE LICENÇA / RESERVA';
						nome = $('#retorno-nome').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[/font][/size][/center]`;
						break;
						
						case 'alteracao':
						titulo = 'ALTERAÇÃO DE NICKNAME';
						nome = $('#alteracao-nome-antigo').val();
						const cargoAlt = $('#alteracao-cargo').val();
						const nomeNovo = $('#alteracao-nome-novo').val();
						
						bbcode = gerarBBCodeBase(titulo, nome);
						bbcode += `[color=#174b1a][b]Cargo[/b][/color]: ${cargoAlt}\n`;
						bbcode += `[color=#174b1a][b]Novo Nome[/b][/color]: ${nomeNovo} [/font][/size][/center]\n`;
						break;
						
						case 'atualizacao':
						titulo = 'ATUALIZAÇÃO DE LISTAGEM';
						const tag = $('#atualizacao-nome').val();
						
						bbcode = '[color=#30a737][b][/b][/color] [table  class="rank suptable" style="border: none!important; margin: 1em; padding: 1.4em; line-height: 1.4em;"][tr style="border: none;"][td style="border: none!important;"][img]https://i.imgur.com/pOCVdub.png[/img]\n';
						bbcode += `[font=Poppins][color=white][size=15][b][DCI] Atualização realizada! [${tag}][/b][/size]\n`;
						bbcode += '[b]Foi realizada uma atualização neste horário, em caso de erros, consulte um membro da Liderança do DCI.[/b][/color][/font][/td][/tr][/table]';
						break;            
					}
					return bbcode;
				}
				
				function gerarBBCodeBase(titulo, nome) {
					return `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#174b1a"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/size][/font][/td][/tr][/table]
					[size=14][font=Poppins][b][color=#000000]${nome}[/color][/b] \n`;
				}
				
				function formatarData(dataISO) {
					if (!dataISO) return '';
					const [ano, mes, dia] = dataISO.split('T')[0].split('-');
					return `${dia}/${mes}/${ano}`;
				}
				
			});