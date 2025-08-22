 console.log("V1.01");
  document.addEventListener('DOMContentLoaded', function() {
            const btn = document.getElementById('btnAdvertencias');
            if (btn) {
                btn.addEventListener('click', openAdvertenciasModal);
            }
        });

        function openAdvertenciasModal() {
            document.getElementById('advertenciasModal').style.display = 'block';
            document.getElementById('advertenciasLoading').style.display = 'block';
            document.getElementById('advertenciasTableWrapper').innerHTML = '';
            fetchAdvertenciasCSV();
        }

        function closeAdvertenciasModal() {
            document.getElementById('advertenciasModal').style.display = 'none';
        }

        async function fetchAdvertenciasCSV() {
            const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSMZhcsyhDINjmQHSsuz4bPWeKFCFEDMBfTDjlDFlTZKFiOd6ZlmVjznD1fiRoj9kkRfmfNcMnlKArz/pub?gid=304601229&single=true&output=csv';
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao buscar CSV');
                const text = await response.text();
                renderAdvertenciasTable(text);
            } catch (e) {
                document.getElementById('advertenciasTableWrapper').innerHTML = '<div style="color:#ff4757; text-align:center;">Erro ao carregar dados.</div>';
            } finally {
                document.getElementById('advertenciasLoading').style.display = 'none';
            }
        }

