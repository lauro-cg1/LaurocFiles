console.log("V1.0");
const SPREADSHEET_ID = '1agmJvBO2BrV3Q7DKbjX1GxdRZLP-61gbCm5JQG2bFgA';
const WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbyq0knGSAfPOst_Xs42MPxt3Z7VvvwUa68pcJ0zVaWEzDLmbKbUYlTW14IqLej-eBE1fQ/exec';

const PRIZES = [
    { name: 'Barra de Ouro', color: '#ffd700' },
    { name: 'Promoção Interna', color: '#9c27b0' },
    { name: '7 dias como Ministro', color: '#8b0000' },
    { name: 'Sacola de Moedas', color: '#ff9800' },
    { name: 'Isenção de Meta', color: '#024e03' },
    { name: '1 HC 30 dias', color: '#2196f3' },
    { name: 'Pelúcia de Natal dos SUP', color: '#e91e63' },
    { name: 'Traje Papai/Mamãe Noel', color: '#c41e3a' }
];

let currentUser = null;
let isSpinning = false;
let userCheckinData = {
    totalPoints: 0,
    lastCheckin: null,
    checkinDates: []
};

let idleAnimationInterval = null;
let idleCurrentCard = 0;

let asteriskClickCount = 0;
let asteriskClickTimeout = null;

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
    }
}

function initApp() {
    createSnowflakes();
    createWheel();
    getUsername();
    setupAsteriskListener();
}

setTimeout(() => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}, 100);

window.addEventListener('resize', () => {
    createWheel();
});

function setupAsteriskListener() {
    document.addEventListener('keypress', (e) => {
        if (e.key === '*') {
            asteriskClickCount++;
            
            if (asteriskClickTimeout) {
                clearTimeout(asteriskClickTimeout);
            }
            
            if (asteriskClickCount >= 5) {
                asteriskClickCount = 0;
                showManualUsernameModal();
            } else {
                asteriskClickTimeout = setTimeout(() => {
                    asteriskClickCount = 0;
                }, 2000);
            }
        }
    });
}

function showManualUsernameModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '10000';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `
        <h2 class="modal-title">🎄 Inserir Username Manualmente 🎄</h2>
        <p>Digite seu username:</p>
        <input type="text" id="manual-username-input" class="nickname-input" placeholder="Seu username">
        <br>
        <button class="nickname-submit" id="confirm-manual-username">Confirmar</button>
        <button class="modal-close" id="cancel-manual-username" style="margin-left: 10px;">Cancelar</button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        const input = document.getElementById('manual-username-input');
        if (input) {
            input.focus();
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    submitManualUsernameImpl();
                }
            });
        }
        
        const confirmBtn = document.getElementById('confirm-manual-username');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', submitManualUsernameImpl);
        }
        
        const cancelBtn = document.getElementById('cancel-manual-username');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => overlay.remove());
        }
    }, 100);
}

function submitManualUsernameImpl() {
    const input = document.getElementById('manual-username-input');
    if (input && input.value.trim()) {
        currentUser = input.value.trim();
        onUserIdentified();
        
        const overlay = input.closest('.modal-overlay');
        if (overlay) overlay.remove();
    } else {
        alert('Por favor, insira um username válido.');
    }
}

window.submitManualUsernameImpl = submitManualUsernameImpl;

function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    if (!container) return;
    
    const snowflakeChars = ['❄', '❅', '❆', '✧', '✦'];
    
    for (let i = 0; i < 50; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 5) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        snowflake.style.fontSize = (Math.random() * 1 + 0.5) + 'em';
        container.appendChild(snowflake);
    }
}

function createWheel() {
    const container = document.getElementById('pentagon-wheel');
    const linesContainer = document.getElementById('connector-lines');
    if (!container || !linesContainer) return;
    
    const numPrizes = PRIZES.length;
    
    container.querySelectorAll('.prize-card').forEach(el => el.remove());
    linesContainer.innerHTML = '';

    const prizeIcons = {
        'Barra de Ouro': '<img src="https://i.imgur.com/MCEU1OV.png" alt="Barra de Ouro">',
        'Promoção Interna': '⭐',
        '7 dias como Ministro': '👑',
        'Sacola de Moedas': '<img src="https://i.imgur.com/t0JNT6k.png" alt="Sacola de Moedas">',
        'Isenção de Meta': '✅',
        '1 HC 30 dias': '<img src="https://i.imgur.com/UBpVgaO.png" alt="1 HC 30 dias">',
        'Pelúcia de Natal dos SUP': '<img src="https://i.imgur.com/WDivvEP.png" alt="Pelúcia de Natal dos SUP">',
        'Traje Papai/Mamãe Noel': '🎅'
    };

    const isMobile = window.innerWidth <= 480;
    const isTablet = window.innerWidth <= 768 && window.innerWidth > 480;
    
    let radius, centerX, centerY, linesCenterX, linesCenterY;
    
    if (isMobile) {
        radius = 115;
        centerX = 115;
        centerY = 122;
        linesCenterX = 150;
        linesCenterY = 150;
    } else if (isTablet) {
        radius = 135;
        centerX = 132;
        centerY = 142;
        linesCenterX = 175;
        linesCenterY = 175;
    } else {
        radius = 200;
        centerX = 220;
        centerY = 235;
        linesCenterX = 285;
        linesCenterY = 285;
    }
    
    const positions = [];
    
    for (let i = 0; i < 8; i++) {
        const angle = (i * 45 - 90) * (Math.PI / 180);
        positions.push({
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        });
    }

    PRIZES.forEach((prize, index) => {
        const card = document.createElement('div');
        card.className = 'prize-card';
        card.id = `prize-card-${index}`;
        card.style.left = `${positions[index].x}px`;
        card.style.top = `${positions[index].y}px`;

        const icon = document.createElement('span');
        icon.className = 'prize-card-icon';
        icon.innerHTML = prizeIcons[prize.name] || '🎁';

        const name = document.createElement('span');
        name.className = 'prize-card-name';
        name.textContent = prize.name;

        card.appendChild(icon);
        card.appendChild(name);
        container.appendChild(card);

        const line = document.createElement('div');
        line.className = 'connector-line';
        const cardCenterX = positions[index].x + 65;
        const cardCenterY = positions[index].y + 50;
        const dx = cardCenterX - linesCenterX;
        const dy = cardCenterY - linesCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy) - 60;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        line.style.width = `${distance}px`;
        line.style.transform = `rotate(${angle}deg)`;
        linesContainer.appendChild(line);
    });

    startIdleAnimation();
}

function startIdleAnimation() {
    if (idleAnimationInterval) return;
    
    function illuminateIdle() {
        if (isSpinning) return;
        
        document.querySelectorAll('.prize-card').forEach(card => {
            card.classList.remove('idle-highlight');
        });
        
        const card = document.getElementById(`prize-card-${idleCurrentCard}`);
        if (card) {
            card.classList.add('idle-highlight');
        }
        
        idleCurrentCard = (idleCurrentCard + 1) % PRIZES.length;
    }
    
    illuminateIdle();
    idleAnimationInterval = setInterval(illuminateIdle, 1500);
}

function stopIdleAnimation() {
    if (idleAnimationInterval) {
        clearInterval(idleAnimationInterval);
        idleAnimationInterval = null;
    }
    document.querySelectorAll('.prize-card').forEach(card => {
        card.classList.remove('idle-highlight');
    });
}

async function getUsername() {
    try {
        const response = await fetchWithRetry('https://www.policiarcc.com/forum', {
            mode: 'cors'
        });
        const html = await response.text();
        const match = html.match(/_userdata\["username"\]\s*=\s*"([^"]+)"/);
        
        if (match && match[1] && match[1] !== 'Anonymous') {
            currentUser = match[1];
            onUserIdentified();
        } else {
            showErrorModal('Não foi possível te identificar, verifique se está logado no fórum e tente novamente!');
        }
    } catch (error) {
        console.error('Error getting username:', error);
        showErrorModal('Não foi possível te identificar, verifique se está logado no fórum e tente novamente!');
    }
}

function showErrorModal(message) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay show';
    overlay.style.zIndex = '10000';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.innerHTML = `
        <h2 class="modal-title">⚠️ Atenção</h2>
        <div class="modal-prize">${message}</div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">Entendi</button>
    `;
    
    overlay.appendChild(content);
    document.body.appendChild(overlay);
}

function onUserIdentified() {
    const usernameDisplay = document.getElementById('username-display');
    if (usernameDisplay) {
        usernameDisplay.textContent = currentUser;
    }
    loadCheckinData();
    checkRouletteStatus();
}

async function loadCheckinData() {
    const btn = document.getElementById('checkin-btn');
    const msg = document.getElementById('checkin-message');
    if (!btn || !msg) return;
    
    btn.disabled = true;
    btn.textContent = '⏳ Carregando...';
    msg.textContent = 'Verificando status do check-in...';
    
    updateStreakDisplay();
    
    try {
        const response = await fetchWithRetry(`${WEBAPP_URL}?action=getCheckinData&user=${encodeURIComponent(currentUser)}`);
        const data = await response.json();
        
        if (data.success) {
            userCheckinData = data.data;
            updateStreakDisplay();
            updateCheckinButton();
        } else {
            btn.disabled = false;
            btn.textContent = '✨ Fazer Check-In ✨';
            msg.textContent = '';
        }
    } catch (error) {
        btn.disabled = false;
        btn.textContent = '✨ Fazer Check-In ✨';
        msg.textContent = '⚠️ Não foi possível verificar o status. Tente fazer check-in.';
    }
}

function updateStreakDisplay() {
    const container = document.getElementById('streak-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const checkinDates = userCheckinData.checkinDates || [];
    
    for (let i = 8; i <= 31; i++) {
        const day = document.createElement('div');
        day.className = 'streak-day';
        
        const dayNumber = document.createElement('div');
        dayNumber.className = 'streak-day-number';
        dayNumber.textContent = i;
        
        const dayIcon = document.createElement('div');
        dayIcon.className = 'streak-day-icon';
        
        const isDecember2025 = currentMonth === 11 && currentYear === 2025;
        
        if (checkinDates.includes(i)) {
            day.classList.add('completed');
            dayIcon.textContent = '✓';
        } else if (isDecember2025 && i < currentDay) {
            day.classList.add('missed');
            dayIcon.textContent = '✗';
        } else if (isDecember2025 && i === currentDay) {
            day.classList.add('today');
            dayIcon.textContent = '●';
        } else {
            dayIcon.textContent = '';
        }
        
        day.appendChild(dayNumber);
        day.appendChild(dayIcon);
        container.appendChild(day);
    }
    
    const totalPointsEl = document.getElementById('total-points');
    if (totalPointsEl) {
        totalPointsEl.textContent = userCheckinData.totalPoints;
    }
}

function calculateConsecutiveDays(checkinDates, currentDay) {
    let consecutive = 0;
    let checkDay = currentDay;
    
    while (checkinDates.includes(checkDay)) {
        consecutive++;
        checkDay--;
        if (checkDay < 1) break;
    }
    
    return consecutive;
}

function updateCheckinButton() {
    const btn = document.getElementById('checkin-btn');
    const msg = document.getElementById('checkin-message');
    if (!btn || !msg) return;
    
    if (userCheckinData.lastCheckin) {
        const lastDate = new Date(userCheckinData.lastCheckin);
        const today = new Date();
        
        if (lastDate.toDateString() === today.toDateString()) {
            btn.disabled = true;
            btn.textContent = '✅ Check-In Realizado';
            msg.textContent = '⏰ Aguarde o próximo dia para fazer check-in novamente!';
        } else {
            btn.disabled = false;
            btn.textContent = '✨ Fazer Check-In ✨';
            msg.textContent = '';
        }
    } else {
        btn.disabled = false;
        btn.textContent = '✨ Fazer Check-In ✨';
        msg.textContent = '';
    }
}

async function doCheckin() {
    const btn = document.getElementById('checkin-btn');
    const msg = document.getElementById('checkin-message');
    if (!btn || !msg) return;
    
    btn.disabled = true;
    btn.textContent = '⏳ Processando...';
    
    try {
        const response = await fetchWithRetry(WEBAPP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'checkin',
                user: currentUser,
                timestamp: new Date().toISOString()
            })
        });
        
        const result = await response.json();
        console.log('Checkin result:', result);
        
        if (result.success) {
            const today = new Date();
            const currentDay = today.getDate();
            
            if (!userCheckinData.checkinDates.includes(currentDay)) {
                userCheckinData.checkinDates.push(currentDay);
                userCheckinData.checkinDates.sort((a, b) => a - b);
            }
            
            const pointsToday = 5;
            userCheckinData.totalPoints += pointsToday;
            userCheckinData.lastCheckin = today.toISOString();
            
            updateStreakDisplay();
            btn.textContent = '✅ Check-In Realizado';
            msg.textContent = `🎉 Você ganhou ${pointsToday} pontos! Aguarde o próximo dia.`;
        } else {
            btn.disabled = false;
            btn.textContent = '✨ Fazer Check-In ✨';
            msg.textContent = '❌ ' + (result.error || 'Erro ao fazer check-in. Tente novamente.');
        }
        
    } catch (error) {
        btn.disabled = false;
        btn.textContent = '✨ Fazer Check-In ✨';
        msg.textContent = '❌ Erro ao fazer check-in. Tente novamente.';
    }
}

window.doCheckinImpl = doCheckin;

async function checkRouletteStatus() {
    const statusDiv = document.getElementById('roulette-status');
    const spinBtn = document.getElementById('spin-btn');
    if (!statusDiv || !spinBtn) return;
    
    try {
        const response = await fetchWithRetry(`${WEBAPP_URL}?action=getRouletteStatus`);
        const data = await response.json();
        
        console.log('Roulette status data:', data);
        console.log('Current user:', currentUser);
        
        const members = data.members || [];
        console.log('Members list:', members);
        
        const userInList = members.some(member => 
            member.toLowerCase().trim() === currentUser.toLowerCase().trim()
        );
        
        console.log('User in list:', userInList);
        
        if (data.status === 'Aberta' && userInList) {
            statusDiv.className = 'roulette-status open';
            statusDiv.innerHTML = '🎉 A roleta está ABERTA para você! Boa sorte!';
            spinBtn.disabled = false;
        } else if (data.status === 'Fechada') {
            statusDiv.className = 'roulette-status closed';
            statusDiv.innerHTML = '🔒 A roleta está FECHADA no momento.';
            spinBtn.disabled = true;
        } else {
            statusDiv.className = 'roulette-status closed';
            statusDiv.innerHTML = `🔒 A roleta não está disponível para você. (Status: ${data.status}, User: ${currentUser})`;
            spinBtn.disabled = true;
        }
    } catch (error) {
        console.error('Error checking roulette status:', error);
        statusDiv.className = 'roulette-status closed';
        statusDiv.innerHTML = '⚠️ Não foi possível verificar o status da roleta.';
        spinBtn.disabled = true;
    }
}

async function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    stopIdleAnimation();
    const spinBtn = document.getElementById('spin-btn');
    const statusDiv = document.getElementById('roulette-status');
    if (!spinBtn || !statusDiv) return;
    
    spinBtn.disabled = true;
    spinBtn.textContent = '⏳ Sorteando...';
    
    statusDiv.className = 'roulette-status closed';
    statusDiv.innerHTML = '🎲 Sorteando seu prêmio...';
    
    try {
        const response = await fetchWithRetry(WEBAPP_URL + '?action=startSpin&user=' + encodeURIComponent(currentUser));
        
        const data = await response.json();
        
        if (!data.success) {
            statusDiv.innerHTML = '❌ ' + (data.error || 'A roleta não está disponível para você.');
            spinBtn.textContent = '🎲 Girar Roleta 🎲';
            isSpinning = false;
            return;
        }
        
        const prizeIndex = data.prizeIndex;
        const prizeName = data.prize;
        
        spinBtn.textContent = '🎲 Girando... 🎲';
        
        const numPrizes = PRIZES.length;
        
        document.querySelectorAll('.prize-card').forEach(card => {
            card.classList.remove('active', 'winner');
        });
        
        const extraRounds = 3;
        const totalCards = (extraRounds * numPrizes) + prizeIndex;
        
        let currentCard = 0;
        
        function illuminate() {
            document.querySelectorAll('.prize-card.active').forEach(card => {
                card.classList.remove('active');
            });
            
            const cardIndex = currentCard % numPrizes;
            const card = document.getElementById(`prize-card-${cardIndex}`);
            if (card) {
                card.classList.add('active');
            }
            
            currentCard++;
            
            if (currentCard <= totalCards) {
                const progress = currentCard / totalCards;
                const baseDelay = 50;
                const maxDelay = 500;
                const delay = baseDelay + (maxDelay - baseDelay) * Math.pow(progress, 2.5);
                
                setTimeout(illuminate, delay);
            } else {
                const winnerCard = document.getElementById(`prize-card-${prizeIndex}`);
                if (winnerCard) {
                    winnerCard.classList.remove('active');
                    winnerCard.classList.add('winner');
                }
                
                setTimeout(() => {
                    showPrizeModal(prizeName);
                    isSpinning = false;
                }, 1000);
            }
        }
        
        illuminate();
        
    } catch (error) {
        statusDiv.innerHTML = '⚠️ Erro ao sortear. Tente novamente.';
        spinBtn.textContent = '🎲 Girar Roleta 🎲';
        spinBtn.disabled = false;
        isSpinning = false;
    }
}

window.spinWheelImpl = spinWheel;

function showPrizeModal(prize) {
    const prizeText = document.getElementById('prize-text');
    const modal = document.getElementById('prize-modal');
    if (prizeText && modal) {
        prizeText.textContent = prize;
        modal.classList.add('show');
    }
}

