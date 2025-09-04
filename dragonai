  const CONFIG = {
            WORKER_URL: 'https://dragonia-sup-worker.laurocg2.workers.dev',
            REQUEST_TIMEOUT: 30000,
            MAX_MESSAGE_HISTORY: 20,
            TYPING_SPEED: 10,
            DEBOUNCE_DELAY: 50
        };
        
        let messageHistory = [];
        let isTyping = false;
        let isAITyping = false;
        let cacheStatus = null;
        
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        const messagesContainer = document.getElementById('messages');
        const loading = document.getElementById('loading');

        function isMobile() {
            return window.innerWidth <= 768 || 'ontouchstart' in window;
        }

        if (isMobile()) {
            messageInput.addEventListener('focus', function() {
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                        document.body.scrollTop = 0;
                    }, 100);
                }
            });
        }

        function adjustTextareaHeight() {
            messageInput.style.height = 'auto';
            const maxHeight = isMobile() ? 80 : 120;
            const newHeight = Math.min(messageInput.scrollHeight, maxHeight);
            messageInput.style.height = newHeight + 'px';
        }

        function debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        const debouncedAdjustHeight = debounce(adjustTextareaHeight, CONFIG.DEBOUNCE_DELAY);

        sendButton.addEventListener('click', sendMessage);
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                if (isMobile() || e.shiftKey) {
                    if (!isMobile() && e.shiftKey) {
                        return;
                    } else if (isMobile()) {
                        return;
                    }
                } else {
                    e.preventDefault();
                    sendMessage();
                }
            }
        });

        messageInput.addEventListener('input', debouncedAdjustHeight);

        async function checkCacheStatus() {
            try {
                const response = await fetch(`${CONFIG.WORKER_URL}/api/cache/status`);
                if (response.ok) {
                    cacheStatus = await response.json();
                    
                    if (!cacheStatus.isValid) {
                        await refreshCache();
                    }
                }
            } catch (error) {
            }
        }

        async function refreshCache() {
            try {
                await fetch(`${CONFIG.WORKER_URL}/api/cache/refresh`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } catch (error) {
            }
        }

        async function sendMessage() {
            const message = messageInput.value.trim();
            if (!message || isTyping || isAITyping) return;

            if (navigator.vibrate && isMobile()) {
                navigator.vibrate(50);
            }

            addMessage('user', message);
            messageInput.value = '';
            adjustTextareaHeight();
            
            isTyping = true;
            isAITyping = true;
            messageInput.disabled = true;
            sendButton.disabled = true;
            
            loading.style.display = 'block';
            
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);
                
                const response = await fetch(`${CONFIG.WORKER_URL}/api/process`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: message,
                        messageHistory: messageHistory
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                const data = await response.json();
                
                if (data.response) {
                    await typeMessage('ai', data.response);
                } else {
                    addMessage('ai', '⚠️ Erro ao processar sua mensagem.');
                }
            } catch (error) {
                console.error('Erro:', error);
                if (error.name === 'AbortError') {
                    addMessage('ai', '⏱️ Timeout na conexão. Tente novamente.');
                } else {
                    addMessage('ai', '⚠️ Erro de conexão. Tente novamente.');
                }
            } finally {
                loading.style.display = 'none';
                isTyping = false;
                isAITyping = false;
                messageInput.disabled = false;
                sendButton.disabled = false;
                messageInput.focus();
            }
        }

        async function typeMessage(sender, text) {
            const welcomeMessage = messagesContainer.querySelector('.welcome-message');
            if (welcomeMessage && sender === 'user') {
                welcomeMessage.remove();
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = '';
            
            messageDiv.appendChild(contentDiv);
            messagesContainer.appendChild(messageDiv);
            
            scrollToBottom();
            
            if (sender === 'ai') {
                text = formatLinks(text);
                text = formatLists(text);
            }
            
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            text = text.replace(/\n/g, '<br>');
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            let currentText = '';
            let i = 0;
            
            while (i < text.length) {
                let char = text[i];
                
                if (char === '<') {
                    let tagEnd = text.indexOf('>', i);
                    if (tagEnd !== -1) {
                        currentText += text.substring(i, tagEnd + 1);
                        i = tagEnd + 1;
                    } else {
                        currentText += char;
                        i++;
                    }
                } else {
                    currentText += char;
                    i++;
                }
                
                contentDiv.innerHTML = currentText + '<span class="typing-cursor">|</span>';
                scrollToBottom();
                
                let delay = CONFIG.TYPING_SPEED;
                if (char === ' ') {
                    delay = CONFIG.TYPING_SPEED * 0.3;
                } else if (char === '.' || char === '!' || char === '?') {
                    delay = CONFIG.TYPING_SPEED * 3;
                } else if (char === ',') {
                    delay = CONFIG.TYPING_SPEED * 1.5;
                }
                
                delay = delay * (0.7 + Math.random() * 0.6);
                
                await new Promise(resolve => setTimeout(resolve, Math.round(delay)));
            }
            
            contentDiv.innerHTML = currentText;
            
            messageHistory.push({ 
                sender, 
                text: text.replace(/<br>/g, '\n').replace(/<strong>(.*?)<\/strong>/g, '**$1**').replace(/<a[^>]*>.*?<\/a>/g, '').replace(/<div[^>]*>.*?<\/div>/g, '') 
            });
            
            if (messageHistory.length > CONFIG.MAX_MESSAGE_HISTORY) {
                messageHistory = messageHistory.slice(-CONFIG.MAX_MESSAGE_HISTORY);
            }
        }

        function formatLinks(text) {
            const urlRegex = /(https?:\/\/[^\s<)]+|www\.[^\s<)]+)/g;
            text = text.replace(urlRegex, function(match) {
                let url = match;
                url = url.replace(/[.,;:!?)]+$/, '');
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = 'http://' + url;
                }
                return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #3C7B23; font-weight: bold; text-decoration: underline; cursor: pointer;">Acesse Aqui</a>`;
            });

            text = text.replace(/\(Acesse Aqui\)/g, '(<a href="#" onclick="alert(\'Link não disponível no momento\')" style="color: #3C7B23; font-weight: bold; text-decoration: underline; cursor: pointer;">Acesse Aqui</a>)');
            
            text = text.replace(/\(\)\./g, '(<a href="#" onclick="alert(\'Link não disponível no momento\')" style="color: #3C7B23; font-weight: bold; text-decoration: underline; cursor: pointer;">Link não disponível</a>).');
            text = text.replace(/\(\):/g, '(<a href="#" onclick="alert(\'Link não disponível no momento\')" style="color: #3C7B23; font-weight: bold; text-decoration: underline; cursor: pointer;">Link não disponível</a>):');
            
            return text;
        }

        function formatLists(text) {
            const lines = text.split('\n');
            let formattedLines = [];
            let inList = false;
            let listItems = [];

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                
                if (line.startsWith('* ')) {
                    if (!inList) {
                        inList = true;
                        listItems = [];
                    }
                    listItems.push(line.substring(2).trim());
                } else {
                    if (inList) {
                        const listHtml = `<div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 252, 248, 0.9) 100%); border: 2px solid rgba(60, 123, 35, 0.3); border-radius: 15px; padding: 15px; margin: 10px 0; box-shadow: 0 2px 8px rgba(60, 123, 35, 0.1);">
${listItems.map(item => `<div style="display: flex; align-items: flex-start; margin-bottom: 8px; padding: 5px 0;">
<span style="color: #3C7B23; font-weight: bold; margin-right: 10px; font-size: 1.1em;">•</span>
<span style="color: #2d4a2d; line-height: 1.4; font-weight: 500;">${item}</span>
</div>`).join('')}
</div>`;
                        formattedLines.push(listHtml);
                        inList = false;
                        listItems = [];
                    }
                    if (line) {
                        formattedLines.push(line);
                    }
                }
            }

            if (inList) {
                const listHtml = `<div style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 252, 248, 0.9) 100%); border: 2px solid rgba(60, 123, 35, 0.3); border-radius: 15px; padding: 15px; margin: 10px 0; box-shadow: 0 2px 8px rgba(60, 123, 35, 0.1);">
${listItems.map(item => `<div style="display: flex; align-items: flex-start; margin-bottom: 8px; padding: 5px 0;">
<span style="color: #3C7B23; font-weight: bold; margin-right: 10px; font-size: 1.1em;">•</span>
<span style="color: #2d4a2d; line-height: 1.4; font-weight: 500;">${item}</span>
</div>`).join('')}
</div>`;
                formattedLines.push(listHtml);
            }

            return formattedLines.join('\n');
        }

        function addMessage(sender, text) {
            const welcomeMessage = messagesContainer.querySelector('.welcome-message');
            if (welcomeMessage && sender === 'user') {
                welcomeMessage.remove();
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (sender === 'ai') {
                text = formatLinks(text);
                text = formatLists(text);
            }
            
            text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            text = text.replace(/\n/g, '<br>');
            
            contentDiv.innerHTML = text;
            messageDiv.appendChild(contentDiv);
            messagesContainer.appendChild(messageDiv);
            
            scrollToBottom();
            
            messageHistory.push({ sender, text: text.replace(/<br>/g, '\n').replace(/<strong>(.*?)<\/strong>/g, '**$1**').replace(/<a[^>]*>.*?<\/a>/g, '').replace(/<div[^>]*>.*?<\/div>/g, '') });
            
            if (messageHistory.length > CONFIG.MAX_MESSAGE_HISTORY) {
                messageHistory = messageHistory.slice(-CONFIG.MAX_MESSAGE_HISTORY);
            }
        }

        function scrollToBottom() {
            requestAnimationFrame(() => {
                messagesContainer.scrollTo({
                    top: messagesContainer.scrollHeight,
                    behavior: isMobile() ? 'smooth' : 'smooth'
                });
            });
        }

        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                console.log('DragonAI carregado com sucesso!');
            });
        }

        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                adjustTextareaHeight();
                scrollToBottom();
            }, 500);
        });

        let isPageVisible = true;
        document.addEventListener('visibilitychange', () => {
            isPageVisible = !document.hidden;
            if (isPageVisible) {
                scrollToBottom();
            }
        });

        adjustTextareaHeight();
        messageInput.focus();
        
        checkCacheStatus();