function renderAdvertenciasTable(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 3) {
        document.getElementById('advertenciasTableWrapper').innerHTML = '<div style="color:#ff4757; text-align:center;">Sem dados.</div>';
        return;
    }
    function parseCSVLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            const nextChar = line[i + 1];
            
            if (char === '"') {
                if (inQuotes && nextChar === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    }
    
    const header = parseCSVLine(lines[1]);
    const data = lines.slice(2).map(line => parseCSVLine(line));
    
    let html = '<table style="width:100%; border-collapse:collapse; font-size:16px; margin-top:10px;">';
    html += '<thead><tr>';
    html += `<th style="text-align:left; padding:10px 8px; border-bottom:1.5px solid var(--border-color); font-size:17px;">${header[1] || 'Nome'}</th>`;
    html += `<th style="text-align:center; padding:10px 8px; border-bottom:1.5px solid var(--border-color); font-size:17px;">${header[2] || 'Contagem'}</th>`;
    html += '</tr></thead><tbody>';
    
    data.forEach(row => {
        if (row.length >= 3 && row[1] && row[2]) {
            const nome = row[1].trim();
            const contagem = row[2].trim();
            const count = parseInt(contagem, 10);
            const highlight = !isNaN(count) && count >= 3 ? 'background:#ff4757; color:white;' : 'color:var(--primary-green);';
            
            html += `<tr><td style="padding:9px 8px; border-bottom:1px solid var(--border-color); color:var(--text-primary); font-size:16px;">${nome}</td><td style="text-align:center; padding:9px 8px; border-bottom:1px solid var(--border-color); font-weight:600; font-size:16px; ${highlight}">${contagem}</td></tr>`;
        }
    });
    
    html += '</tbody></table>';
    document.getElementById('advertenciasTableWrapper').innerHTML = html;
}
        let allData = [];
        let isLoggedIn = false;
        let userLevel = '';
        let currentUser = '';
        let editingCell = null;
        let changeLog = [];
        
        const SPREADSHEET_ID = '1vSMZhcsyhDINjmQHSsuz4bPWeKFCFEDMBfTDjlDFlTZKFiOd6ZlmVjznD1fiRoj9kkRfmfNcMnlKArz';
        const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyVxUjRL-eNgQ08Auo1LrECLWD3bgb5vdTLKeqJ1ApC1UQNFdza_aCo04S4CPyVvujp/exec';
        const LOG_URL = 'https://centraldecasosdis.cloud/logs.txt';
        const LOG_PHP_URL = 'https://centraldecasosdis.cloud/salvarlog.php';
        
        
        const COLUMN_MAPPING = {
            'ORDEM': 'B',
            'CARIMBO': 'C', 
            'NICK DO FISCALIZADOR': 'D',
            'NICK DO INFRATOR': 'E',
            'LINHA': 'F',
            'INFRAÇÃO': 'G',
            'ANEXOS': 'H',
            'VEREDITO': 'I',
            'PRINT MP': 'J',
            'TAG': 'L',
            'STATUS': 'M',
            'INDICADOR': 'N'
        };

        function checkAPIConfiguration() {
            if (APPS_SCRIPT_URL === 'SUA_URL_DO_SCRIPT_AQUI' || !APPS_SCRIPT_URL.includes('script.google.com/macros/s/')) {
                showStatus('⚠️ Sistema de edição não configurado. Edições funcionarão apenas localmente.', 'error');
                return false;
            }
            return true;
        }

        async function loadAuthorizedUsers() {
        }

        function openLoginModal() {
            document.getElementById('loginModal').style.display = 'block';
            document.getElementById('codeInput').focus();
            document.getElementById('loginError').style.display = 'none';
        }

        function closeLoginModal() {
            document.getElementById('loginModal').style.display = 'none';
            document.getElementById('codeInput').value = '';
            document.getElementById('loginError').style.display = 'none';
            restoreLoginButton();
        }

        async function validateAccess() {
            const code = document.getElementById('codeInput').value.trim();
            const loginBtn = document.getElementById('loginBtn');
            
            if (!code) {
                showError('Digite o código de acesso');
                return;
            }

            loginBtn.disabled = true;
            loginBtn.textContent = 'Entrando...';
            loginBtn.style.opacity = '0.6';
            loginBtn.style.cursor = 'not-allowed';
            
            document.getElementById('loginError').style.display = 'none';

            try {
                const params = new URLSearchParams({
                    action: 'validateUser',
                    code: code
                });
                
                let result;
                
                try {
                    const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    
                    if (response.ok) {
                        result = await response.json();
                    } else {
                        throw new Error('Fetch failed');
                    }
                } catch (fetchError) {
                    console.log('Fetch falhou, tentando JSONP...', fetchError);
                    
                    result = await validateUserWithJSONP(code);
                }
                
                if (result && result.success) {
                    isLoggedIn = true;
                    currentUser = result.user;
                    userLevel = result.level;
                    
                    const userBadge = document.getElementById('userBadge');
                    userBadge.textContent = `👤 ${currentUser}`;
                    userBadge.className = 'user-badge';
                    
                    if (userLevel === 'leader') {
                        userBadge.classList.add('leader');
                        document.getElementById('accessMessage').innerHTML = 
                            'Você pode editar <strong>a maioria das colunas</strong> (exceto Ordem, Carimbo e Indicador). <button class="btn" onclick="openLogModal()" style="margin-left: 10px; padding: 6px 12px; font-size: 12px;">📋 Ver Logs</button>';
                    } else if (userLevel === 'perito') {
                        document.getElementById('accessMessage').innerHTML = 
                            'Clique nos campos de <strong>Status</strong>, <strong>Tag</strong>, <strong>Veredito</strong> ou <strong>Print MP</strong> para editar.';
                    } else if (userLevel === 'fiscalizador') {
                        userBadge.classList.add('fiscalizador');
                        document.getElementById('accessMessage').innerHTML = 
                            'Você tem acesso apenas para <strong>visualização</strong> dos dados.';
                    }
                    
                    document.getElementById('mainContent').style.display = 'block';
                    document.getElementById('accessControls').style.display = 'block';
                    
                    if (userLevel !== 'fiscalizador') {
                        document.getElementById('editModeIndicator').style.display = 'block';
                    }
                    
                    closeLoginModal();
                    
                    loadData();
                    
                    showStatus('✅ Login realizado com sucesso! Acesso liberado.', 'success');
                } else {
                    showError(result?.error || 'Código incorreto');
                    restoreLoginButton();
                }
                
            } catch (error) {
                console.error('Erro na validação:', error);
                showError('Sistema de acesso indisponível. Verifique a conexão.');
                restoreLoginButton();
            }
        }

        function restoreLoginButton() {
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Entrar';
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
        }

        function validateUserWithJSONP(code) {
            return new Promise((resolve, reject) => {
                const callbackName = 'jsonp_callback_' + Math.random().toString(36).substr(2, 9);
                const script = document.createElement('script');
                const timeoutId = setTimeout(() => {
                    cleanup();
                    reject(new Error('Timeout na validação'));
                }, 10000);
                
                function cleanup() {
                    if (window[callbackName]) {
                        delete window[callbackName];
                    }
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    clearTimeout(timeoutId);
                }
                
                window[callbackName] = function(data) {
                    cleanup();
                    resolve(data);
                };
                
                script.onerror = function() {
                    cleanup();
                    reject(new Error('Erro ao carregar script'));
                };
                
                const params = new URLSearchParams({
                    action: 'validateUser',
                    code: code,
                    callback: callbackName
                });
                
                script.src = `${APPS_SCRIPT_URL}?${params.toString()}`;
                document.head.appendChild(script);
            });
        }

        function showError(message) {
            const errorDiv = document.getElementById('loginError');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        function logout() {
            isLoggedIn = false;
            currentUser = '';
            userLevel = '';
            
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('accessControls').style.display = 'none';
            document.getElementById('editModeIndicator').style.display = 'none';
            document.getElementById('loginModal').style.display = 'block';
            
            if (editingCell) {
                cancelEdit();
            }
            
            allData = [];
            changeLog = [];
            document.getElementById('tableContainer').innerHTML = '';
            
            showStatus('Logout realizado com sucesso. Faça login novamente.', 'success');
        }

        async function testAppsScript() {
            return;
        }

        function canEditColumn(columnName) {
            if (!isLoggedIn) return false;
            
            if (userLevel === 'leader') {
                const restrictedColumns = ['ORDEM', 'CARIMBO', 'INDICADOR'];
                return !restrictedColumns.includes(columnName);
            } else if (userLevel === 'perito') {
                return ['STATUS', 'TAG', 'VEREDITO', 'PRINT MP'].includes(columnName);
            } else if (userLevel === 'fiscalizador') {
                return false;
            }
            
            return false;
        }

        function getCurrentCellValue(cell, columnName) {
            if (columnName === 'STATUS') {
                const statusBadge = cell.querySelector('.status-badge');
                return statusBadge ? statusBadge.textContent.trim() : '';
            } else if (columnName === 'VEREDITO') {
                const veredito = cell.querySelector('.veredito-cell');
                return veredito ? veredito.textContent.trim() : '';
            } else if (columnName === 'TAG') {
                const tag = cell.querySelector('.tag-cell');
                return tag ? tag.textContent.trim() : '';
            } else if (columnName === 'INDICADOR') {
                return cell.classList.contains('indicador-s') ? 'S' : '';
            } else if (columnName === 'CARIMBO') {
                const carimbo = cell.querySelector('.carimbo-cell');
                return carimbo ? carimbo.textContent.trim() : '';
            } else if (columnName === 'ORDEM') {
                const ordem = cell.querySelector('.ordem-cell');
                return ordem ? ordem.textContent.trim() : '';
            } else if (columnName === 'LINHA') {
                const linha = cell.querySelector('.linha-cell');
                return linha ? (linha.getAttribute('title') || linha.textContent.trim()) : '';
            } else if (['NICK DO FISCALIZADOR', 'NICK DO INFRATOR'].includes(columnName)) {
                const nick = cell.querySelector('.nick-cell');
                return nick ? nick.textContent.trim() : '';
            } else if (['ANEXOS', 'PRINT MP'].includes(columnName)) {
                const link = cell.querySelector('.link-cell');
                if (link && link.tagName === 'A') {
                    return link.getAttribute('href') || '';
                }
                return '';
            } else {
                const link = cell.querySelector('a.link-cell');
                if (link) {
                    return link.getAttribute('href') || '';
                }
                return cell.textContent.trim();
            }
        }

        function makeEditableFromCell(cell, rowIndex, columnName) {
            const currentValue = getCurrentCellValue(cell, columnName);
            makeEditable(cell, rowIndex, columnName, currentValue);
        }

        function makeEditable(cell, rowIndex, columnName, currentValue) {
            if (!canEditColumn(columnName) || editingCell) return;
            
            editingCell = { cell, rowIndex, columnName, originalValue: currentValue };
            
            let inputElement;
            
            if (columnName === 'STATUS') {
                inputElement = document.createElement('select');
                inputElement.className = 'edit-select';
                inputElement.innerHTML = `
                    <option value="" ${currentValue === '' ? 'selected' : ''}></option>
                    <option value="Aprovado (DIAS)" ${currentValue === 'Aprovado (DIAS)' ? 'selected' : ''}>Aprovado (DIAS)</option>
                    <option value="Aprovado" ${currentValue === 'Aprovado' ? 'selected' : ''}>Aprovado</option>
                    <option value="Reprovado" ${currentValue === 'Reprovado' ? 'selected' : ''}>Reprovado</option>
                `;
            } else if (columnName === 'TAG') {
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.className = 'edit-input';
                inputElement.value = currentValue || '';
                inputElement.placeholder = 'Digite a tag...';
            } else if (columnName === 'INDICADOR') {
                inputElement = document.createElement('select');
                inputElement.className = 'edit-select';
                inputElement.innerHTML = `
                    <option value="" ${currentValue === '' ? 'selected' : ''}>Vazio</option>
                    <option value="S" ${currentValue === 'S' ? 'selected' : ''}>S</option>
                `;
            } else if (columnName === 'PRINT MP') {
                inputElement = document.createElement('input');
                inputElement.type = 'url';
                inputElement.className = 'edit-input';
                inputElement.value = currentValue || '';
                inputElement.placeholder = 'Digite a URL do print MP...';
            } else if (columnName === 'VEREDITO') {
                inputElement = document.createElement('textarea');
                inputElement.className = 'edit-textarea';
                inputElement.value = currentValue || '';
                inputElement.placeholder = 'Digite o veredito...';
            } else {
                inputElement = document.createElement('input');
                inputElement.type = 'text';
                inputElement.className = 'edit-input';
                inputElement.value = currentValue || '';
                inputElement.placeholder = `Digite ${columnName.toLowerCase()}...`;
            }
            
            const controls = document.createElement('div');
            controls.className = 'edit-controls';
            
            const saveBtn = document.createElement('button');
            saveBtn.className = 'save-btn';
            saveBtn.innerHTML = '💾 Salvar';
            saveBtn.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                saveEdit();
            };
            
            const cancelBtn = document.createElement('button');
            cancelBtn.className = 'cancel-btn';
            cancelBtn.innerHTML = '❌ Cancelar';
            cancelBtn.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                cancelEdit();
            };
            
            controls.appendChild(saveBtn);
            controls.appendChild(cancelBtn);
            
            cell.innerHTML = '';
            cell.appendChild(inputElement);
            cell.appendChild(controls);
            
            inputElement.focus();
            
            inputElement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    saveEdit();
                } else if (e.key === 'Escape') {
                    cancelEdit();
                }
            });
        }

        async function updateGoogleSheet(rowIndex, columnName, newValue) {
            if (!checkAPIConfiguration()) {
                throw new Error('Google Apps Script não configurado');
            }
            
            try {
                const columnLetter = COLUMN_MAPPING[columnName];
                if (!columnLetter) {
                    throw new Error(`Coluna ${columnName} não mapeada`);
                }
                
                const realRow = rowIndex + 2;
                
                const params = new URLSearchParams({
                    action: 'update',
                    rowIndex: realRow.toString(),
                    column: columnLetter,
                    value: newValue
                });
                
                const getUrl = `${APPS_SCRIPT_URL}?${params.toString()}`;
                
                let result;
                
                try {
                    const response = await fetch(getUrl, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    
                    if (response.ok) {
                        result = await response.json();
                    } else {
                        throw new Error('Fetch failed');
                    }
                } catch (fetchError) {
                    console.log('Fetch falhou para atualização, tentando JSONP...', fetchError);
                    
                    result = await updateCellWithJSONP(realRow, columnLetter, newValue);
                }
                
                if (!result || !result.success) {
                    throw new Error(result?.error || 'Erro desconhecido do Apps Script');
                }
                
                return result;
                
            } catch (error) {
                throw error;
            }
        }

        function updateCellWithJSONP(rowIndex, column, value) {
            return new Promise((resolve, reject) => {
                const callbackName = 'jsonp_update_' + Math.random().toString(36).substr(2, 9);
                const script = document.createElement('script');
                const timeoutId = setTimeout(() => {
                    cleanup();
                    reject(new Error('Timeout na atualização'));
                }, 15000);
                
                function cleanup() {
                    if (window[callbackName]) {
                        delete window[callbackName];
                    }
                    if (script.parentNode) {
                        script.parentNode.removeChild(script);
                    }
                    clearTimeout(timeoutId);
                }
                
                window[callbackName] = function(data) {
                    cleanup();
                    resolve(data);
                };
                
                script.onerror = function() {
                    cleanup();
                    reject(new Error('Erro ao carregar script de atualização'));
                };
                
                const params = new URLSearchParams({
                    action: 'update',
                    rowIndex: rowIndex.toString(),
                    column: column,
                    value: value,
                    callback: callbackName
                });
                
                script.src = `${APPS_SCRIPT_URL}?${params.toString()}`;
                document.head.appendChild(script);
            });
        }

      async function saveEdit() {
    if (!editingCell) return;
    
    const { cell, rowIndex, columnName, originalValue } = editingCell;
    const inputElement = cell.querySelector('.edit-input, .edit-select, .edit-textarea');
    const newValue = inputElement.value.trim();
    
    const indicator = document.getElementById('savingIndicator');
    indicator.classList.add('show');
    
    try {
        await updateGoogleSheet(rowIndex, columnName, newValue);
        
        if (allData[rowIndex] && allData[rowIndex][columnName] !== undefined) {
            allData[rowIndex][columnName] = newValue;
        }
        
        await logChange(columnName, originalValue, newValue, rowIndex);
        
        restoreCell(cell, columnName, newValue);
        
        showStatus('✅ Alteração salva na planilha com sucesso!', 'success');
        setTimeout(async () => {
            try {
                await loadData(true); 
            } catch (error) {
                console.warn('Erro ao recarregar dados após edição:', error);
            }
        }, 10000);
        
    } catch (error) {
        let errorMessage = '❌ Erro ao salvar na planilha. ';
        
        if (error.message.includes('Failed to fetch') || error.message.includes('conectividade')) {
            errorMessage += 'Problema de conexão com o Google Apps Script. Verifique se está implantado corretamente.';
        } else if (error.message.includes('não configurado')) {
            errorMessage += 'Apps Script não configurado.';
        } else if (error.message.includes('permission') || error.message.includes('não autorizado')) {
            errorMessage += 'Sem permissão para editar.';
        } else if (error.message.includes('not found') || error.message.includes('não encontrada')) {
            errorMessage += 'Planilha não encontrada.';
        } else if (error.message.includes('HTTP 4')) {
            errorMessage += 'Erro de autorização. Verifique as permissões do Apps Script.';
        } else if (error.message.includes('HTTP 5')) {
            errorMessage += 'Erro interno do servidor. Tente novamente em alguns minutos.';
        } else if (error.message.includes('CORS')) {
            errorMessage += 'Problema de CORS. Verifique se o Apps Script permite requisições externas.';
        } else {
            errorMessage += `${error.message || 'Tente novamente.'}`;
        }
        
        showStatus(errorMessage, 'error');
        
        restoreCell(cell, columnName, originalValue);
    }
    
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 3000);
    
    editingCell = null;
}

        async function logChange(columnName, oldValue, newValue, rowIndex) {
            try {
                const now = new Date();
                const timestamp = now.toLocaleString('pt-BR', {
                    timeZone: 'America/Sao_Paulo',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });

                const logEntry = {
                    timestamp: timestamp,
                    user: currentUser,
                    userLevel: userLevel,
                    column: columnName,
                    oldValue: oldValue || '(vazio)',
                    newValue: newValue || '(vazio)',
                    rowIndex: (typeof rowIndex === 'number' ? rowIndex + 2 : rowIndex),
                    date: now.toISOString().split('T')[0]
                };

                changeLog.unshift(logEntry);
                await saveLogToFile(logEntry);
            } catch (error) {
                console.error('Erro ao registrar log:', error);
            }
        }

        async function saveLogToFile(logEntry) {
            try {
                const response = await fetch(LOG_PHP_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(logEntry)
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        console.log('Log salvo com sucesso:', result.message);
                        if (result.remote_saved) {
                            console.log('✅ Salvo no arquivo remoto');
                        }
                        return;
                    } else {
                        throw new Error(result.error || 'Erro desconhecido do servidor PHP');
                    }
                } else {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

            } catch (error) {
                console.warn('Erro ao salvar via PHP:', error);
                console.error('Log não foi salvo devido ao erro no servidor');
            }
        }

        function cancelEdit() {
            if (!editingCell) {
                return;
            }
            
            const { cell, columnName, originalValue } = editingCell;
            
            const editInput = cell.querySelector('.edit-input, .edit-select, .edit-textarea');
            const editControls = cell.querySelector('.edit-controls');
            
            if (editInput) {
                editInput.remove();
            }
            if (editControls) {
                editControls.remove();
            }
            
            editingCell = null;
            
            restoreCell(cell, columnName, originalValue);
        }

        function restoreCell(cell, columnName, value) {
            let cellContent = value || '';
            
            if (columnName === 'STATUS' && value) {
                const statusClass = getStatusClass(value);
                cellContent = `<span class="status-badge ${statusClass}">${value}</span>`;
            } else if (columnName === 'VEREDITO' && value) {
                cellContent = `<span class="veredito-cell">${value}</span>`;
            } else if (columnName === 'TAG' && value) {
                cellContent = `<span class="tag-cell">${value}</span>`;
            } else if (columnName === 'INDICADOR') {
                if (value && value.trim().toUpperCase() === 'S') {
                    cellContent = '';
                    cell.classList.add('indicador-s');
                } else {
                    cellContent = '';
                    cell.classList.remove('indicador-s');
                }
            } else if (columnName === 'CARIMBO' && value) {
                const formattedDate = formatDateToCarimbo(value);
                cellContent = `<span class="carimbo-cell">${formattedDate}</span>`;
            } else if (columnName === 'ORDEM' && value) {
                cellContent = `<span class="ordem-cell">${value}</span>`;
            } else if (columnName === 'LINHA' && value) {
                const displayValue = value.length > 4 ? value.substring(0, 4) : value;
                const titleAttr = value.length > 4 ? `title="${value}"` : '';
                cellContent = `<span class="linha-cell" ${titleAttr}>${displayValue}</span>`;
            } else if (['NICK DO FISCALIZADOR', 'NICK DO INFRATOR'].includes(columnName) && value) {
                cellContent = `<span class="nick-cell">${value}</span>`;
            } else if (['ANEXOS', 'PRINT MP'].includes(columnName) && value) {
                if (value.includes('http')) {
                    cellContent = `<a href="${value}" target="_blank" class="link-cell">🔗</a>`;
                } else {
                    cellContent = value ? `<span class="link-cell">📄</span>` : '';
                }
            } else if (value && value.includes('http')) {
                cellContent = `<a href="${value}" target="_blank" class="link-cell">🔗 Ver</a>`;
            }
            
            cell.innerHTML = cellContent;
            
            if (canEditColumn(columnName)) {
                cell.classList.add('editable-cell');
            }
        }

        function convertToCSVUrl(url) {
            if (url.includes('/edit')) {
                const id = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
                if (id) {
                    return `https://docs.google.com/spreadsheets/d/${id[1]}/export?format=csv`;
                }
            }
            return url;
        }

        function formatDateToCarimbo(dateString) {
            if (!dateString || dateString.trim() === '') return '';
            
            try {
                let date;
                
                if (/^\d{2}\/\d{2}\/\d{2} \d{2}:\d{2}$/.test(dateString.trim())) {
                    return dateString.trim();
                }
                
                if (dateString.includes('GMT') || dateString.includes('UTC')) {
                    date = new Date(dateString);
                } else if (dateString.includes('/') && dateString.includes(':')) {
                    const parts = dateString.split(' ');
                    if (parts.length >= 2) {
                        const datePart = parts[0].split('/');
                        const timePart = parts[1];
                        if (datePart.length === 3) {
                            const day = datePart[0];
                            const month = datePart[1];
                            let year = datePart[2];
                            if (year.length === 2) {
                                year = '20' + year;
                            }
                            date = new Date(`${year}-${month}-${day}T${timePart}`);
                        }
                    }
                } else {
                    date = new Date(dateString);
                }
                
                if (isNaN(date.getTime())) {
                    return dateString;
                }
                
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const year = String(date.getFullYear()).slice(-2);
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                
                return `${day}/${month}/${year} ${hours}:${minutes}`;
                
            } catch (error) {
                console.warn('Erro ao formatar data:', dateString, error);
                return dateString;
            }
        }

       async function loadData(silent = false) {
    localStorage.removeItem('changeLogs');
    
    const APPS_SCRIPT_CSV_URL = 'https://script.google.com/macros/s/AKfycbyko7Hf4AmdlJdz42RmDsmQkOo2vGHUPZIt6Y03g-SwlCVDpToz0falkTxoudT06X9D/exec';

    if (!silent) {
        showLoading(true);
        hideStatus();
    }

    try {
        let csvText;
        let response;
        
        try {
            console.log('Tentando carregar dados via Apps Script...');
            const params = new URLSearchParams({
                action: 'getCsvData'
            });
            
            response = await fetch(`${APPS_SCRIPT_CSV_URL}?${params.toString()}`, {
                method: 'GET',
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            
            csvText = await response.text();
            
            if (csvText.startsWith('error,')) {
                throw new Error(csvText.substring(6));
            }
            
            console.log('✅ Dados carregados via Apps Script com sucesso');
            
        } catch (fetchError) {
            console.warn('Falha ao carregar via Apps Script:', fetchError);
            
            console.log('Tentando fallback para URL CSV pública...');
            const fallbackUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSMZhcsyhDINjmQHSsuz4bPWeKFCFEDMBfTDjlDFlTZKFiOd6ZlmVjznD1fiRoj9kkRfmfNcMnlKArz/pub?gid=205896872&single=true&output=csv";
            
            response = await fetch(fallbackUrl);
            
            if (!response.ok) {
                throw new Error(`Erro HTTP no fallback: ${response.status}`);
            }
            
            csvText = await response.text();
            console.log('⚠️ Dados carregados via fallback CSV');
        }
        
        const data = parseCSV(csvText);
        
        if (data.length === 0) {
            throw new Error('Nenhum dado encontrado na planilha');
        }
        
        allData = data;
        if (!silent) {
            populateFilters();
        }
        
        filterData();
        
    } catch (error) {
        if (!silent) {
            showStatus(`❌ Erro ao carregar dados: ${error.message}`, 'error');
            document.getElementById('tableContainer').innerHTML = '';
        }
    }
    
    if (!silent) {
        showLoading(false);
    }
}

        async function openLogModal() {
            if (userLevel !== 'leader') {
                showStatus('❌ Acesso negado. Apenas líderes podem visualizar os logs.', 'error');
                return;
            }

            document.getElementById('logModal').style.display = 'block';
            await loadLogs();
        }

        function closeLogModal() {
            document.getElementById('logModal').style.display = 'none';
        }

        async function loadLogs() {
            const tableContent = document.getElementById('logTableContent');
            tableContent.innerHTML = '<div class="log-loading">Carregando logs...</div>';

            try {
                let logs = [];
                
                try {
                    const response = await fetch(LOG_PHP_URL + '?t=' + Date.now(), {
                        method: 'GET',
                        cache: 'no-cache'
                    });
                    
                    if (response.ok) {
                        const logText = await response.text();
                        if (logText.trim()) {
                            logs = parseLogFile(logText);
                            console.log('Logs carregados via PHP:', logs.length);
                        }
                    }
                } catch (fetchError) {
                    console.warn('Não foi possível carregar via PHP:', fetchError);
                }

                const allLogs = [...changeLog, ...logs];
                
                const uniqueLogs = allLogs.filter((log, index, self) => 
                    index === self.findIndex(l => 
                        l.timestamp === log.timestamp && 
                        l.user === log.user && 
                        l.column === log.column
                    )
                );

                uniqueLogs.sort((a, b) => {
                    try {
                        const dateA = new Date(a.timestamp.includes('/') ? 
                            a.timestamp.replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4') : 
                            a.timestamp);
                        const dateB = new Date(b.timestamp.includes('/') ? 
                            b.timestamp.replace(/(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/, '$3-$2-$1T$4') : 
                            b.timestamp);
                        
                        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                            return 0;
                        }
                        
                        return dateB - dateA;
                    } catch (error) {
                        console.warn('Erro ao ordenar logs:', error);
                        return 0;
                    }
                });

                console.log('Logs carregados e processados:', uniqueLogs.length);
                
                displayLogs(uniqueLogs);
                updateLogStats(uniqueLogs);
                populateLogFilters(uniqueLogs);

            } catch (error) {
                console.error('Erro ao carregar logs:', error);
                tableContent.innerHTML = '<div class="log-empty">Erro ao carregar logs. Verifique a conexão.</div>';
            }
        }

        function parseLogFile(logText) {
            const logs = [];
            const lines = logText.split('\n').filter(line => line.trim());

            lines.forEach(line => {
                try {
                    const parts = line.split(' | ');
                    if (parts.length >= 5) {
                        const timestamp = parts[0];
                        const userPart = parts[1];
                        const userMatch = userPart.match(/^(.+?) \((.+?)\)$/);
                        const user = userMatch ? userMatch[1] : userPart;
                        const userLevel = userMatch ? userMatch[2] : 'unknown';
                        const column = parts[2];
                        const valuePart = parts[3];
                        const rowPart = parts[4];

                        const valueMatch = valuePart.match(/^"(.+?)" → "(.+?)"$/);
                        const oldValue = valueMatch ? valueMatch[1] : '';
                        const newValue = valueMatch ? valueMatch[2] : '';

                        const rowMatch = rowPart.match(/Linha (\d+)/);
                        const rowIndex = rowMatch ? parseInt(rowMatch[1]) : 0;

                        let dateObj;
                        try {
                            if (timestamp.includes('/') && timestamp.includes(',')) {
                                const [datePart, timePart] = timestamp.split(', ');
                                const [day, month, year] = datePart.split('/');
                                const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}`;
                                dateObj = new Date(isoDate);
                            } else {
                                dateObj = new Date(timestamp);
                            }
                            
                            if (isNaN(dateObj.getTime())) {
                                throw new Error('Data inválida');
                            }
                        } catch (dateError) {
                            console.warn('Erro ao processar data:', timestamp, dateError);
                            dateObj = new Date();
                        }

                        logs.push({
                            timestamp,
                            user,
                            userLevel,
                            column,
                            oldValue,
                            newValue,
                            rowIndex,
                            date: dateObj.toISOString().split('T')[0]
                        });
                    }
                } catch (error) {
                    console.warn('Erro ao processar linha do log:', line, error);
                }
            });

            return logs;
        }

        function displayLogs(logs) {
            const tableContent = document.getElementById('logTableContent');

            if (logs.length === 0) {
                tableContent.innerHTML = '<div class="log-empty">Nenhum log de alteração encontrado.</div>';
                return;
            }

            let html = `
                <table class="log-table">
                    <thead>
                        <tr>
                            <th>Data/Hora</th>
                            <th>Usuário</th>
                            <th>Nível</th>
                            <th>Coluna</th>
                            <th>Valor Anterior</th>
                            <th>Novo Valor</th>
                            <th>Linha</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            logs.forEach(log => {
                html += `
                    <tr>
                        <td class="log-date">${log.timestamp}</td>
                        <td class="log-user">${log.user}</td>
                        <td>${log.userLevel}</td>
                        <td><span class="log-column">${log.column}</span></td>
                        <td class="log-value" title="${log.oldValue}">${log.oldValue}</td>
                        <td class="log-value" title="${log.newValue}">${log.newValue}</td>
                        <td>${log.rowIndex}</td>
                    </tr>
                `;
            });

            html += '</tbody></table>';
            tableContent.innerHTML = html;
        }

        function updateLogStats(logs) {
            const total = logs.length;
            const today = new Date().toISOString().split('T')[0];
            const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            const validLogs = logs.filter(log => log.date && log.date !== 'Invalid Date');
            
            const todayChanges = validLogs.filter(log => log.date === today).length;
            const weekChanges = validLogs.filter(log => log.date >= weekAgo).length;
            const uniqueUsers = new Set(logs.map(log => log.user)).size;

            document.getElementById('totalChanges').textContent = total;
            document.getElementById('todayChanges').textContent = todayChanges;
            document.getElementById('weekChanges').textContent = weekChanges;
            document.getElementById('uniqueUsers').textContent = uniqueUsers;
        }

        function populateLogFilters(logs) {
            const userFilter = document.getElementById('logUserFilter');
            const columnFilter = document.getElementById('logColumnFilter');

            userFilter.innerHTML = '<option value="">Todos os usuários</option>';
            columnFilter.innerHTML = '<option value="">Todas as colunas</option>';

            const users = [...new Set(logs.map(log => log.user))].sort();
            const columns = [...new Set(logs.map(log => log.column))].sort();

            users.forEach(user => {
                userFilter.innerHTML += `<option value="${user}">${user}</option>`;
            });

            columns.forEach(column => {
                columnFilter.innerHTML += `<option value="${column}">${column}</option>`;
            });
        }

        function filterLogs() {
            const userFilter = document.getElementById('logUserFilter').value;
            const columnFilter = document.getElementById('logColumnFilter').value;
            const dateFilter = document.getElementById('logDateFilter').value;
            const searchFilter = document.getElementById('logSearchFilter').value.toLowerCase();

            loadLogs().then(() => {
                const rows = document.querySelectorAll('.log-table tbody tr');
                
                rows.forEach(row => {
                    const user = row.cells[1].textContent;
                    const column = row.cells[3].textContent;
                    const date = row.cells[0].textContent.split(' ')[0];
                    const rowText = row.textContent.toLowerCase();

                    const userMatch = !userFilter || user === userFilter;
                    const columnMatch = !columnFilter || column === columnFilter;
                    const dateMatch = !dateFilter || date.includes(dateFilter);
                    const searchMatch = !searchFilter || rowText.includes(searchFilter);

                    if (userMatch && columnMatch && dateMatch && searchMatch) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        }

        function parseCSV(text) {
            const rawLines = text.trim().split('\n');
            if (rawLines.length < 13) return [];
            
            function parseCSVRobust(csvText) {
                const lines = [];
                const rawLines = csvText.split('\n');
                let currentLine = '';
                let inQuotes = false;
                
                for (let i = 0; i < rawLines.length; i++) {
                    const line = rawLines[i];
                    
                    for (let j = 0; j < line.length; j++) {
                        if (line[j] === '"') {
                            if (j === 0 || line[j-1] !== '"') {
                                inQuotes = !inQuotes;
                            }
                        }
                    }
                    
                    if (currentLine) {
                        currentLine += '\n' + line;
                    } else {
                        currentLine = line;
                    }
                    
                    if (!inQuotes) {
                        lines.push(currentLine);
                        currentLine = '';
                    }
                }
                
                if (currentLine) {
                    lines.push(currentLine);
                }
                
                return lines;
            }
            
            function parseCSVLine(line) {
                const result = [];
                let current = '';
                let inQuotes = false;
                let i = 0;
                
                while (i < line.length) {
                    const char = line[i];
                    const nextChar = line[i + 1];
                    
                    if (char === '"') {
                        if (inQuotes) {
                            if (nextChar === '"') {
                                current += '"';
                                i += 2;
                                continue;
                            } else {
                                inQuotes = false;
                            }
                        } else {
                            inQuotes = true;
                        }
                    } else if (char === ',' && !inQuotes) {
                        result.push(current.trim());
                        current = '';
                        i++;
                        continue;
                    } else {
                        current += char;
                    }
                    i++;
                }
                
                result.push(current.trim());
                
                return result.map(field => {
                    field = field.trim();
                    if (field.startsWith('"') && field.endsWith('"')) {
                        field = field.slice(1, -1);
                    }
                    field = field.replace(/\n/g, ' ').replace(/\s+/g, ' ');
                    return field;
                });
            }
            
            const lines = parseCSVRobust(text);
            const processedLines = parseCSVRobust(text);
            
            if (processedLines.length < 13) return [];
            
            const headers = parseCSVLine(processedLines[11]);
            
            const cleanHeaders = headers
                .map(header => header ? header.trim() : '')
                .filter(header => header !== '' && header.length > 0);
            
            if (!cleanHeaders.includes('INDICADOR')) {
                cleanHeaders.push('INDICADOR');
            }
            
            console.log('Headers originais:', headers);
            console.log('Headers limpos:', cleanHeaders);
            
            const data = [];
            
            for (let i = 12; i < processedLines.length; i++) {
                if (processedLines[i].trim()) {
                    try {
                        const values = parseCSVLine(processedLines[i]);
                        if (values.length > 0) {
                            const row = {};
                            cleanHeaders.forEach((header, index) => {
                                let valueIndex = 0;
                                
                                if (header === 'INDICADOR') {
                                    valueIndex = 13;
                                } else {
                                    for (let j = 0; j < headers.length; j++) {
                                        if (headers[j].trim() === header) {
                                            valueIndex = j;
                                            break;
                                        }
                                    }
                                }
                                row[header] = values[valueIndex] || '';
                            });
                            
                            const hasRealData = (
                                (row['CARIMBO'] && row['CARIMBO'].trim()) ||
                                (row['NICK DO FISCALIZADOR'] && row['NICK DO FISCALIZADOR'].trim()) ||
                                (row['NICK DO INFRATOR'] && row['NICK DO INFRATOR'].trim()) ||
                                (row['INFRAÇÃO'] && row['INFRAÇÃO'].trim()) ||
                                (row['STATUS'] && row['STATUS'].trim())
                            );
                            
                            if (hasRealData) {
                                row['_realRowIndex'] = i + 1;
                                if (!row.hasOwnProperty('INDICADOR')) {
                                    row['INDICADOR'] = '';
                                }
                                data.push(row);
                            }
                        }
                    } catch (error) {
                        continue;
                    }
                }
            }
            
            return data;
        }

         function displayTable(data) {
            const tableWrapper = document.getElementById('tableWrapper');
            const tableContainer = document.getElementById('tableContainer');
            const sortedData = [...data].sort((a, b) => {
                const parseDate = (str) => {
                    if (!str) return 0;
                    if (str.includes('/')) {
                        let [datePart, timePart] = str.split(/[ ,]+/);
                        const [day, month, year] = datePart.split('/');
                        if (year && month && day) {
                            let iso = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                            if (timePart) {
                                iso += `T${timePart}`;
                            }
                            return new Date(iso).getTime();
                        }
                    }
                    return new Date(str).getTime();
                };
                return parseDate(b['CARIMBO']) - parseDate(a['CARIMBO']);
            });
            if (sortedData.length === 0) {
                tableContainer.innerHTML = '<div class="empty-state">Nenhum registro encontrado.</div>';
                tableWrapper.style.display = 'block';
                return;
            }

            const allHeaders = Object.keys(sortedData[0]);

            console.log('Todos os headers:', allHeaders);

            const headers = allHeaders.filter(header => {
                if (header === '_realRowIndex') return false;
                if (header === 'INDICADOR') return true;
                if (!header || !header.trim()) return false;
                return sortedData.some(row => {
                    const value = row[header];
                    return value && value.trim() && value.trim() !== '';
                });
            });
            const columnClasses = {
                'ORDEM': 'col-ordem',
                'CARIMBO': 'col-carimbo', 
                'NICK DO FISCALIZADOR': 'col-fiscalizador',
                'NICK DO INFRATOR': 'col-infrator',
                'LINHA': 'col-linha',
                'INFRAÇÃO': 'col-infracao',
                'ANEXOS': 'col-anexos',
                'VEREDITO': 'col-veredito',
                'PRINT MP': 'col-print',
                'TAG': 'col-tag',
                'STATUS': 'col-status',
                'INDICADOR': 'col-indicador'
            };
            let html = '<table><thead><tr>';
            headers.forEach(header => {
                const colClass = columnClasses[header] || '';
                const headerText = header === 'INDICADOR' ? '' : header;
                html += `<th class="${colClass}">${headerText}</th>`;
            });
            html += '</tr></thead><tbody>';
            sortedData.forEach((row, rowIndex) => {
                const realRowIndex = row['_realRowIndex'] || (rowIndex + 13);
                html += '<tr>';
                headers.forEach(header => {
                    if (header === '_realRowIndex') return;
                    
                    let value = row[header] || '';
                    if (typeof value === 'string') {
                        value = value.replace(/^[">\s]+/, '');
                    }
                    const colClass = columnClasses[header] || '';
                    let cellContent = value;
                    let cellClass = '';
                    
                    if (canEditColumn(header)) {
                        cellClass = 'editable-cell';
                    }
                    
                    if (header === 'STATUS') {
                        if (value.trim()) {
                            const statusClass = getStatusClass(value);
                            cellContent = `<span class="status-badge ${statusClass}">${value}</span>`;
                        }
                    }
                    else if (header === 'VEREDITO') {
                        if (value.trim()) {
                            cellContent = `<span class="veredito-cell">${value}</span>`;
                        }
                    }
                    else if (header === 'ANEXOS' || header === 'PRINT MP') {
                        if (value.includes('http')) {
                            cellContent = `<a href="${value}" target="_blank" class="link-cell">🔗</a>`;
                        } else {
                            cellContent = value ? `<span class="link-cell">❌</span>` : '';
                        }
                    }
                    else if (header === 'CARIMBO') {
                        if (value.trim()) {
                            const formattedDate = formatDateToCarimbo(value);
                            cellContent = `<span class="carimbo-cell">${formattedDate}</span>`;
                        }
                    }
                    else if (header === 'ORDEM') {
                        if (value.trim()) {
                            cellContent = `<span class="ordem-cell">${value}</span>`;
                        }
                    }
                    else if (header === 'LINHA') {
                        if (value.trim()) {
                            const displayValue = value.length > 4 ? value.substring(0, 4) : value;
                            const titleAttr = value.length > 4 ? `title="${value}"` : '';
                            cellContent = `<span class="linha-cell" ${titleAttr}>${displayValue}</span>`;
                        }
                    }
                    else if (header === 'TAG') {
                        if (value.trim()) {
                            cellContent = `<span class="tag-cell">${value}</span>`;
                        }
                    }
                    else if (header === 'INDICADOR') {
                        if (value.trim().toUpperCase() === 'S') {
                            cellContent = '';
                            cellClass += ' indicador-s';
                        } else {
                            cellContent = '';
                        }
                    }
                    else if (header === 'NICK DO FISCALIZADOR' || header === 'NICK DO INFRATOR') {
                        if (value.trim()) {
                            cellContent = `<span class="nick-cell">${value}</span>`;
                        }
                    }
                    else if (value.includes('http')) {
                        cellContent = `<a href="${value}" target="_blank" class="link-cell">🔗 Ver</a>`;
                    }
                    
                    const onClickAttr = canEditColumn(header) 
                        ? `onclick="makeEditableFromCell(this, ${realRowIndex}, '${header}')"` 
                        : '';
                    
                    html += `<td class="${colClass} ${cellClass}" ${onClickAttr}>${cellContent}</td>`;
                });
                html += '</tr>';
            });
            
            html += '</tbody></table>';
            tableContainer.innerHTML = html;
            tableWrapper.style.display = 'block';
        }

        function getStatusClass(status) {
            const lower = status.toLowerCase();
            if (lower.includes('aprovado') || lower.includes('aceito')) return 'status-aprovado';
            if (lower.includes('reprovado') || lower.includes('rejeitado') || lower.includes('negado')) return 'status-rejeitado';
            return '';
        }

        function showStatus(message, type) {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = message;
            statusDiv.className = `status-message ${type}`;
            statusDiv.style.display = 'block';
        }

        function hideStatus() {
            document.getElementById('status').style.display = 'none';
        }

        function updateStats() {
            const total = allData.length;
            let pending = 0, approved = 0, rejected = 0;
            
            allData.forEach(row => {
                const status = (row['STATUS'] || '').toLowerCase();
                if (status.includes('aprovado') || status.includes('aceito') || status.includes('(dias)')) {
                    approved++;
                } else if (status.includes('reprovado') || status.includes('rejeitado') || status.includes('negado')) {
                    rejected++;
                } else {
                    pending++;
                }
            });
            
            document.getElementById('totalCases').textContent = total;
            document.getElementById('pendingCases').textContent = pending;
            document.getElementById('approvedCases').textContent = approved;
            document.getElementById('rejectedCases').textContent = rejected;
            document.getElementById('stats').style.display = 'grid';
        }

        function populateFilters() {
        }

        function isWithinLastWeek(dateString) {
            if (!dateString || !dateString.trim()) return false;
            
            try {
                let dateObj;
                
                if (dateString.includes('/')) {
                    const [datePart, timePart] = dateString.split(' ');
                    const [day, month, year] = datePart.split('/');
                    const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    if (timePart) {
                        dateObj = new Date(`${dateStr}T${timePart}`);
                    } else {
                        dateObj = new Date(dateStr);
                    }
                }
                else {
                    dateObj = new Date(dateString);
                }
                
                if (isNaN(dateObj.getTime())) return false;
                
                const now = new Date();
                const diffTime = now.getTime() - dateObj.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                return diffDays <= 7 && diffDays >= 0;
            } catch (error) {
                return false;
            }
        }

        function isWithinLastDays(dateString, days) {
            if (!dateString || !dateString.trim()) return false;
            
            try {
                let dateObj;
                
                if (dateString.includes('/')) {
                    const [datePart, timePart] = dateString.split(' ');
                    const [day, month, year] = datePart.split('/');
                    const dateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    if (timePart) {
                        dateObj = new Date(`${dateStr}T${timePart}`);
                    } else {
                        dateObj = new Date(dateStr);
                    }
                }
                else {
                    dateObj = new Date(dateString);
                }
                
                if (isNaN(dateObj.getTime())) return false;
                
                const now = new Date();
                const diffTime = now.getTime() - dateObj.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                return diffDays <= days && diffDays >= 0;
            } catch (error) {
                return false;
            }
        }

        function filterData() {
            const nickFilter = document.getElementById('nickFilter').value.toLowerCase().trim();
            const statusFilter = document.getElementById('statusFilter').value.toLowerCase();
            const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
            const weekFilter = document.getElementById('weekFilter').checked;
            const fifteenDayFilter = document.getElementById('fifteenDayFilter').checked;
            const thirtyDayFilter = document.getElementById('thirtyDayFilter').checked;
            
            let filteredData = allData.filter(row => {
                const nickFiscalizador = (row['NICK DO FISCALIZADOR'] || '').toLowerCase();
                const nickInfrator = (row['NICK DO INFRATOR'] || '').toLowerCase();
                const nickMatch = !nickFilter || 
                                 nickFiscalizador.includes(nickFilter) || 
                                 nickInfrator.includes(nickFilter);
                
                const status = (row['STATUS'] || '').toLowerCase();
                let statusMatch = true;
                
                if (statusFilter === 'aprovado') {
                    statusMatch = status.includes('aprovado') || status.includes('aceito') || status.includes('(dias)');
                } else if (statusFilter === 'rejeitado') {
                    statusMatch = status.includes('reprovado') || status.includes('rejeitado') || status.includes('negado');
                } else if (statusFilter) {
                    statusMatch = status.includes(statusFilter);
                }
                
                let periodMatch = true;
                if (weekFilter) {
                    periodMatch = isWithinLastWeek(row['CARIMBO']);
                } else if (fifteenDayFilter) {
                    periodMatch = isWithinLastDays(row['CARIMBO'], 15);
                } else if (thirtyDayFilter) {
                    periodMatch = isWithinLastDays(row['CARIMBO'], 30);
                }
                
                const searchMatch = !searchInput || Object.values(row).some(value => 
                    (value || '').toString().toLowerCase().includes(searchInput)
                );
                
                return nickMatch && statusMatch && periodMatch && searchMatch;
            });
            
            displayTable(filteredData);
            updateStatsForFiltered(filteredData);
        }

        function updateStatsForFiltered(data) {
            const total = data.length;
            let pending = 0, approved = 0, rejected = 0;
            
            data.forEach(row => {
                const status = (row['STATUS'] || '').toLowerCase();
                if (status.includes('aprovado') || status.includes('aceito') || status.includes('(dias)')) {
                    approved++;
                } else if (status.includes('reprovado') || status.includes('rejeitado') || status.includes('negado')) {
                    rejected++;
                } else {
                    pending++;
                }
            });
            
            document.getElementById('totalCases').textContent = total;
            document.getElementById('pendingCases').textContent = pending;
            document.getElementById('approvedCases').textContent = approved;
            document.getElementById('rejectedCases').textContent = rejected;
            document.getElementById('stats').style.display = 'grid';
        }

        function handlePeriodFilter(activeFilterId) {
            const filters = ['weekFilter', 'fifteenDayFilter', 'thirtyDayFilter'];
            
            filters.forEach(filterId => {
                if (filterId !== activeFilterId) {
                    document.getElementById(filterId).checked = false;
                }
            });
        }

        function showLoading(show) {
            document.getElementById('loading').style.display = show ? 'block' : 'none';
            document.getElementById('tableWrapper').style.display = show ? 'none' : 'block';
        }

        window.addEventListener('load', () => {
            checkAPIConfiguration();
            loadAuthorizedUsers();
            
            initializeFilters();
        });

        function initializeFilters() {
            document.getElementById('weekFilter').checked = false;
            document.getElementById('fifteenDayFilter').checked = false;
            document.getElementById('thirtyDayFilter').checked = true;
        }

        window.addEventListener('click', (event) => {
            const logModal = document.getElementById('logModal');
            if (event.target === logModal) {
                closeLogModal();
            }
        });
