    console.log("V1.0");
 async function fetchUsernames() {
      const sheetId = '14G0tR99X7oMQEWtwCFJaZu0YZufmrNivrU4YnlAM7cI';
      const gid = '1972973426';
      const url = `https://corsproxy.io/?https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
      const resp = await fetch(url);
      const text = await resp.text();
      let lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      let all = lines.join(' ');
      let nicks = all.split(/ +/).map(l => l.trim()).filter(Boolean);
      let result = [];
      for (let line of lines) {
        let m = line.match(/^"([^"]+)","([^"]*)","([^"]*)"$/);
        if (m) {
          let username = m[1].trim();
          let diasSemGraduacao = m[2] ? parseInt(m[2], 10) : null;
          let returnDate = m[3] ? m[3].trim() : null;
          result.push({ username, diasSemGraduacao, returnDate });
        } else {
        }
      }
      result = result.filter(obj => obj.username.length > 0);
      return result;
    }

    async function fetchCargos() {
      const sheetId = '14G0tR99X7oMQEWtwCFJaZu0YZufmrNivrU4YnlAM7cI';
      const gid = '2099285362';
      const url = `https://corsproxy.io/?https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${gid}`;
      const resp = await fetch(url);
      const text = await resp.text();
      let lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      let result = [];
      
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let m = line.match(/^"([^"]+)"$/);
        if (m) {
          let cargo = m[1].trim();
          result.push(cargo);
        } else {
          if (line.length > 0) {
            result.push(line);
          }
        }
      }
      
      return result;
    }

    async function fetchHabboUser(username) {
      const url = `https://www.habbo.com.br/api/public/users?name=${encodeURIComponent(username)}`;
      const resp = await fetch(url);
      if (!resp.ok) throw new Error('Usuário não encontrado');
      return resp.json();
    }

    async function fetchHabboGroups(uniqueId) {
      const url = `https://www.habbo.com.br/api/public/users/${uniqueId}/groups`;
      const resp = await fetch(url);
      if (!resp.ok) return [];
      return resp.json();
    }

    function formatLastAccessTime(isoString) {
  if (!isoString) return 'Desconhecido';
  const date = new Date(isoString.replace(/\+0000$/, 'Z'));
  const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
  const brt = new Date(utc - (3 * 60 * 60 * 1000));
  return brt.toLocaleString('pt-BR', { hour12: false });
    }

    function createUserCard(user, groups, diasSemGraduacao, returnDate) {
      const avatarUrl = `https://sandbox.habbo.com/habbo-imaging/avatarimage?figure=${user.figureString}&size=l&direction=3&head_direction=3`;
      let motto = user.motto || '';
      let mottoHtml = motto ? motto : '<span style="color:#d32f2f;font-weight:bold;">&gt;MISSÃO VAZIA&lt;</span>';
      const lastAccess = formatLastAccessTime(user.lastAccessTime);
      let lastAccessClass = '';
      let diffStr = '';
      let diffDays = 0;
      if (user.lastAccessTime) {
        const now = new Date();
        const last = new Date(user.lastAccessTime.replace(/\+0000$/, 'Z'));
        const utc = last.getTime() + (last.getTimezoneOffset() * 60000);
        const brt = new Date(utc - (3 * 60 * 60 * 1000));
        const diffMs = now - brt;
        diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let diffColor = (diffMs / (1000 * 60 * 60 * 24)) >= 5 ? '#d32f2f' : '#888';
        diffStr = `<span style='font-size:20px;color:${diffColor};'>${diffDays}d e ${diffHours}h</span>`;
        if ((diffMs / (1000 * 60 * 60 * 24)) >= 5) lastAccessClass = ' style="color:#d32f2f;font-weight:bold;"';
      }
      let grupoSUP = 'NÃO', grupoRCC = 'NÃO';
      if (Array.isArray(groups)) {
        for (const g of groups) {
          if (g.name === '[RCC] Supervisores') grupoSUP = 'SIM';
          if (/pol[ií]cia rcc/i.test(g.name)) grupoRCC = 'SIM';
        }
      }
      
      const needsAttention = (!motto || motto.trim() === '') ||
                            diffDays >= 5 ||
                            (grupoSUP === 'NÃO' && grupoRCC === 'NÃO') ||
                            (typeof diasSemGraduacao === 'number' && diasSemGraduacao >= 8);
      
      let diasHtml = '';
      if (typeof diasSemGraduacao === 'number') {
        diasHtml = `<div class='info'><b>Dias Sem Graduação:</b><br><span style='color:#d32f2f;font-size:18px;font-weight:bold;'>${diasSemGraduacao}</span></div>`;
      }
      let licenseHtml = '';
      if (returnDate) {
        licenseHtml = `
          <div class="group-box">
            <div class="group-title">EM LICENÇA</div>
            <div class="group-status sim">SIM</div>
            <div style='font-size:12px;color:#888;text-align:center;margin-top:4px;'>Volta: ${returnDate}</div>
          </div>
        `;
      } else {
        licenseHtml = `
          <div class="group-box">
            <div class="group-title">EM LICENÇA</div>
            <div class="group-status nao">NÃO</div>
          </div>
        `;
      }
      return {
        html: `
        <div class="card ${needsAttention ? 'needs-attention' : ''}" data-needs-attention="${needsAttention}" data-username="${user.name}">
          <button class="remove-btn" onclick="openRemoveModal('${user.name}')">&times;</button>
          <img class="avatar" src="${avatarUrl}" alt="Avatar">
          <div class="info"><b>${user.name}</b></div>
          <div class="info"><b>Último acesso:</b><br><span${lastAccessClass}>${lastAccess}</span><br>${diffStr}</div>
          <div class="info"><b>Missão:</b><br>${mottoHtml}</div>
          ${diasHtml}
          <div class="groups">
            ${licenseHtml}
            <div class="sub-groups">
              <div class="group-box">
                <div class="group-title">GRUPO SUP</div>
                <div class="group-status ${grupoSUP === 'SIM' ? 'sim' : 'nao'}">${grupoSUP}</div>
              </div>
              <div class="group-box">
                <div class="group-title">GRUPO RCC</div>
                <div class="group-status ${grupoRCC === 'SIM' ? 'sim' : 'nao'}">${grupoRCC}</div>
              </div>
            </div>
          </div>
        </div>
      `,
        needsAttention
      };
    }

    let allCards = '';
    let filteredCount = 0;
    let showingFiltered = false;
    let removedUsers = [];
    let currentUserToRemove = '';
    let usersData = [];
    let cargosData = [];

    function openRemoveModal(username) {
      currentUserToRemove = username;
      document.getElementById('reasonModal').style.display = 'block';
    }

    function closeReasonModal() {
      document.getElementById('reasonModal').style.display = 'none';
      currentUserToRemove = '';
    }

    function showRemovedModal() {
      updateRemovedList();
      document.getElementById('removedModal').style.display = 'block';
    }

    function closeRemovedModal() {
      document.getElementById('removedModal').style.display = 'none';
    }

    async function removeUser(reason) {
      if (!currentUserToRemove) return;
      
      const userIndex = usersData.findIndex(user => user.username === currentUserToRemove);
      
      let cargo = 'Não encontrado';
      
      if (userIndex >= 0 && userIndex < cargosData.length) {
        cargo = cargosData[userIndex] || 'Não informado';
      } else {
      }

      removedUsers.push({
        username: currentUserToRemove,
        reason: reason,
        cargo: cargo,
        print: ''
      });

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (card.dataset.username === currentUserToRemove) {
          card.remove();
        }
      });

      updateCounts();
      
      closeReasonModal();
    }

    function updateRemovedList() {
      const removedList = document.getElementById('removedList');
      
      if (removedUsers.length === 0) {
        removedList.innerHTML = '<p style="text-align: center; color: #666;">Nenhum usuário removido ainda.</p>';
        return;
      }

      let html = '';
      removedUsers.forEach((user, index) => {
        const needsPrint = user.reason === 'Inatividade' || 
                          user.reason === 'Não realizou a graduação em até 7 dias após a entrada na companhia';
        
        html += `
          <div class="removed-item">
            <div class="removed-item-header">${user.username}</div>
            <div class="removed-item-details">
              <strong>Motivo:</strong> ${user.reason}<br>
              <strong>Cargo:</strong> ${user.cargo}
              ${needsPrint ? `
                <br><strong>Print:</strong>
                <input type="text" class="print-input" placeholder="Insira o link do print" 
                       value="${user.print}" onchange="updatePrint(${index}, this.value)">
              ` : ''}
            </div>
          </div>
        `;
      });

      removedList.innerHTML = html;
    }

    function updatePrint(index, value) {
      if (removedUsers[index]) {
        removedUsers[index].print = value;
      }
    }

    function updateCounts() {
      const remainingCards = document.querySelectorAll('.card[data-needs-attention="true"]');
      const attentionCount = remainingCards.length;
      
      const warningDiv = document.getElementById('warning');
      const warningText = document.getElementById('warning-text');
      
      if (attentionCount > 0) {
        warningText.textContent = `Há ${attentionCount} usuários que necessitam sua atenção`;
        warningDiv.classList.remove('hidden');
      } else {
        warningDiv.classList.add('hidden');
      }
    }

    async function realizarPostagens() {
      if (removedUsers.length === 0) {
        alert('Nenhum usuário removido para realizar postagens!');
        return;
      }
      
      const grupos = {};
      
      removedUsers.forEach(user => {
        const key = `${user.reason}|||${user.cargo}`;
        if (!grupos[key]) {
          grupos[key] = {
            motivo: user.reason,
            cargo: user.cargo,
            usuarios: [],
            prints: []
          };
        }
        grupos[key].usuarios.push(user.username);
        if (user.print) {
          grupos[key].prints.push(user.print);
        }
      });
      
      const gruposArray = Object.values(grupos);
      let totalPostagens = 0;
      gruposArray.forEach(grupo => {
        const isExpulsao = grupo.motivo === 'Inatividade' || 
                          grupo.motivo === 'Não realizou a graduação em até 7 dias após a entrada na companhia';
        totalPostagens += isExpulsao ? 2 : 1;
      });
      
      const progressContainer = document.getElementById('progressContainer');
      const progressText = document.getElementById('progressText');
      const progressBar = document.getElementById('progressBar');
      
      progressContainer.classList.remove('hidden');
      progressText.textContent = 'Realizando postagens (0 / ' + totalPostagens + ')';
      progressBar.style.width = '0%';
      
      let postagensConcluidas = 0;
      
      for (let i = 0; i < gruposArray.length; i++) {
        postagensConcluidas = await processarGrupo(gruposArray[i], i, postagensConcluidas, totalPostagens);
        
        if (i < gruposArray.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
      
      progressText.textContent = 'Postagens realizadas com sucesso!';
      setTimeout(() => {
        progressContainer.classList.add('hidden');
      }, 3000);
    }
    
    async function processarGrupo(grupo, index, postagensConcluidas, totalPostagens) {
      const progressText = document.getElementById('progressText');
      const progressBar = document.getElementById('progressBar');
      
      const isExpulsao = grupo.motivo === 'Inatividade' || 
                        grupo.motivo === 'Não realizou a graduação em até 7 dias após a entrada na companhia';
      
      const dataAtual = new Date().toLocaleDateString('pt-BR');
      const nomes = grupo.usuarios.join(' / ');
      
      const bbcodeRequerimentos = isExpulsao ? 
        gerarBBCodeExpulsao(nomes, grupo.cargo, grupo.motivo, dataAtual) :
        gerarBBCodeSaida(nomes, grupo.cargo, grupo.motivo, dataAtual);
      
      try {
        await enviarPostagem(37886, bbcodeRequerimentos, `Requerimentos - Grupo ${index + 1}`);
        postagensConcluidas++;
        
        progressText.textContent = `Realizando postagens (${postagensConcluidas} / ${totalPostagens})`;
        progressBar.style.width = ((postagensConcluidas / totalPostagens) * 100) + '%';
        
        if (isExpulsao) {
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const bbcodeMedalhas = gerarBBCodeMedalhas(nomes, grupo.cargo, dataAtual);
          
          try {
            await enviarPostagem(36744, bbcodeMedalhas, `Medalhas - Grupo ${index + 1}`);
            postagensConcluidas++;
            
            progressText.textContent = `Realizando postagens (${postagensConcluidas} / ${totalPostagens})`;
            progressBar.style.width = ((postagensConcluidas / totalPostagens) * 100) + '%';
          } catch (medalhaError) {
            alert(`Erro ao postar medalhas no tópico 36744: ${medalhaError.responseText || medalhaError.statusText || 'Erro desconhecido'}`);
          }
        }
        
      } catch (error) {
      }
      
      return postagensConcluidas;
    }
    
    function gerarBBCodeExpulsao(nomes, cargo, motivo, data) {
      return `[font=Poppins][center][table  style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#155718"][tr][td][size=16][center][color=#ffffff][b]EXPULSÃO[/b][/color][/center][/size][/td][/tr][/table][/center]
[size=13][left][color=#226926][b]TAG do Membro[/b][/color]: ${nomes}
[color=#226926][b]Cargo[/b][/color]: ${cargo}
[color=#226926][b]Motivo[/b][/color]: ${motivo}
[color=#226926][b]Permissão[/b][/color]: Ministério da Segurança
[color=#226926][b]Data[/b][/color]: ${data}
[/size][/font][/left]`;
    }
    
    function gerarBBCodeSaida(nomes, cargo, motivo, data) {
      return `[font=Poppins][center][table  style="border-color: black; border-radius: 10px; overflow: hidden; width: auto;" bgcolor="#155718"][tr][td][size=16][center][color=#ffffff][b]SAÍDA[/b][/color][/center][/size][/td][/tr][/table][/center]
[size=13][left][color=#226926][b]Nickname[/b][/color]: ${nomes}
[color=#226926][b]Cargo[/b][/color]: ${cargo}
[color=#226926][b]Permissão[/b][/color]: -
[color=#226926][b]Motivo[/b][/color]: ${motivo}
[color=#226926][b]Data[/b][/color]: ${data}
[/size][/font][/left]`;
    }
    
    function gerarBBCodeMedalhas(nomes, cargo, data) {
      const dataFormatada = new Date().toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }).replace(/\./g, '').replace(/ de /g, ' ');
      
      return `[font=Poppins][color=#004d1a][b][size=17]✗ DADOS DO RESPONSÁVEL[/size][/b][/color]

[b]Nickname:[/b] {USERNAME}
[b]Grupo de tarefas:[/b] Supervisores
[b]Cargo referente:[/b] ${cargo}

[color=#004d1a][b][size=17]✗ MEDALHAS ATRIBUÍDAS[/size][/b][/color]

[b]Período de referência:[/b] ${dataFormatada}
[b]Policiais:[/b] ${nomes}
[b]Número de medalhas:[/b] [color=red](-100)[/color]

[b]Motivo:[/b] Expulsão do grupo de tarefas.[/font]`;
    }
    
    async function enviarPostagem(topico, bbcode, descricao) {
      return new Promise((resolve, reject) => {
        $.post('/post', {
          t: topico,
          message: bbcode,
          mode: 'reply',
          post: 1,
        })
        .done(function(response) {
          resolve(response);
        })
        .fail(function(xhr, status, error) {
          const errorDetails = {
            status: xhr.status,
            statusText: xhr.statusText,
            responseText: xhr.responseText,
            error: error,
            topico: topico,
            descricao: descricao
          };
          reject(errorDetails);
        });
      });
    }
    
    async function enviarMensagensPrivadas() {
      const expulsos = removedUsers.filter(user => 
        user.reason === 'Inatividade' || 
        user.reason === 'Não realizou a graduação em até 7 dias após a entrada na companhia'
      );
      
      if (expulsos.length === 0) {
        alert('Nenhum usuário para enviar mensagem privada');
        return;
      }
      
      criarInterfaceMensagens(expulsos);
    }
    
    function criarInterfaceMensagens(expulsos) {
      const removedList = document.getElementById('removedList');
      removedList.innerHTML = '';
      
      const titleDiv = document.createElement('div');
      titleDiv.innerHTML = '<h4 style="margin-bottom: 15px; color: #036e04;">Mensagens Privadas - Clique para enviar individualmente:</h4>';
      removedList.appendChild(titleDiv);
      
      expulsos.forEach((user, index) => {
        const userDiv = document.createElement('div');
        userDiv.style.cssText = `
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          margin-bottom: 10px; 
          padding: 10px; 
          background: #f9f9f9; 
          border-radius: 5px; 
          border-left: 4px solid #036e04;
        `;
        
        const userInfo = document.createElement('div');
        userInfo.style.cssText = 'flex-grow: 1; margin-right: 10px;';
        userInfo.innerHTML = `
          <strong>${user.username}</strong><br>
          <small style="color: #666;">${user.reason}</small>
        `;
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; align-items: center; gap: 10px;';
        
        const sendButton = document.createElement('button');
        sendButton.textContent = 'Enviar MP';
        sendButton.style.cssText = `
          padding: 8px 15px; 
          background-color: #007cba; 
          color: white; 
          border: none; 
          border-radius: 4px; 
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.2s;
        `;
        
        sendButton.onmouseover = function() {
          this.style.backgroundColor = '#005a8b';
        };
        sendButton.onmouseout = function() {
          this.style.backgroundColor = '#007cba';
        };
        
        const statusSpan = document.createElement('span');
        statusSpan.style.cssText = 'min-width: 80px; font-weight: bold; text-align: center;';
        statusSpan.textContent = 'Aguardando';
        statusSpan.style.color = '#666';
        
        sendButton.onclick = async function() {
          statusSpan.textContent = 'Enviando...';
          statusSpan.style.color = 'orange';
          
          try {
            console.log(`📩 Tentando enviar mensagem para: ${user.username}`);
            await enviarMensagemPrivada(user.username, user.reason, user.print);
            statusSpan.textContent = '✓ Enviado';
            statusSpan.style.color = 'green';
            console.log(`✅ Mensagem enviada com sucesso para: ${user.username}`);
          } catch (error) {
            statusSpan.textContent = '✗ Erro';
            statusSpan.style.color = 'red';
            console.error(`❌ Erro ao enviar mensagem para: ${user.username}`, error);
          }
        };
        
        buttonContainer.appendChild(sendButton);
        buttonContainer.appendChild(statusSpan);
        
        userDiv.appendChild(userInfo);
        userDiv.appendChild(buttonContainer);
        removedList.appendChild(userDiv);
      });
    }
    
    async function enviarMensagemPrivada(username, motivo, print) {
      const cleanUsername = username.replace(/^"|"$/g, '').trim();
      console.log(`📧 === ENVIANDO MENSAGEM PRIVADA ===`);
      console.log(`🧹 Username limpo: "${cleanUsername}"`);
      
      const dataAtual = new Date().toLocaleDateString('pt-BR');
      const consideracoes = motivo === 'Inatividade' ? 
        'De acordo com o Código de Conduta dos Supervisores, membros que ficarem 5 ou mais dias offline no Habbo Hotel serão expulsos e receberão 100 medalhas efetivas negativas.' :
        'De acordo com o Código de Conduta dos Supervisores, membros que não realizarem a graduação básica em até 7 dias após a entrada na companhia serão expulsos e receberão 100 medalhas efetivas negativas.';
      
      const linkPrint = print || 'https://exemplo.com/print';
      
      const message = `[table style="width: 100%; border: none!important; overflow: hidden; border-radius: 15px; line-height: 0.6em" bgcolor="#3e8025"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden"][img]https://i.imgur.com/b2a4Uch.gif[/img]  
						[font=Poppins][table style="width: 100%; border: none!important; overflow: hidden; line-height: 0.6em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="#2e581d"] 
						[img]https://www.habbo.com.br/habbo-imaging/badge/b09034s43131s50134s17113s1711594848847cad78ac939330154be639c58.gif[/img] 
						[b][size=18][color=white]NOTIFICAÇÃO DE EXPULSÃO[/color][/size][/b]
						[table style="width: 100%; border: none!important; overflow: hidden; line-height: 1.4em; border-radius: 15px"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; overflow: hidden" bgcolor="ffffff"][center]Saudações, [color=#065708][b]${cleanUsername}[/b][/color].[/center]
						O [b][color=#00c203]Ministério da Companhia dos Supervisores [/color][/b], por meio desta Mensagem Privada, informa sobre irregularidades identificadas durante sua estadia. Confira: \n
						[b]Data:[/b] ${dataAtual}
						[b]Motivo:[/b] ${motivo}
						[b]Considerações:[/b] ${consideracoes} 
						[b]Provas:[/b] ${linkPrint} \n
						[center]O erro será punido conforme os regulamentos da companhia, resultando em uma [b]expulsão[/b].[/center] \n
						[center][table style="border-radius: 15px; overflow: hidden; width: 40%" bgcolor="#198700"][tr style="overflow: hidden; border: none !important;"][td style="border: none!important; width: 30%; overflow: hidden" bgcolor="#198700"][url=${linkPrint}][right][img]https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgPpOjvA7M2VafDm8loCfggSJX5uCkskY6YA5Hu9CwVDhPYCSyAsc7A6b6QKTS75wpdPaHdKejD8dZkMmMJOW0OjpLb0HHu4tUZ7lypNSJjA6q8kD8VZ1G5Nd4oE_FF78jY8qmSgAufBmEJ/s1600/ES59E.gif[/img][/right][/url][/td][td style="border: none!important; overflow: hidden"][left][b][size=14][url=${linkPrint}][color=white]COMPROVAÇÃO[/color][/size][/b] 
						[size=10][color=white]Clique aqui para ver a comprovação.[/color][/size][/url][/left][/td][/tr][/table][/center][/td][/tr][/table][/td][/tr][/table][/font]
						[size=11][color=white]BBCode modificado por [b]laurocg2[/b] com base no original de .Brendon.[/color][/size][/td][/tr][/table]
						[scroll][b][i]Caso tenha alguma dúvida, entre em contato com o autor da Mensagem Privada.[/b][/i][/scroll]`;
      
      return new Promise((resolve, reject) => {
        $.ajaxSetup({
          timeout: 30000
        });
        
        console.log(`📤 Dados da requisição POST:`, {
          folder: 'inbox',
          mode: 'post',
          post: '1',
          username: cleanUsername,
          subject: '[SUP] Carta de Expulsão',
          message: message
        });
        console.log(`🎯 Username sendo enviado: "${cleanUsername}"`);
        
        $.post('/privmsg', {
          folder: 'inbox',
          mode: 'post',
          post: '1',
          username: cleanUsername,
          subject: '[SUP] Carta de Expulsão',
          message: message
        })
        .done(function(response) {
          console.log(`📨 Resposta recebida para "${cleanUsername}":`, response);
          
          const responseText = typeof response === 'string' ? response : JSON.stringify(response);
          const isSuccess = responseText.includes('message sent') || 
                          responseText.includes('success') || 
                          responseText.includes('enviada') ||
                          responseText.includes('Message sent') ||
                          (!responseText.includes('error') && !responseText.includes('erro') && !responseText.includes('Error'));
          
          console.log(`🔍 Response text: "${responseText}"`);
          console.log(`✅ Success status: ${isSuccess}`);
          
          if (isSuccess) {
            console.log(`✅ Mensagem processada com sucesso para: "${cleanUsername}"`);
            resolve(response);
          } else {
            console.error(`❌ Resposta indica falha para "${cleanUsername}": ${responseText}`);
            reject(new Error('Resposta indica falha no envio: ' + responseText));
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.error(`❌ Erro na requisição para "${cleanUsername}":`, {
            status: jqXHR.status,
            statusText: jqXHR.statusText,
            responseText: jqXHR.responseText,
            textStatus: textStatus,
            errorThrown: errorThrown
          });
          reject(new Error(`Erro na requisição: ${textStatus} - ${errorThrown}`));
        })
        .always(function() {
          $.ajaxSetup({
            timeout: 0
          });
        });
      });
    }

    function toggleFilter() {
      const cards = document.getElementById('cards');
      const btn = document.getElementById('btn-filter');
      
      if (showingFiltered) {
        cards.innerHTML = allCards;
        btn.textContent = 'Ver';
        showingFiltered = false;
      } else {
        const filteredCards = Array.from(document.querySelectorAll('.card[data-needs-attention="true"]'))
          .map(card => card.outerHTML).join('');
        cards.innerHTML = filteredCards;
        btn.textContent = 'Ver Todos';
        showingFiltered = true;
      }
    }

    async function main() {
      const loading = document.getElementById('loading');
      const cardsDiv = document.getElementById('cards');
      const warningDiv = document.getElementById('warning');
      const warningText = document.getElementById('warning-text');
      
      try {
        loading.textContent = 'Carregando dados da planilha...';
        usersData = await fetchUsernames();
        cargosData = await fetchCargos();
        
        let cardsHtml = '';
        let attentionCount = 0;
        const totalUsers = usersData.length;
        
        for (let i = 0; i < usersData.length; i++) {
          const obj = usersData[i];
          const username = obj.username;
          const diasSemGraduacao = obj.diasSemGraduacao;
          const returnDate = obj.returnDate;
          
          loading.textContent = `Carregando dados (${i + 1} / ${totalUsers})`;
          
          try {
            const user = await fetchHabboUser(username);
            const groups = await fetchHabboGroups(user.uniqueId);
            const cardData = createUserCard(user, groups, diasSemGraduacao, returnDate);
            cardsHtml += cardData.html;
            if (cardData.needsAttention) attentionCount++;
          } catch (e) {
            cardsHtml += `<div class="card" data-username="${username}"><button class="remove-btn" onclick="openRemoveModal('${username}')">&times;</button><div class="info">${username}<br><span style='color:#d32f2f'>Usuário não encontrado ou erro.</span></div></div>`;
          }
        }
        
        loading.textContent = 'Finalizando carregamento...';
        
        allCards = cardsHtml;
        cardsDiv.innerHTML = cardsHtml;
        filteredCount = attentionCount;
        
        if (attentionCount > 0) {
          warningText.textContent = `Há ${attentionCount} usuários que necessitam sua atenção`;
          warningDiv.classList.remove('hidden');
        }
      } catch (e) {
        cardsDiv.innerHTML = '<div class="info">Erro ao carregar dados.</div>';
      } finally {
        loading.style.display = 'none';
      }
    }
    main();
