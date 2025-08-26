let allData = {
    aulas: [],
    tutorias: [],
    fiscalizacoes: [],
    graduacoes: [],
    correcoes: [],
    falhas: []
        };
        let isLoggedIn = false;
        let userLevel = '';
        let currentUser = '';
        let currentSection = 'aulas';
        
        const WORKER_URL = 'https://central-de-casos-dis.laurocg2.workers.dev';
        
        const API_URL = WORKER_URL;
        
        let fiscalizadorData = [];
        let countdownInterval = null;
        
        const SECTION_CONFIG = {
    aulas: {
        headers: ['LINHA', 'DATA E HORA', 'SUPERVISOR', 'AULA', 'ALUNO(S)', 'LOCAL', 'HORÁRIO INICIAL', 'ALUNO 1', 'ALUNO 2', 'ALUNO 3', 'ALUNO 4', 'CONFIRMAÇÃO', 'COMPROVAÇÃO', 'COMENTÁRIO', 'TUTORIA'],
        headerRow: 3,
        dataStartRow: 4
    },
    tutorias: {
        headers: ['LINHA', 'DATA E HORA', 'TUTOR', 'POSTAGEM', 'SUPERVISOR', 'AULA', 'COMPROVAÇÃO', 'SUPERVISOR(ES)', 'COMPROVAÇÃO (MP)'],
        headerRow: 4,
        dataStartRow: 5
    },
    fiscalizacoes: {
        headers: ['LINHA', 'DATA E HORA', 'FISCALIZADOR', 'PATENTE/CARGO', 'REMOVIDOS', 'COMPROVAÇÃO'],
        headerRow: 4,
        dataStartRow: 5
    },
    graduacoes: {
        headers: ['LINHA', 'DATA E HORA', 'GRADUADOR', 'MEMBRO', 'MODALIDADE', 'RESULTADO', 'COMPROVAÇÃO'],
        headerRow: 4,
        dataStartRow: 5
    },
    correcoes: {
        headers: ['CARIMBO', 'RESPONSÁVEL', 'PLANILHA', 'LINHA', 'ERRO', 'CORREÇÃO', 'SITUAÇÃO'],
        headerRow: 4,
        dataStartRow: 5
    },
    falhas: {
        headers: ['CARIMBO', 'NICK', 'FALHA', 'COMPROVAÇÃO'],
        headerRow: 8,
        dataStartRow: 9
    }
        };

        
        function checkAPIConfiguration() {
            if (WORKER_URL.includes('SEU-USUARIO')) {
                showStatus('⚠️ Configure a URL do Worker em WORKER_URL (substitua SEU-USUARIO)', 'error');
                return false;
            }
            return true;
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
                    const response = await fetch(`${API_URL}?${params.toString()}`, {
                        method: 'GET',
                        mode: 'cors'
                    });
                    
                    if (response.ok) {
                        result = await response.json();
                    } else {
                        throw new Error('Fetch failed');
                    }
                } catch (fetchError) {
                    
                    result = await validateUserWithJSONP(code);
                }
                
                if (result && result.success) {
                    isLoggedIn = true;
                    currentUser = result.user;
                    userLevel = result.level;
                    
                    closeLoginModal();
                    showMainContent();
                    loadData();
                    
                    showStatus('✅ Login realizado com sucesso! Acesso liberado.', 'success');
                } else {
                    showError(result?.error || 'Código incorreto');
                    restoreLoginButton();
                }
                
            } catch (error) {
                showError('Sistema de acesso indisponível. Verifique a conexão.');
                restoreLoginButton();
            }
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
                
                script.src = `${API_URL}?${params.toString()}`;
                document.head.appendChild(script);
            });
        }

        function restoreLoginButton() {
            const loginBtn = document.getElementById('loginBtn');
            loginBtn.disabled = false;
            loginBtn.textContent = 'Entrar';
            loginBtn.style.opacity = '1';
            loginBtn.style.cursor = 'pointer';
        }

        function showError(message) {
            const errorDiv = document.getElementById('loginError');
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }

        function showMainContent() {
            document.getElementById('mainContent').style.display = 'block';
            document.getElementById('accessControls').style.display = 'block';
            
            const userBadge = document.getElementById('userBadge');
            const accessMessage = document.getElementById('accessMessage');
            
            userBadge.textContent = `👤 ${currentUser}`;
            userBadge.className = 'user-badge';
            
            if (userLevel === 'leader') {
                userBadge.classList.add('leader');
                accessMessage.textContent = 'Modo somente leitura - Visualização de relatórios (Líder)';
            } else if (userLevel === 'perito') {
                accessMessage.textContent = 'Modo somente leitura - Visualização de relatórios (Perito)';
            } else if (userLevel === 'fiscalizador') {
                userBadge.classList.add('fiscalizador');
                accessMessage.textContent = 'Modo somente leitura - Visualização de relatórios (Fiscalizador)';
            } else {
                accessMessage.textContent = 'Modo somente leitura - Visualização de relatórios';
            }
        }

        function logout() {
            isLoggedIn = false;
            currentUser = '';
            userLevel = '';
            
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('accessControls').style.display = 'none';
            document.getElementById('loginModal').style.display = 'block';
            
            allData = {
                aulas: [],
                tutorias: [],
                fiscalizacoes: [],
                graduacoes: [],
                correcoes: []
            };
            
            document.getElementById('tableContainer').innerHTML = '';
            
            showStatus('Logout realizado com sucesso. Faça login novamente.', 'success');
        }

        function showSection(section) {
            currentSection = section;
            
            document.querySelectorAll('.section-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            if (section !== 'correcoes') {
                document.getElementById('weekFilter').value = 'all';
            }
            
            displaySectionData(section);
        }

        function displaySectionData(section) {
            const weekFilter = document.getElementById('weekFilter').value;
            const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
            
            const weekFilterContainer = document.getElementById('weekFilter').closest('.input-group');
            if (section === 'correcoes') {
                weekFilterContainer.style.display = 'none';
            } else {
                weekFilterContainer.style.display = 'flex';
            }
            
            let data = allData[section] || [];
            
            if (section !== 'correcoes' && weekFilter !== 'all') {
                data = data.filter(row => {
                    const isCurrentWeek = row._weekType === 'current';
                    return weekFilter === 'current' ? isCurrentWeek : !isCurrentWeek;
                });
            }
            
            if (searchTerm) {
                data = data.filter(row => {
                    return Object.values(row).some(value => {
                        if (typeof value === 'string') {
                            return value.toLowerCase().includes(searchTerm);
                        }
                        return String(value).toLowerCase().includes(searchTerm);
                    });
                });
            }
            
            if (data.length > 0) {
                data.sort((a, b) => {
                    const dateFieldA = a['DATA E HORA'] || a['CARIMBO'] || '';
                    const dateFieldB = b['DATA E HORA'] || b['CARIMBO'] || '';
                    
                    const dateA = parseDate(dateFieldA);
                    const dateB = parseDate(dateFieldB);
                    
                    if (dateA && dateB) {
                        return dateB.getTime() - dateA.getTime();
                    }
                    
                    if (dateA && !dateB) return -1;
                    if (!dateA && dateB) return 1;
                    
                    return 0;
                });
            }
            
            displayTable(data, section);
        }

        function removeDuplicates(data, section) {
            const seen = new Set();
            return data.filter(row => {
                let key = '';
                
                switch(section) {
                    case 'aulas':
                        key = `${row['DATA E HORA']}_${row['SUPERVISOR']}_${row['AULA']}_${row['ALUNO(S)']}_${row['LOCAL']}`;
                        break;
                    case 'tutorias':
                        key = `${row['DATA E HORA']}_${row['TUTOR']}_${row['POSTAGEM']}_${row['SUPERVISOR']}_${row['AULA']}`;
                        break;
                    case 'fiscalizacoes':
                        key = `${row['DATA E HORA']}_${row['FISCALIZADOR']}_${row['PATENTE/CARGO']}_${row['REMOVIDOS']}`;
                        break;
                    case 'graduacoes':
                        key = `${row['DATA E HORA']}_${row['GRADUADOR']}_${row['MEMBRO']}_${row['MODALIDADE']}_${row['RESULTADO']}`;
                        break;
                    default:
                        const fields = Object.values(row).slice(0, 5);
                        key = fields.join('_');
                }
                
                if (seen.has(key)) {
                    return false;
                }
                seen.add(key);
                return true;
            });
        }

        function parseDate(dateString) {
            if (!dateString || !dateString.trim()) return null;
            
            try {
                let dateObj;
                
                if (dateString.includes('/')) {
                    const [datePart, timePart] = dateString.split(' ');
                    const [day, month, year] = datePart.split('/');
                    
                    let fullYear = year;
                    if (year.length === 2) {
                        fullYear = '20' + year;
                    }
                    
                    const dateStr = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    if (timePart) {
                        dateObj = new Date(`${dateStr}T${timePart}`);
                    } else {
                        dateObj = new Date(dateStr);
                    }
                } else {
                    dateObj = new Date(dateString);
                }
                
                return isNaN(dateObj.getTime()) ? null : dateObj;
            } catch (error) {
                return null;
            }
        }

        async function loadData() {
            showLoading(true);
            hideStatus();
            
    try {
        const loadPromises = [];
        loadPromises.push(loadSectionData('aulas_current', 'aulas', 'current'));
        loadPromises.push(loadSectionData('aulas_backup', 'aulas', 'last'));
        loadPromises.push(loadSectionData('tutorias_current', 'tutorias', 'current'));
        loadPromises.push(loadSectionData('tutorias_backup', 'tutorias', 'last'));
        loadPromises.push(loadSectionData('fiscalizacoes_current', 'fiscalizacoes', 'current'));
        loadPromises.push(loadSectionData('fiscalizacoes_backup', 'fiscalizacoes', 'last'));
        loadPromises.push(loadSectionData('graduacoes_current', 'graduacoes', 'current'));
        loadPromises.push(loadSectionData('graduacoes_backup', 'graduacoes', 'last'));
        loadPromises.push(loadSectionData('correcoes', 'correcoes', 'mixed'));
        loadPromises.push(loadSectionData('falhas', 'falhas', 'mixed'));
        
        const results = await Promise.allSettled(loadPromises);
        
        allData = {
            aulas: [],
            tutorias: [],
            fiscalizacoes: [],
            graduacoes: [],
            correcoes: [],
            falhas: []
        };
        results.forEach((result) => {
            if (result.status === 'fulfilled' && result.value) {
                const { section, data, weekType } = result.value;
                if (section === 'aulas' || section === 'tutorias' || section === 'fiscalizacoes' || section === 'graduacoes') {
                    allData[section] = [...allData[section], ...data];
                } else {
                    allData[section] = data;
                }
            }
        });
        
        ['aulas', 'tutorias', 'fiscalizacoes', 'graduacoes', 'falhas'].forEach(section => {
            if (allData[section].length > 0) {
                allData[section] = removeDuplicates(allData[section], section);
            }
        });
        
        addLineNumbers();
        
        const totalRecords = Object.values(allData).reduce((sum, arr) => sum + arr.length, 0);
        displaySectionData(currentSection);
        showStatus(`✅ Dados carregados com sucesso! ${totalRecords} registros encontrados.`, 'success');
    } catch (error) {
        showStatus('❌ Erro ao carregar dados. Verifique sua conexão.', 'error');
    }
    showLoading(false);
        }

        function addLineNumbers() {
            const sectionsWithLineNumbers = ['aulas', 'tutorias', 'fiscalizacoes', 'graduacoes'];
            
            sectionsWithLineNumbers.forEach(section => {
                if (allData[section] && allData[section].length > 0) {
                    const validData = allData[section].filter(item => {
                        const importantFields = ['DATA E HORA', 'SUPERVISOR', 'TUTOR', 'FISCALIZADOR', 'GRADUADOR'];
                        return importantFields.some(field => 
                            item[field] && item[field].trim() !== ''
                        );
                    });
                    
                    const sortedData = validData.sort((a, b) => {
                        const dateFieldA = a['DATA E HORA'] || '';
                        const dateFieldB = b['DATA E HORA'] || '';
                        
                        const dateA = parseDate(dateFieldA);
                        const dateB = parseDate(dateFieldB);
                        
                        if (dateA && dateB) {
                            return dateA.getTime() - dateB.getTime();
                        }
                        
                        if (dateA && !dateB) return -1;
                        if (!dateA && dateB) return 1;
                        
                        return 0;
                    });
                    
                    const createItemId = (item) => {
                        const keyFields = ['DATA E HORA', 'SUPERVISOR', 'TUTOR', 'FISCALIZADOR', 'GRADUADOR'];
                        const key = keyFields.map(field => item[field] || '').join('|');
                        return key;
                    };
                    
                    const lineNumberMap = new Map();
                    sortedData.forEach((item, index) => {
                        const itemId = createItemId(item);
                        lineNumberMap.set(itemId, index + 1);
                    });
                    
                    allData[section].forEach(item => {
                        const itemId = createItemId(item);
                        if (lineNumberMap.has(itemId)) {
                            item['LINHA'] = lineNumberMap.get(itemId);
                        } else {
                            delete item['LINHA'];
                        }
                    });
                    
                    allData[section] = allData[section].filter(item => item['LINHA']);
                }
            });
        }

        async function loadSectionData(urlKey, section, weekType) {
            try {
                const params = new URLSearchParams({
                    action: 'getRelatorioCsvData',
                    section: urlKey
                });
                
                const response = await fetch(`${API_URL}?${params.toString()}`, {
                    method: 'GET',
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Erro ao buscar dados');
                }
                
                const data = parseSectionCSV(result.data, section, weekType);
                
                return { section, data, weekType };
            } catch (error) {
                throw error;
            }
        }

        function parseSectionCSV(csvText, section, weekType) {
            const lines = csvText.trim().split('\n');
            
            const config = SECTION_CONFIG[section];
            if (!config) {
                return [];
            }
            
            const data = [];
            const { headers, headerRow, dataStartRow } = config;
            
            const csvHeaders = (section === 'correcoes' || section === 'falhas') ? 
                headers : headers.filter(header => header !== 'LINHA');
            
            for (let i = dataStartRow - 1; i < lines.length; i++) {
                const line = lines[i];
                if (!line || line.trim() === '') continue;
                const csvColumns = parseCSVLine(line);
                let dataColumns;
                if (section === 'falhas') {
                    dataColumns = csvColumns.slice(1, 5);
                } else if (section === 'correcoes') {
                    dataColumns = csvColumns.slice(1);
                } else {
                    dataColumns = csvColumns.slice(1);
                }
                const rowData = {};
                csvHeaders.forEach((header, index) => {
                    let value = dataColumns[index] || '';
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    rowData[header] = value.trim();
                });
                let dataWeekType = 'current';
                if (weekType === 'last') {
                    dataWeekType = 'last';
                } else if (weekType === 'current') {
                    dataWeekType = 'current';
                } else if (weekType === 'mixed') {
                    const dataField = rowData['DATA E HORA'] || rowData['CARIMBO'] || '';
                    if (section === 'correcoes') {
                        if (!isDataWithinLast15Days(dataField)) {
                            continue;
                        }
                        dataWeekType = 'current';
                    } else {
                        dataWeekType = isDataFromLastWeek(dataField) ? 'last' : 'current';
                    }
                }
                rowData._weekType = dataWeekType;
                let hasData;
                if (section === 'falhas') {
                    hasData = rowData['CARIMBO'] && rowData['CARIMBO'].trim() !== '';
                } else {
                    const importantFields = ['DATA E HORA', 'CARIMBO', 'SUPERVISOR', 'TUTOR', 'FISCALIZADOR', 'GRADUADOR', 'RESPONSÁVEL'];
                    hasData = importantFields.some(field => 
                        rowData[field] && rowData[field].trim() !== ''
                    );
                    
                    if (!hasData) {
                        hasData = Object.values(rowData).some(value => 
                            value && 
                            typeof value === 'string' && 
                            value.trim() !== '' && 
                            !value.startsWith('_') &&
                            value.trim() !== ',' &&
                            value.trim().length > 0
                        );
                    }
                }
                if (hasData) {
                    data.push(rowData);
                }
            }
            
            return data;
        }

        function parseCSVLine(line) {
            const result = [];
            let current = '';
            let inQuotes = false;
            
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                
                if (char === '"') {
                    if (inQuotes && line[i + 1] === '"') {
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

        function isDataFromLastWeek(dateString) {
            if (!dateString || !dateString.trim()) return false;
            
            try {
                let dateObj;
                
                if (dateString.includes('/')) {
                    const [datePart, timePart] = dateString.split(' ');
                    const [day, month, year] = datePart.split('/');
                    let fullYear = year;
                    if (year.length === 2) {
                        fullYear = '20' + year;
                    }
                    const dateStr = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    if (timePart) {
                        dateObj = new Date(`${dateStr}T${timePart}`);
                    } else {
                        dateObj = new Date(dateStr);
                    }
                } else {
                    dateObj = new Date(dateString);
                }
                
                if (isNaN(dateObj.getTime())) return false;
                
                const now = new Date();
                const oneWeekAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
                
                return dateObj < oneWeekAgo;
            } catch (error) {
                return false;
            }
        }

        function isDataWithinLast15Days(dateString) {
            if (!dateString || !dateString.trim()) return false;
            
            try {
                let dateObj;
                
                if (dateString.includes('/')) {
                    const [datePart, timePart] = dateString.split(' ');
                    const [day, month, year] = datePart.split('/');
                    let fullYear = year;
                    if (year.length === 2) {
                        fullYear = '20' + year;
                    }
                    const dateStr = `${fullYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    if (timePart) {
                        dateObj = new Date(`${dateStr}T${timePart}`);
                    } else {
                        dateObj = new Date(dateStr);
                    }
                } else {
                    dateObj = new Date(dateString);
                }
                
                if (isNaN(dateObj.getTime())) return false;
                
                const now = new Date();
                const fifteenDaysAgo = new Date(now.getTime() - (15 * 24 * 60 * 60 * 1000));
                
                return dateObj >= fifteenDaysAgo;
            } catch (error) {
                return false;
            }
        }

        function displayTable(data, section) {
            const tableWrapper = document.getElementById('tableWrapper');
            const tableContainer = document.getElementById('tableContainer');
            
            if (data.length === 0) {
                tableContainer.innerHTML = '<div class="empty-state">Nenhum dado encontrado para esta seção.</div>';
                tableWrapper.style.display = 'block';
                return;
            }

            const config = SECTION_CONFIG[section];
            const headers = config.headers;
            
            let html = `<table data-section="${section}"><thead><tr>`;
            headers.forEach(header => {
                html += `<th>${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            
            data.forEach((row, rowIndex) => {
                html += '<tr>';
                headers.forEach((header, colIndex) => {
                    const value = row[header] || '';
                    const cellContent = formatCellContent(value, header, section);
                    html += `<td>${cellContent}</td>`;
                });
                html += '</tr>';
            });
            
            html += '</tbody></table>';
            tableContainer.innerHTML = html;
            tableWrapper.style.display = 'block';
        }

        function formatCellContent(value, header, section) {
            if (!value && value !== 0) return '';
            
            const stringValue = String(value).trim();
            
            if (stringValue === '') return '';
            
            if (header === 'LINHA') {
                return `<strong>${stringValue}</strong>`;
            }
            
            if (stringValue.includes('http') || stringValue.includes('www.')) {
                if (header.toLowerCase().includes('comprovação') || header.toLowerCase().includes('print')) {
                    return '<a href="' + stringValue + '" target="_blank" class="link-cell">🔗</a>';
                }
            }
            
            if (section === 'correcoes' && header === 'SITUAÇÃO') {
                const statusClass = stringValue.toLowerCase().includes('corrigido') ? 'status-corrigido' : 'status-cancelado';
                return `<span class="status-badge ${statusClass}">${stringValue}</span>`;
            }
            
            if (header.toLowerCase().includes('comprovação') && !stringValue.includes('http') && !stringValue.includes('www.')) {
                if (stringValue.length > 25) {
                    const displayValue = stringValue.substring(0, 25) + '...';
                    return `<span class="tooltip-cell" title="${stringValue}">${displayValue}</span>`;
                }
                return stringValue;
            }
            
            if (shouldUseTooltip(header, section)) {
                const displayValue = stringValue.length > 10 ? stringValue.substring(0, 10) + '...' : stringValue;
                return `<span class="tooltip-cell" title="${stringValue}">${displayValue}</span>`;
            }
            
            return stringValue;
        }

        function shouldUseTooltip(header, section) {
            const tooltipFields = {
                'aulas': ['COMENTÁRIO'],
                'tutorias': [],
                'fiscalizacoes': [],
                'graduacoes': [],
                'correcoes': ['LINHA', 'ERRO', 'CORREÇÃO']
            };
            
            return tooltipFields[section] && tooltipFields[section].includes(header);
        }

        function filterData() {
            displaySectionData(currentSection);
        }

        function showStatus(message, type) {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = message;
            statusDiv.className = `status-message ${type}`;
            statusDiv.style.display = 'block';
            statusDiv.style.marginBottom = '20px';
            
            setTimeout(() => {
                hideStatus();
            }, 5000);
        }

        function hideStatus() {
            const statusDiv = document.getElementById('status');
            statusDiv.style.display = 'none';
            statusDiv.style.marginBottom = '0';
        }

        function showLoading(show) {
            document.getElementById('loading').style.display = show ? 'block' : 'none';
            document.getElementById('tableWrapper').style.display = show ? 'none' : 'block';
        }

        window.addEventListener('load', () => {
            checkAPIConfiguration();
            document.getElementById('codeInput').focus();
            setupDateInputMask();
        });

        document.getElementById('codeInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                validateAccess();
            }
        });

        function openFiscalizadorModal() {
            document.getElementById('fiscalizadorModal').style.display = 'block';
        }

        function closeFiscalizadorModal() {
            document.getElementById('fiscalizadorModal').style.display = 'none';
        }

        function openFiscalizador() {
            closeFiscalizadorModal();
            document.getElementById('mainContent').style.display = 'none';
            document.getElementById('fiscalizadorSection').style.display = 'block';
            loadFiscalizadorData();
        }

        function closeFiscalizador() {
            document.getElementById('fiscalizadorSection').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        }

        function setupDateInputMask() {
            const dateInput = document.getElementById('dateInput');
            if (dateInput) {
                dateInput.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    if (value.length >= 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2);
                    }
                    if (value.length >= 5) {
                        value = value.substring(0, 5) + '/' + value.substring(5, 9);
                    }
                    e.target.value = value;
                });
            }
        }

        async function loadFiscalizadorData() {
            showFiscalizadorLoading(true);
            try {
                const params = new URLSearchParams({
                    action: 'getRelatorioCsvData',
                    section: 'fiscalizador'
                });
                
                const response = await fetch(`${API_URL}?${params.toString()}`, {
                    method: 'GET',
                    mode: 'cors'
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.error || 'Erro ao buscar dados do fiscalizador');
                }
                
                fiscalizadorData = parseFiscalizadorCSV(result.data);
                
                displayFiscalizadorTable(fiscalizadorData);
                showFiscalizadorStatus('✅ Dados do fiscalizador carregados com sucesso!', 'success');
                
            } catch (error) {
                showFiscalizadorStatus('❌ Erro ao carregar dados do fiscalizador. Verifique sua conexão.', 'error');
            }
            showFiscalizadorLoading(false);
        }

        function parseFiscalizadorCSV(csvText) {
            const lines = csvText.trim().split('\n');
            const data = [];
            const headers = ['LINHA', 'DATA / HORA', 'SUPERVISOR', 'ALUNO', 'MODALIDADE', 'PRINT DE QUEDA', 'ERROS', 'SYSTEM'];
            
            for (let i = 3; i < lines.length; i++) {
                const line = lines[i];
                if (!line || line.trim() === '') continue;
                
                const csvColumns = parseCSVLine(line);
                
                const dataColumns = csvColumns.slice(5, 13);
                
                const rowData = {};
                headers.forEach((header, index) => {
                    let value = dataColumns[index] || '';
                    
                    if (value.startsWith('"') && value.endsWith('"')) {
                        value = value.slice(1, -1);
                    }
                    
                    rowData[header] = value.trim();
                });
                
                const hasData = rowData['LINHA'] || rowData['DATA / HORA'] || rowData['SUPERVISOR'] || rowData['ALUNO'];
                
                if (hasData) {
                    data.push(rowData);
                }
            }
            
            return data;
        }

        function displayFiscalizadorTable(data) {
            const tableWrapper = document.getElementById('fiscalizadorTableWrapper');
            const tableContainer = document.getElementById('fiscalizadorTableContainer');
            
            if (data.length === 0) {
                tableContainer.innerHTML = '<div class="empty-state">Nenhum dado encontrado no fiscalizador.</div>';
                tableWrapper.style.display = 'block';
                return;
            }

            const headers = ['LINHA', 'DATA / HORA', 'SUPERVISOR', 'ALUNO', 'MODALIDADE', 'PRINT DE QUEDA', 'ERROS', 'SYSTEM'];
            
            let html = '<table><thead><tr>';
            headers.forEach(header => {
                html += `<th>${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            
            data.forEach((row, rowIndex) => {
                html += '<tr>';
                headers.forEach((header, colIndex) => {
                    const value = row[header] || '';
                    let cellContent = value;
                    
                    if (value.includes('http') || value.includes('www.')) {
                        cellContent = `<a href="${value}" target="_blank" class="link-cell">🔗</a>`;
                    } else if (header === 'ERROS' && value.length > 30) {
                        const displayValue = value.substring(0, 30) + '...';
                        cellContent = `<span class="tooltip-cell" title="${value}">${displayValue}</span>`;
                    }
                    
                    html += `<td>${cellContent}</td>`;
                });
                html += '</tr>';
            });
            
            html += '</tbody></table>';
            tableContainer.innerHTML = html;
            tableWrapper.style.display = 'block';
        }

        async function executeFiscalizacao() {
            const dateInput = document.getElementById('dateInput');
            const fiscalizarBtn = document.getElementById('fiscalizarBtn');
            const countdownDiv = document.getElementById('countdown');
            const dateValue = dateInput.value.trim();
            if (!dateValue || !isValidDate(dateValue)) {
                showFiscalizadorStatus('❌ Por favor, insira uma data válida no formato dd/mm/aaaa', 'error');
                return;
            }
            fiscalizarBtn.disabled = true;
            fiscalizarBtn.textContent = 'Fiscalizando...';
            try {
                await updateFiscalizadorDate(dateValue);
                showFiscalizadorStatus('✅ Data alterada com sucesso! Aguardando atualização dos dados...', 'success');
                let timeLeft = 15;
                countdownDiv.textContent = `Atualizando em ${timeLeft} segundos...`;
                countdownInterval = setInterval(async () => {
                    timeLeft--;
                    if (timeLeft > 0) {
                        countdownDiv.textContent = `Atualizando em ${timeLeft} segundos...`;
                    } else {
                        clearInterval(countdownInterval);
                        countdownDiv.textContent = '';
                        await loadFiscalizadorData();
                        let dataAtualizada = false;
                        if (fiscalizadorData && fiscalizadorData.length > 0) {
                            dataAtualizada = fiscalizadorData.some(row => {
                                let dataCol = row['DATA / HORA'] ? row['DATA / HORA'].trim() : '';
                                let dataColDia = dataCol.split(' ')[0];
                                let dateValueDia = dateValue.split(' ')[0];
                                return dataColDia === dateValueDia;
                            });
                        }
                        if (!dataAtualizada) {
                            await loadFiscalizadorData();
                        }
                        fiscalizarBtn.disabled = false;
                        fiscalizarBtn.textContent = 'Fiscalizar';
                    }
                }, 1000);
            } catch (error) {
                showFiscalizadorStatus('❌ Erro ao executar fiscalização. Tente novamente.', 'error');
                fiscalizarBtn.disabled = false;
                fiscalizarBtn.textContent = 'Fiscalizar';
            }
        }

        async function updateFiscalizadorDate(date) {
            const params = new URLSearchParams({
                action: 'updateFiscalizadorDate',
                date: date
            });
            
            try {
                const response = await fetch(`${API_URL}?${params.toString()}`, {
                    method: 'GET',
                    mode: 'cors'
                });
                
                if (response.ok) {
                    const result = await response.json();

                    if (!result.success) {
                        throw new Error(result.error || 'Erro na atualização');
                    }
                } else {
                    throw new Error('Fetch failed');
                }
            } catch (fetchError) {
                return new Promise((resolve, reject) => {
                    const callbackName = 'jsonp_callback_' + Math.random().toString(36).substr(2, 9);
                    const script = document.createElement('script');
                    const timeoutId = setTimeout(() => {
                        cleanup();
                        reject(new Error('Timeout na atualização'));
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
                        if (data.success) {
                            resolve(data);
                        } else {
                            reject(new Error(data.error || 'Erro na atualização'));
                        }
                    };
                    
                    script.onerror = function() {
                        cleanup();
                        reject(new Error('Erro ao carregar script'));
                    };
                    
                    const paramsWithCallback = new URLSearchParams({
                        action: 'updateFiscalizadorDate',
                        date: date,
                        callback: callbackName
                    });
                    
                    script.src = `${API_URL}?${paramsWithCallback.toString()}`;
                    document.head.appendChild(script);
                });
            }
        }

        function isValidDate(dateString) {
            const regex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!regex.test(dateString)) return false;
            
            const [day, month, year] = dateString.split('/').map(Number);
            const date = new Date(year, month - 1, day);
            
            return date.getFullYear() === year && 
                   date.getMonth() === month - 1 && 
                   date.getDate() === day;
        }

        function showFiscalizadorStatus(message, type) {
            const statusDiv = document.getElementById('fiscalizadorStatus');
            statusDiv.innerHTML = message;
            statusDiv.className = `status-message ${type}`;
            statusDiv.style.display = 'block';
            statusDiv.style.marginBottom = '20px';
            
            setTimeout(() => {
                statusDiv.style.display = 'none';
                statusDiv.style.marginBottom = '0';
            }, 5000);
        }

        function showFiscalizadorLoading(show) {
            document.getElementById('fiscalizadorLoading').style.display = show ? 'block' : 'none';
            document.getElementById('fiscalizadorTableWrapper').style.display = show ? 'none' : 'block';
        }

        async function executeRegistro() {
            const registrarBtn = document.getElementById('registrarBtn');
            const registrandoMsg = document.getElementById('registrandoMsg');
            
            if (!registrarBtn) {
                return;
            }
            
            registrarBtn.disabled = true;
            registrarBtn.textContent = 'Registrando...';
            if (registrandoMsg) registrandoMsg.style.display = 'inline-block';
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        action: 'executeRegistro',
                        user: currentUser,
                        userLevel: userLevel
                    })
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                
                const result = await response.json();
                
                if (result.success) {
                    showFiscalizadorStatus('✅ Registro dos casos feito com sucesso!', 'success');
                } else {
                    showFiscalizadorStatus(result.error || '❌ Erro ao registrar casos.', 'error');
                }
            } catch (error) {
                showFiscalizadorStatus('❌ Erro ao registrar casos.', 'error');
            }
            
            registrarBtn.disabled = false;
            registrarBtn.textContent = 'Registrar';
            if (registrandoMsg) registrandoMsg.style.display = 'none';
        }
