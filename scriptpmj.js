$(document).ready(function() {
	setTimeout(function() {
		document.getElementById('initial-loading').style.display = 'none';
		
		const form = document.getElementById('dropdown-container');
		if (form) {
			form.style.display = 'block';
		}
	}, 5000);
	
	console.log("Documento pronto e jQuery carregado."); 
	
	$('.dropdown-btn').on('click', function(e) {
		e.preventDefault(); 
		e.stopPropagation(); 
		console.log("Botão do dropdown clicado!"); 
		
		var $dropdownContent = $('.dropdown-content');
		var $icon = $(this).find('i');
		$dropdownContent.toggleClass('show');
		console.log("Classe 'show' alternada. Dropdown está visível? ", $dropdownContent.hasClass('show')); 
		
		$icon.toggleClass('fa-chevron-down fa-chevron-up');
		
		if ($dropdownContent.hasClass('show')) {
			$(this).css('border-radius', '10px 10px 0 0');
			} else {
			$(this).css('border-radius', '10px');
		}
	});
	
	$(document).on('click', function(e) {
		if (!$(e.target).closest('.dropdown-container').length) {
			var $dropdownContent = $('.dropdown-content');
			if ($dropdownContent.hasClass('show')) {
				console.log("Clique fora do dropdown. Fechando..."); 
				$dropdownContent.removeClass('show');
				$('.dropdown-btn').find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				$('.dropdown-btn').css('border-radius', '10px');
			}
		}
	});
	$('.dropdown-item').on('click', function() {
		const selectedText = $(this).text().trim();
		const formType = $(this).data('form');
		console.log("Item do dropdown selecionado:", selectedText, "Formulário:", formType); 
		
		$('.selected-text').text(selectedText);
		$('.dropdown-content').removeClass('show');
		$('.dropdown-btn i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
		$('.dropdown-btn').css('border-radius', '10px');
		
		$('form').hide(); 
		$(`#${formType}-form`).fadeIn(300); 
	});
	
	$('#btn-sim').on('click', function() {
		console.log("Botão 'Sim' do modal clicado."); 
		$('#confirmation-modal').removeClass('show');
		setTimeout(function() {
			$('#confirmation-modal').css('display', 'none');
		}, 300); 
		
		$('form').each(function() {
			this.reset();
			$(this).find('.erro-validacao').hide();
			$(this).find('input, select, textarea').removeClass('campo-invalido');
			$(this).hide();
		});
		
		$('.dropdown-container').show();
		$('.selected-text').text('Selecione um tipo de requerimento   ');
	});
	
	$('#btn-nao').on('click', function() {
		console.log("Botão 'Não' do modal clicado. Redirecionando..."); 
		try {
			location.href = 'https://' + location.host + '/t36391-?view=newest';
			} catch (error) {
			console.error("Erro ao tentar redirecionar:", error);
			alert("Não foi possível redirecionar. Verifique o console para mais detalhes.");
		}
	});
	
	$('.enviar-btn').click(function() {
		
		const loadingOverlay = document.createElement('div');
		loadingOverlay.className = 'loading-overlay';
		loadingOverlay.innerHTML = `
		<img src="https://i.imgur.com/irpfaPL.gif" alt="Carregando..." class="loading-img">
		<div class="loading-message">Enviando...</div>
		`;
		document.body.appendChild(loadingOverlay);
		
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
			document.body.removeChild(loadingOverlay);
			return;
		}
		
		let bbcode = gerarBBCode(formType);
		
		$('#fa-generated-message').val(bbcode);
		
		$(this).text('Enviando...');
		const btn = $(this); 
		
		setTimeout(function () {
			$.post('/post', {
				t: 36391,
				message: $('#fa-generated-message').val().trim(),
				mode: 'reply',
				post: 1,
				}).done(function () {
				document.body.removeChild(loadingOverlay);
				
				$('#confirmation-modal').addClass('show');
				$('#confirmation-modal').css({
					'display': 'flex'
				});
				
				btn.text('Enviar');
				}).fail(function () {
				console.log("BBCode gerado:", $('#fa-generated-message').val().trim());
				document.body.removeChild(loadingOverlay);
				$('#confirmation-modal').addClass('show');
				$('#confirmation-modal').css({
					'display': 'flex'
				});
				alert('Houve um erro ao enviar a postagem! Tente novamente.');
				btn.text('Enviar');
			});
		}, 600);
	});
	
	function gerarBBCode(formType) {
		let titulo = '';
		let nome = '';
		
		switch(formType) {
			case 'entrada':
			titulo = 'ENTRADA DE MEMBROS';
			nome = $('#entrada-nome').val();
			const dataEntrada = $('#entrada-data').val();
			const dataEntradaFormatada = formatarData(dataEntrada);
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Data[/b][/color]: ${dataEntradaFormatada} [/center][/font][/size]`;
			break;
			
			case 'promocao':
			titulo = 'PROMOÇÃO DE MEMBRO';
			nome = $('#promocao-nome').val();
			const cargoAtualProm = $('#promocao-cargo-atual').val();
			const cargoNovoProm = $('#promocao-novo-cargo').val();
			const motivoProm = $('#promocao-motivo').val();
			const dataProm = formatarData($('#promocao-data').val());
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Cargo Atual[/b][/color]: ${cargoAtualProm}
			[color=black][b]Novo Cargo[/b][/color]: ${cargoNovoProm}
			[color=black][b]Motivo[/b][/color]: ${motivoProm}
			[color=black][b]Data[/b][/color]: ${dataProm} [/center][/font][/size]`;
			break;
			
			case 'rebaixamento':
			titulo = 'REBAIXAMENTO DE MEMBRO';
			nome = $('#rebaixamento-nome').val();
			const cargoAtualReb = $('#rebaixamento-cargo-atual').val();
			const novoCargoReb = $('#rebaixamento-novo-cargo').val();
			const motivoReb = $('#rebaixamento-motivo').val();
			const dataReb = $('#rebaixamento-data').val();
			const dataRebFormatada = formatarData(dataReb);
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Cargo Atual[/b][/color]: ${cargoAtualReb}
			[color=black][b]Novo Cargo[/b][/color]: ${novoCargoReb}
			[color=black][b]Motivo[/b][/color]: ${motivoReb}
			[color=black][b]Data[/b][/color]: ${dataRebFormatada} [/center][/font][/size]`;
			break;
			
			case 'expulsao':
			titulo = 'EXPULSÃO DE MEMBRO';
			nome = $('#expulsao-nome').val();
			const motivoExp = $('#expulsao-motivo').val();
			const comprovacoesExp = $('#expulsao-comprovacoes').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Motivo[/b][/color]: ${motivoExp}
			[color=black][b]Comprovações[/b][/color]: ${comprovacoesExp} [/center][/font][/size]`;
			break;
			
			case 'advertencia':
			titulo = 'ADVERTÊNCIA';
			nome = $('#advertencia-nome').val();
			const motivoAdv = $('#advertencia-motivo').val();
			const permissaoAdv = $('#advertencia-permissao').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Motivo[/b][/color]: ${motivoAdv}
			[color=black][b]Permissão[/b][/color]: ${permissaoAdv} [/center][/font][/size]`;
			break;
			
			case 'licenca':
			titulo = 'LICENÇA / RESERVA';
			nome = $('#licenca-nome').val();
			const diasLic = $('#licenca-dias').val();
			const permissaoLic = $('#licenca-permissao').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Quantidade de Dias[/b][/color]: ${diasLic}
			[color=black][b]Permissão[/b][/color]: ${permissaoLic} [/center][/font][/size]`;
			break;
			
			case 'saida':
			titulo = 'SAÍDA DE MEMBRO';
			nome = $('#saida-nome').val();
			const motivoSaida = $('#saida-motivo').val();
			const permissaoSaida = $('#saida-permissao').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Motivo[/b][/color]: ${motivoSaida}
			[color=black][b]Permissão[/b][/color]: ${permissaoSaida} [/center][/font][/size]`;
			break;
			
			case 'prolongamento':
			titulo = 'PROLONGAMENTO DE LICENÇA';
			nome = $('#prolongamento-nome').val();
			const diasProl = $('#prolongamento-dias').val();
			const permissaoProl = $('#prolongamento-permissao').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Quantidade de Dias[/b][/color]: ${diasProl}
			[color=black][b]Permissão[/b][/color]: ${permissaoProl} [/center][/font][/size]`;
			break;
			
			case 'retorno':
			titulo = 'RETORNO DE LICENÇA / RESERVA';
			nome = $('#retorno-nome').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[/center][/font][/size]`;
			break;
			
			case 'alteracao':
			titulo = 'ALTERAÇÃO DE NICKNAME';
			nome = $('#alteracao-nome-antigo').val();
			const cargoAlt = $('#alteracao-cargo').val();
			const nomeNovo = $('#alteracao-nome-novo').val();
			var bbcode = `[font=Poppins][center][table style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#4d4c4c"][tr][td][size=16][color=#ffffff][b]${titulo}[/b][/color][/center][/size][/font][/td][/tr][/table]
			
			[center][size=14][font=Poppins][b][color=black]${nome}[/color][/b] 
			[color=black][b]Cargo[/b][/color]: ${cargoAlt}
			[color=black][b]Novo Nome[/b][/color]: ${nomeNovo} [/center][/font][/size]`;
			break;
			
			case 'atualizacao':
			const tag = $('#atualizacao-nome').val();
			var bbcode = `<table class="rank pmj" style="transition: none 0ms ease 0s; margin: 1em; padding: 1.4em; RCC - SÓ A VERDADEIRA-color: rgb(0, 92, 3); width: -webkit-fill-available; height: auto; text-align: center; border-radius: 8px; color: white; border-collapse: collapse; font-family: Roboto, sans-serif; border-width: initial !important; border-style: none !important; border-color: initial !important;"><tbody><tr style="transition: none; border: none; box-sizing: border-box; margin: 0px; padding: 0px;"><td style="transition: none 0ms ease 0s; box-sizing: border-box; margin: 0px; padding: 15px; border-width: initial !important; border-style: none !important; border-color: initial !important;"><img src="https://www.habbo.com.br/habbo-imaging/badge/b09244s43131s50134s17133s17135b1210d8727f4f7f0adf08ed5ab5bd644.gif" alt="PMJ LOGO"><br><font face="Poppins"><font color="white"><span style="font-size: 17px; line-height: normal"><strong>Atualizado por ${tag}</strong></span></font></font></td></tr></tbody></table>`;
			break;
		}
		return bbcode;
	}
	
	function formatarData(dataISO) {
		if (!dataISO) return '';
		const partes = dataISO.split('-');
		if (partes.length === 3) {
			return `${partes[2]}/${partes[1]}/${partes[0]}`;
		}
		return dataISO; 
	}
});
