console.log("V1.0");      
  function initializeLocalGames() {
        const words = [
            "DOCUMENTOS", "HIERARQUIA", "CORREGEDORIA", "SUPREMACIA",
            "CORPOEXECUTIVO", "CORPOMILITAR", "SOLDADO", "CABO",
            "SARGENTO", "SUBTENENTE", "ASPIRANTE", "TENENTE", "MARECHAL", "COMANDANTE", "INSPETOR", "ASSESSOR",
            "ANALISTA", "BATALHAO", "CSI", "COMPANHIA",
            "SUBCOMPANHIA", "ORGAO", "OFICIALATO", "JUSTICA", "COMPANHEIRISMO", "LIDER", "CRIME", "NEGLIGENCIA",
            "CONDUTAIMPROPRIA", "ABANDONODEDEVER", "DESRESPEITO", "NEPOTISMO",
            "INVASAO", "ATAQUE", "FORUM", "SYSTEM", "SUPERVISORES", "PROFESSORES", "TREINADORES", "INSTRUTORES",
            "ESCOLADEFORMACAO", "CORRUPCAO", "CHANCELER", "ALTOCOMANDO",
            "EXONERACAO", "REINCIDENCIA", "RIGIDEZ", "RECEPCAO", "SENTINELA", "REBAIXAMENTO", "EXPULSAO", "ADVERTENCIA",
            "POSTAGEM", "REQUERIMENTOS", "RECURSO", "TAREFAS",
            "BBCODE", "CFO", "CEM", "PULSOFIRME"
        ];

        const selectedWords = [...words].sort(() => Math.random() - 0.5).slice(0, 10);

        const gridSize = 20;
        let grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));
        let foundWords = new Set();
        let wordPositions = {};

        function placeWord(word, row, col, direction) {
            const [dr, dc] = direction;
            const len = word.length;
            for (let i = 0; i < len; i++) {
                const r = row + i * dr;
                const c = col + i * dc;
                if (r < 0 || r >= gridSize || c < 0 || c >= gridSize || (grid[r][c] !== '' && grid[r][c] !== word[i])) return false;
            }
            const positions = [];
            for (let i = 0; i < len; i++) {
                const r = row + i * dr;
                const c = col + i * dc;
                grid[r][c] = word[i];
                positions.push([r, c]);
            }
            wordPositions[word] = { positions, direction };
            return true;
        }

        function generateGrid() {
            selectedWords.forEach(word => {
                let placed = false;
                let attempts = 0;
                const directions = [
                    [0, 1], [0, -1],
                    [1, 0], [-1, 0],
                    [1, 1], [-1, -1],
                    [1, -1], [-1, 1]
                ];
                
                while (!placed && attempts < 100) {
                    const direction = directions[Math.floor(Math.random() * directions.length)];
                    const [dr, dc] = direction;
                    let row, col;
                    
                    if (dr === 0 && dc > 0) {
                        row = Math.floor(Math.random() * gridSize);
                        col = Math.floor(Math.random() * (gridSize - word.length + 1));
                    } else if (dr === 0 && dc < 0) {
                        row = Math.floor(Math.random() * gridSize);
                        col = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                    } else if (dr > 0 && dc === 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1));
                        col = Math.floor(Math.random() * gridSize);
                    } else if (dr < 0 && dc === 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                        col = Math.floor(Math.random() * gridSize);
                    } else if (dr > 0 && dc > 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1));
                        col = Math.floor(Math.random() * (gridSize - word.length + 1));
                    } else if (dr < 0 && dc < 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                        col = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                    } else if (dr > 0 && dc < 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1));
                        col = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                    } else if (dr < 0 && dc > 0) {
                        row = Math.floor(Math.random() * (gridSize - word.length + 1)) + word.length - 1;
                        col = Math.floor(Math.random() * (gridSize - word.length + 1));
                    }
                    
                    if (placeWord(word, row, col, direction)) placed = true;
                    attempts++;
                }
            });
            
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (grid[r][c] === '') grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }

        function renderWordSearch() {
            const container = document.getElementById('word-search');
            container.innerHTML = '';
            
            const screenWidth = window.innerWidth;
            let cellSize = 32;
            
            if (screenWidth <= 500) {
                cellSize = 16;
            } else if (screenWidth <= 700) {
                cellSize = 18;
            } else if (screenWidth <= 900) {
                cellSize = 20;
            } else if (screenWidth <= 1000) {
                cellSize = 20;
            } else if (screenWidth <= 1200) {
                cellSize = 24;
            } else if (screenWidth <= 1400) {
                cellSize = 28;
            }
            
            container.style.gridTemplateColumns = `repeat(20, ${cellSize}px)`;
            
            grid.forEach((row, r) => {
                row.forEach((cell, c) => {
                    const div = document.createElement('div');
                    div.className = 'cell';
                    div.textContent = cell;
                    div.dataset.row = r;
                    div.dataset.col = c;
                    div.style.width = cellSize + 'px';
                    div.style.height = cellSize + 'px';
                    div.style.fontSize = Math.max(8, cellSize * 0.4) + 'px';
                    
                    div.addEventListener('mousedown', (e) => {
                        e.preventDefault();
                        deselectAll();
                        isSelecting = true;
                        selectCell(r, c);
                    });
                    div.addEventListener('mouseenter', () => {
                        if (isSelecting) {
                            selectCell(r, c);
                        }
                    });
                    
                    div.addEventListener('touchstart', (e) => {
                        e.preventDefault();
                        deselectAll();
                        isSelecting = true;
                        selectCell(r, c);
                    });
                    div.addEventListener('touchmove', (e) => {
                        e.preventDefault();
                        if (isSelecting) {
                            const touch = e.touches[0];
                            const element = document.elementFromPoint(touch.clientX, touch.clientY);
                            if (element && element.classList.contains('cell')) {
                                const row = parseInt(element.dataset.row);
                                const col = parseInt(element.dataset.col);
                                if (!isNaN(row) && !isNaN(col)) {
                                    selectCell(row, col);
                                }
                            }
                        }
                    });
                    
                    container.appendChild(div);
                });
            });
            
            document.addEventListener('mouseup', () => {
                if (isSelecting) {
                    isSelecting = false;
                    startCell = null;
                    checkWord();
                }
            });
            
            document.addEventListener('touchend', () => {
                if (isSelecting) {
                    isSelecting = false;
                    startCell = null;
                    checkWord();
                }
            });
        }

        let selectedCells = [];
        let isSelecting = false;
        let startCell = null;

        function selectCell(r, c) {
            if (!startCell) {
                startCell = [r, c];
                const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                if (!cell.classList.contains('selected')) {
                    cell.classList.add('selected');
                    selectedCells.push([r, c]);
                }
                return;
            }

            const deltaR = r - startCell[0];
            const deltaC = c - startCell[1];
            
            let direction = null;
            if (deltaR === 0 && deltaC !== 0) {
                direction = [0, deltaC > 0 ? 1 : -1];
            } else if (deltaC === 0 && deltaR !== 0) {
                direction = [1 * (deltaR > 0 ? 1 : -1), 0];
            } else if (Math.abs(deltaR) === Math.abs(deltaC) && deltaR !== 0) {
                direction = [deltaR > 0 ? 1 : -1, deltaC > 0 ? 1 : -1];
            }

            if (direction) {
                selectedCells = [startCell];
                document.querySelectorAll('.cell.selected').forEach(cell => {
                    const row = parseInt(cell.dataset.row);
                    const col = parseInt(cell.dataset.col);
                    if (row !== startCell[0] || col !== startCell[1]) {
                        cell.classList.remove('selected');
                    }
                });

                const steps = Math.max(Math.abs(deltaR), Math.abs(deltaC));
                for (let i = 1; i <= steps; i++) {
                    const newR = startCell[0] + i * direction[0];
                    const newC = startCell[1] + i * direction[1];
                    if (newR >= 0 && newR < gridSize && newC >= 0 && newC < gridSize) {
                        const cell = document.querySelector(`.cell[data-row="${newR}"][data-col="${newC}"]`);
                        if (cell && !cell.classList.contains('selected')) {
                            cell.classList.add('selected');
                            selectedCells.push([newR, newC]);
                        }
                    }
                }
            }
        }

        function deselectAll() {
            document.querySelectorAll('.cell.selected, .cell.hinted').forEach(cell => {
                cell.classList.remove('selected', 'hinted');
            });
            selectedCells = [];
            startCell = null;
        }

        function checkWord() {
            if (selectedCells.length < 2) return;
            
            const sorted = selectedCells.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
            const first = sorted[0];
            const last = sorted[sorted.length - 1];
            const deltaR = last[0] - first[0];
            const deltaC = last[1] - first[1];
            
            let direction = null;
            let isReversed = false;
            
            if (deltaR === 0 && deltaC > 0) {
                direction = [0, 1];
            } else if (deltaR === 0 && deltaC < 0) {
                direction = [0, -1];
                isReversed = true;
            } else if (deltaR > 0 && deltaC === 0) {
                direction = [1, 0];
            } else if (deltaR < 0 && deltaC === 0) {
                direction = [-1, 0];
                isReversed = true;
            } else if (deltaR > 0 && deltaC > 0 && deltaR === deltaC) {
                direction = [1, 1];
            } else if (deltaR < 0 && deltaC < 0 && deltaR === deltaC) {
                direction = [-1, -1];
                isReversed = true;
            } else if (deltaR > 0 && deltaC < 0 && deltaR === -deltaC) {
                direction = [1, -1];
            } else if (deltaR < 0 && deltaC > 0 && deltaR === -deltaC) {
                direction = [-1, 1];
                isReversed = true;
            } else {
                return;
            }

            const word = [];
            const orderedCells = isReversed ? selectedCells.slice().reverse() : selectedCells;
            orderedCells.forEach(([r, c]) => {
                word.push(grid[r][c]);
            });
            
            const wordStr = word.join('');
            const reversed = wordStr.split('').reverse().join('');
            
            if (selectedWords.includes(wordStr) || selectedWords.includes(reversed)) {
                foundWords.add(selectedWords.includes(wordStr) ? wordStr : reversed);
                updateWordsList();
                selectedCells.forEach(([r, c]) => {
                    const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
                    cell.style.background = 'rgba(34, 197, 94, 0.4)';
                    cell.style.borderColor = 'rgba(34, 197, 94, 0.8)';
                    cell.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
                    cell.classList.remove('hinted');
                });
                
                if (foundWords.size === selectedWords.length) {
                    setTimeout(() => {
                        showWordsearchModal();
                    }, 500);
                }
                
                selectedCells = [];
            }
        }

        function giveHint() {
            document.querySelectorAll('.cell.hinted').forEach(cell => cell.classList.remove('hinted'));
            
            const unfoundWords = selectedWords.filter(word => !foundWords.has(word));
            if (unfoundWords.length === 0) return;
            
            const word = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
            const { positions } = wordPositions[word];
            const [r, c] = positions[0];
            const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            if (cell) {
                cell.classList.add('hinted');
                setTimeout(() => cell.classList.remove('hinted'), 3000);
            }
        }

        function updateWordsList() {
            const list = document.getElementById('words-list');
            list.innerHTML = '';
            selectedWords.forEach(word => {
                const div = document.createElement('div');
                div.className = 'word';
                if (foundWords.has(word)) div.classList.add('found');
                div.textContent = word;
                list.appendChild(div);
            });
        }

        function showWordsearchModal() {
            const modal = document.getElementById('wordsearch-modal');
            if (modal) {
                modal.style.display = 'flex';
            }
        }

        function restartWordsearchGame() {
            const modal = document.getElementById('wordsearch-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            
            foundWords.clear();
            selectedCells = [];
            startCell = null;
            
            generateGrid();
            renderWordSearch();
            updateWordsList();
        }

        const memoryCards = [
            'https://i.imgur.com/afnlubG.png',
            'https://i.imgur.com/afnlubG.png',
            'https://i.imgur.com/CVFDkiX.png',
            'https://i.imgur.com/CVFDkiX.png',
            'https://i.imgur.com/7BAnsdO.png',
            'https://i.imgur.com/7BAnsdO.png',
            'https://i.imgur.com/4FvAxcW.png',
            'https://i.imgur.com/4FvAxcW.png',
            'https://i.imgur.com/IJyO0pZ.png',
            'https://i.imgur.com/IJyO0pZ.png',
            'https://i.imgur.com/1d0DeWS.png',
            'https://i.imgur.com/1d0DeWS.png',
            'https://i.imgur.com/rOFLYNt.gif',
            'https://i.imgur.com/rOFLYNt.gif',
            'https://i.imgur.com/2X6qNXX.gif',
            'https://i.imgur.com/2X6qNXX.gif',
            'https://2img.net/u/1517/14/72/66/avatars/12854-54.png',
            'https://2img.net/u/1517/14/72/66/avatars/12854-54.png',
            'https://i.imgur.com/YFcjFTG.png',
            'https://i.imgur.com/YFcjFTG.png'
        ];
        let shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
        let flippedCards = [];
        let matchedCards = [];
        let imagesLoaded = false;
        let memoryTimer = null;
        let memoryTimeElapsed = 0;
        let gameStarted = false;

        function preloadImages() {
            const uniqueImages = [...new Set(memoryCards)];
            let loadedCount = 0;
            const totalImages = uniqueImages.length;

            uniqueImages.forEach(url => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        imagesLoaded = true;
                        renderMemoryGame();
                    }
                };
                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        imagesLoaded = true;
                        renderMemoryGame();
                    }
                };
                img.src = url;
            });
        }

        function renderMemoryGame() {
            const container = document.getElementById('memory-game');
            if (!container) return;
            
            container.innerHTML = '';
            shuffledCards.forEach((card, index) => {
                const div = document.createElement('div');
                div.className = 'card';
                div.dataset.index = index;
                div.style.backgroundImage = 'none';
                div.addEventListener('click', () => flipCard(index));
                container.appendChild(div);
            });
            
            const memoryControls = document.getElementById('memory-controls');
            if (memoryControls) {
                memoryControls.style.display = 'block';
            }
            
        }

        function flipCard(index) {
            if (flippedCards.length === 2 || matchedCards.includes(index)) return;
            
            if (!gameStarted) {
                gameStarted = true;
                startMemoryTimer();
            }
            
            const card = document.querySelector(`.card[data-index="${index}"]`);
            card.style.backgroundImage = `url(${shuffledCards[index]})`;
            card.style.backgroundSize = 'cover';
            card.style.backgroundPosition = 'center center';
            card.style.backgroundRepeat = 'no-repeat';
            card.classList.add('flipped');
            flippedCards.push(index);
            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }

        function checkMatch() {
            const [i1, i2] = flippedCards;
            if (shuffledCards[i1] === shuffledCards[i2]) {
                matchedCards.push(i1, i2);
                document.querySelector(`.card[data-index="${i1}"]`).style.opacity = 0.5;
                document.querySelector(`.card[data-index="${i2}"]`).style.opacity = 0.5;
                
                if (matchedCards.length === shuffledCards.length) {
                    setTimeout(() => {
                        stopMemoryTimer();
                        showCongratulations();
                    }, 500);
                }
            } else {
                document.querySelector(`.card[data-index="${i1}"]`).classList.remove('flipped');
                document.querySelector(`.card[data-index="${i1}"]`).style.backgroundImage = 'none';
                document.querySelector(`.card[data-index="${i2}"]`).classList.remove('flipped');
                document.querySelector(`.card[data-index="${i2}"]`).style.backgroundImage = 'none';
            }
            flippedCards = [];
        }

        function startMemoryTimer() {
            if (memoryTimer) return;
            
            memoryTimer = setInterval(() => {
                memoryTimeElapsed++;
                updateMemoryTimerDisplay();
            }, 1000);
        }

        function stopMemoryTimer() {
            if (memoryTimer) {
                clearInterval(memoryTimer);
                memoryTimer = null;
            }
        }

        function updateMemoryTimerDisplay() {
            const minutes = Math.floor(memoryTimeElapsed / 60);
            const seconds = memoryTimeElapsed % 60;
            const timerDisplay = document.getElementById('memory-timer');
            if (timerDisplay) {
                timerDisplay.textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }

        function showCongratulations() {
            const modal = document.getElementById('memory-modal');
            const modalTime = document.getElementById('modal-time');
            if (modal && modalTime) {
                const minutes = Math.floor(memoryTimeElapsed / 60);
                const seconds = memoryTimeElapsed % 60;
                modalTime.textContent = `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                modal.style.display = 'flex';
            }
        }

        function restartMemoryGame() {
            flippedCards = [];
            matchedCards = [];
            gameStarted = false;
            memoryTimeElapsed = 0;
            
            stopMemoryTimer();
            
            updateMemoryTimerDisplay();
            
            const modal = document.getElementById('memory-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            
            shuffledCards = [...memoryCards].sort(() => Math.random() - 0.5);
            
            renderMemoryGame();
        }

        generateGrid();
        renderWordSearch();
        updateWordsList();
        preloadImages();

        document.getElementById('btn-wordsearch').addEventListener('click', () => {
            document.getElementById('wordsearch-section').style.display = 'block';
            document.getElementById('memory-section').style.display = 'none';
            document.getElementById('drawing-section').style.display = 'none';
            document.getElementById('checkers-section').style.display = 'none';
            document.getElementById('simon-section').style.display = 'none';
            document.getElementById('btn-wordsearch').classList.add('active');
            document.getElementById('btn-memory').classList.remove('active');
            document.getElementById('btn-drawing').classList.remove('active');
            document.getElementById('btn-checkers').classList.remove('active');
            document.getElementById('btn-simon').classList.remove('active');
        });

        document.getElementById('btn-memory').addEventListener('click', () => {
            document.getElementById('wordsearch-section').style.display = 'none';
            document.getElementById('memory-section').style.display = 'block';
            document.getElementById('drawing-section').style.display = 'none';
            document.getElementById('checkers-section').style.display = 'none';
            document.getElementById('simon-section').style.display = 'none';
            document.getElementById('btn-memory').classList.add('active');
            document.getElementById('btn-wordsearch').classList.remove('active');
            document.getElementById('btn-drawing').classList.remove('active');
            document.getElementById('btn-checkers').classList.remove('active');
            document.getElementById('btn-simon').classList.remove('active');
        });

        document.getElementById('btn-drawing').addEventListener('click', () => {
            document.getElementById('wordsearch-section').style.display = 'none';
            document.getElementById('memory-section').style.display = 'none';
            document.getElementById('drawing-section').style.display = 'block';
            document.getElementById('checkers-section').style.display = 'none';
            document.getElementById('simon-section').style.display = 'none';
            document.getElementById('btn-drawing').classList.add('active');
            document.getElementById('btn-wordsearch').classList.remove('active');
            document.getElementById('btn-memory').classList.remove('active');
            document.getElementById('btn-checkers').classList.remove('active');
            document.getElementById('btn-simon').classList.remove('active');
        });

        document.getElementById('btn-dica').addEventListener('click', giveHint);

        document.getElementById('restart-memory').addEventListener('click', restartMemoryGame);
        document.getElementById('play-again-memory').addEventListener('click', restartMemoryGame);

        document.getElementById('play-again-wordsearch').addEventListener('click', restartWordsearchGame);

        const referenceImages = [
            'https://www.freeiconspng.com/uploads/http--media-merchantcirclem-30014890-house-full-6.png',
            'https://www.freeiconspng.com/uploads/download-png-image-star-png-image-1.png',
            'https://www.freeiconspng.com/uploads/christmas-tree-icon-10.png',
            'https://www.freeiconspng.com/uploads/sun-icon-22.png',
            'https://www.freeiconspng.com/uploads/plane-icon--iconshow-14.png',
            'https://www.freeiconspng.com/uploads/cat-icon-28.png',
            'https://www.freeiconspng.com/uploads/fish-fish-bone-icon--9.png',
            'https://www.freeiconspng.com/uploads/animal-pet-dog-icon-13.png',
            'https://www.freeiconspng.com/uploads/auto-automobile-car-pictogram-service-traffic-transport--2.png',
            'https://www.freeiconspng.com/uploads/flower-icons-free-flower-icon-download-iconhotm-1.png'
        ];

        let drawingTimer = null;
        let timeLeft = 180;
        let isDrawing = false;
        let hasStartedDrawing = false;
        let canvas = null;
        let ctx = null;
        let currentReferenceImage = null;
        let referenceCanvas = null;
        let referenceCtx = null;
        
        let currentTool = 'brush';
        let startX, startY;
        let isDrawingShape = false;
        let imageData = null;
        let undoStack = [];
        let maxUndoSteps = 20;

        function initializeDrawingGame() {
            canvas = document.getElementById('drawing-canvas');
            ctx = canvas.getContext('2d');
            
            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mouseout', stopDrawing);
            
            canvas.addEventListener('touchstart', startDrawing);
            canvas.addEventListener('touchmove', draw);
            canvas.addEventListener('touchend', stopDrawing);
            
            document.getElementById('clear-canvas').addEventListener('click', clearCanvas);
            document.getElementById('undo-canvas').addEventListener('click', undoLastAction);
            document.getElementById('start-drawing').addEventListener('click', () => startNewChallenge(true));
            document.getElementById('finish-drawing').addEventListener('click', finishDrawing);
            
            document.querySelectorAll('.tool-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    currentTool = e.target.dataset.tool;
                    
                    if (currentTool === 'eraser') {
                        canvas.classList.add('eraser-mode');
                    } else {
                        canvas.classList.remove('eraser-mode');
                    }
                });
            });
            
            document.querySelectorAll('.color-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    document.getElementById('color-picker').value = e.target.dataset.color;
                });
            });
            
            document.getElementById('color-picker').addEventListener('change', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            });
            
            document.getElementById('brush-size').addEventListener('input', (e) => {
                document.getElementById('size-display').textContent = e.target.value;
            });
            
            referenceCanvas = document.createElement('canvas');
            referenceCanvas.width = 580;
            referenceCanvas.height = 280;
            referenceCtx = referenceCanvas.getContext('2d');
            
            document.querySelector('.color-btn[data-color="#000000"]').classList.add('active');
            
            startNewChallenge();
            
            saveCanvasState();
        }

        function saveCanvasState() {
            undoStack.push(canvas.toDataURL());
            if (undoStack.length > maxUndoSteps) {
                undoStack.shift();
            }
        }

        function undoLastAction() {
            if (undoStack.length > 1) {
                undoStack.pop();
                const previousState = undoStack[undoStack.length - 1];
                const img = new Image();
                img.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
                img.src = previousState;
            }
        }

        function startDrawing(e) {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            startX = (e.clientX || e.touches[0].clientX) - rect.left;
            startY = (e.clientY || e.touches[0].clientY) - rect.top;
            
            isDrawing = true;
            
                if (!hasStartedDrawing) {
                    hasStartedDrawing = true;
                    startDrawingTimer();
                    document.getElementById('finish-drawing').style.display = 'inline-block';
                }            if (currentTool === 'brush' || currentTool === 'eraser') {
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                
                if (currentTool === 'brush') {
                    saveCanvasState();
                }
            } else if (currentTool === 'line' || currentTool === 'rectangle' || currentTool === 'circle') {
                isDrawingShape = true;
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            }
        }

        function draw(e) {
            if (!isDrawing) return;
            e.preventDefault();
            
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;
            
            ctx.lineWidth = document.getElementById('brush-size').value;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            if (currentTool === 'brush') {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = document.getElementById('color-picker').value;
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else if (currentTool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            } else if (isDrawingShape && imageData) {
                ctx.putImageData(imageData, 0, 0);
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = document.getElementById('color-picker').value;
                ctx.lineWidth = document.getElementById('brush-size').value;
                ctx.lineCap = 'round';
                
                if (currentTool === 'line') {
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                } else if (currentTool === 'rectangle') {
                    const width = x - startX;
                    const height = y - startY;
                    ctx.beginPath();
                    ctx.rect(startX, startY, width, height);
                    ctx.stroke();
                } else if (currentTool === 'circle') {
                    const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
                    ctx.beginPath();
                    ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
                    ctx.stroke();
                }
            }
        }

        function stopDrawing(e) {
            if (!isDrawing) return;
            e.preventDefault();
            
            if (isDrawingShape) {
                isDrawingShape = false;
                imageData = null;
                saveCanvasState();
            }
            
            isDrawing = false;
            ctx.beginPath();
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            saveCanvasState();
        }

        function startNewChallenge(showFinishButton = false) {
            clearCanvas();
            
            hasStartedDrawing = false;
            if (drawingTimer) {
                clearInterval(drawingTimer);
                drawingTimer = null;
            }
            
            const randomImage = referenceImages[Math.floor(Math.random() * referenceImages.length)];
            currentReferenceImage = randomImage;
            document.getElementById('reference-img').src = randomImage;
            
            timeLeft = 180;
            updateTimer();
            
            if (showFinishButton) {
                document.getElementById('finish-drawing').style.display = 'inline-block';
            } else {
                document.getElementById('finish-drawing').style.display = 'none';
            }
            const resultArea = document.getElementById('result-area');
            if (resultArea) resultArea.style.display = 'none';
            
            undoStack = [];
            saveCanvasState();
        }

        function startDrawingTimer() {
            drawingTimer = setInterval(() => {
                timeLeft--;
                updateTimer();
                
                if (timeLeft <= 0) {
                    clearInterval(drawingTimer);
                    finishDrawing();
                }
            }, 1000);
        }

        function updateTimer() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById('timer').textContent = 
                `Tempo: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 30) {
                document.getElementById('timer').style.color = '#ff3333';
            } else if (timeLeft <= 60) {
                document.getElementById('timer').style.color = '#ff9900';
            } else {
                document.getElementById('timer').style.color = '#ff6600';
            }
        }

        function finishDrawing() {
            
            if (drawingTimer) {
                clearInterval(drawingTimer);
                drawingTimer = null;
            }
            
            document.getElementById('finish-drawing').style.display = 'none';
            
            compareImages();
        }

        function loadReferenceImageToCanvas() {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.onload = function() {
                    referenceCtx.fillStyle = 'white';
                    referenceCtx.fillRect(0, 0, referenceCanvas.width, referenceCanvas.height);
                    
                    const scale = Math.min(referenceCanvas.width / img.width, referenceCanvas.height / img.height);
                    const x = (referenceCanvas.width - img.width * scale) / 2;
                    const y = (referenceCanvas.height - img.height * scale) / 2;
                    
                    referenceCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
                    resolve();
                };
                img.onerror = function() {
                    
                    createFallbackImage();
                    resolve();
                };
                img.src = currentReferenceImage;
            });
        }

        function createFallbackImage() {
            referenceCtx.fillStyle = 'white';
            referenceCtx.fillRect(0, 0, referenceCanvas.width, referenceCanvas.height);
            
            referenceCtx.fillStyle = '#8B4513';
            referenceCtx.fillRect(200, 150, 180, 100);
            
            referenceCtx.fillStyle = '#654321';
            referenceCtx.beginPath();
            referenceCtx.moveTo(190, 150);
            referenceCtx.lineTo(290, 100);
            referenceCtx.lineTo(390, 150);
            referenceCtx.closePath();
            referenceCtx.fill();
            
            referenceCtx.fillStyle = '#4A4A4A';
            referenceCtx.fillRect(270, 200, 30, 50);
            
            referenceCtx.fillStyle = '#87CEEB';
            referenceCtx.fillRect(220, 170, 25, 25);
            referenceCtx.fillRect(335, 170, 25, 25);
        }

        async function compareImages() {
            
            try {
                await loadReferenceImageToCanvas();
                
                const userImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const referenceImageData = referenceCtx.getImageData(0, 0, referenceCanvas.width, referenceCanvas.height);
                
                const score = calculateAdvancedSimilarity(userImageData, referenceImageData);
                
                showResult(score);
            } catch (error) {
                
                const score = calculateDrawingComplexity();
                showResult(score);
            }
        }

        function calculateDrawingComplexity() {
            try {
                const userImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const userPixels = userImageData.data;
                
                let drawnPixels = 0;
                let colorVariety = new Set();
                let totalIntensity = 0;
                
                for (let i = 0; i < userPixels.length; i += 4) {
                    const r = userPixels[i];
                    const g = userPixels[i + 1];
                    const b = userPixels[i + 2];
                    const a = userPixels[i + 3];
                    
                    if (a > 0 && (r < 250 || g < 250 || b < 250)) {
                        drawnPixels++;
                        colorVariety.add(`${Math.floor(r/50)}-${Math.floor(g/50)}-${Math.floor(b/50)}`);
                        totalIntensity += (255 - r) + (255 - g) + (255 - b);
                    }
                }
                
                if (drawnPixels === 0) return 0;
                
                const coverageScore = Math.min(drawnPixels / 20000, 1) * 3;
                const varietyScore = Math.min(colorVariety.size / 8, 1) * 2.5;
                const intensityScore = Math.min(totalIntensity / (drawnPixels * 250), 1) * 2.5;
                
                const totalScore = (coverageScore + varietyScore + intensityScore) * 0.9;
                return Math.min(10, Math.max(1, Math.round(totalScore * 10) / 10));
            } catch (error) {
                
                return 3;
            }
        }

        function calculateAdvancedSimilarity(userData, refData) {
            try {
                const userPixels = userData.data;
                const refPixels = refData.data;
                
                let userColorRegions = analyzeColorRegions(userPixels, userData.width, userData.height);
                let refColorRegions = analyzeColorRegions(refPixels, refData.width, refData.height);
                
                let userEdges = detectEdges(userPixels, userData.width, userData.height);
                let refEdges = detectEdges(refPixels, refData.width, refData.height);
                
                let colorSimilarity = compareColorDistribution(userColorRegions, refColorRegions);
                let shapeSimilarity = compareEdgePatterns(userEdges, refEdges);
                let complexityScore = calculateUserComplexity(userPixels);
                
                let finalScore = (colorSimilarity * 0.3) + (shapeSimilarity * 0.4) + (complexityScore * 0.3);
                finalScore = finalScore * 0.8;
                
                return Math.min(10, Math.max(0.5, Math.round(finalScore * 10) / 10));
            } catch (error) {
                
                return calculateDrawingComplexity();
            }
        }

        function analyzeColorRegions(pixels, width, height) {
            let regions = {};
            let totalPixels = 0;
            
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];
                
                if (a > 0) {
                    totalPixels++;
                    const colorKey = `${Math.floor(r/40)}-${Math.floor(g/40)}-${Math.floor(b/40)}`;
                    regions[colorKey] = (regions[colorKey] || 0) + 1;
                }
            }
            
            Object.keys(regions).forEach(key => {
                regions[key] = regions[key] / totalPixels;
            });
            
            return regions;
        }

        function detectEdges(pixels, width, height) {
            let edges = 0;
            
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    let idx = (y * width + x) * 4;
                    let current = pixels[idx] + pixels[idx + 1] + pixels[idx + 2];
                    
                    let right = pixels[idx + 4] + pixels[idx + 5] + pixels[idx + 6];
                    let down = pixels[idx + width * 4] + pixels[idx + width * 4 + 1] + pixels[idx + width * 4 + 2];
                    
                    if (Math.abs(current - right) > 100 || Math.abs(current - down) > 100) {
                        edges++;
                    }
                }
            }
            
            return edges / (width * height);
        }

        function compareColorDistribution(user, ref) {
            let similarity = 0;
            let totalKeys = new Set([...Object.keys(user), ...Object.keys(ref)]);
            
            totalKeys.forEach(key => {
                let userVal = user[key] || 0;
                let refVal = ref[key] || 0;
                similarity += 1 - Math.abs(userVal - refVal);
            });
            
            return Math.min(10, similarity / totalKeys.size * 10);
        }

        function compareEdgePatterns(userEdges, refEdges) {
            let edgeSimilarity = 1 - Math.abs(userEdges - refEdges) / Math.max(userEdges, refEdges, 0.001);
            return Math.min(10, edgeSimilarity * 10);
        }

        function calculateUserComplexity(pixels) {
            let drawnPixels = 0;
            let colorVariety = new Set();
            let strokeDensity = 0;
            
            for (let i = 0; i < pixels.length; i += 4) {
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                const a = pixels[i + 3];
                
                if (a > 0 && (r < 250 || g < 250 || b < 250)) {
                    drawnPixels++;
                    colorVariety.add(`${Math.floor(r/50)}-${Math.floor(g/50)}-${Math.floor(b/50)}`);
                    strokeDensity += (255 - r) + (255 - g) + (255 - b);
                }
            }
            
            if (drawnPixels === 0) return 0;
            
            let coverage = Math.min(drawnPixels / 12000, 1) * 4;
            let variety = Math.min(colorVariety.size / 8, 1) * 3;
            let density = Math.min(strokeDensity / (drawnPixels * 200), 1) * 3;
            
            return coverage + variety + density;
        }

        function showResult(score) {
            document.getElementById('result-area').style.display = 'block';
            
            const scoreElement = document.getElementById('score-number');
            const messageElement = document.getElementById('score-message');
            
            let currentScore = 0;
            const increment = score / 20;
            const scoreInterval = setInterval(() => {
                currentScore += increment;
                if (currentScore >= score) {
                    currentScore = score;
                    clearInterval(scoreInterval);
                }
                scoreElement.textContent = currentScore.toFixed(1);
            }, 50);
            
            let message = '';
            if (score >= 9) {
                message = '🎉 Incrível! Desenho quase perfeito!';
            } else if (score >= 7.5) {
                message = '👏 Muito bom! Parabéns pelo desenho!';
            } else if (score >= 6) {
                message = '👍 Bom trabalho! Continue praticando!';
            } else if (score >= 4) {
                message = '😊 Não está mal! Tente novamente!';
            } else if (score >= 2) {
                message = '💪 Continue tentando! Prática leva à perfeição!';
            } else {
                message = '🤔 Que tal tentar desenhar algo mais elaborado?';
            }
            messageElement.textContent = message;
            
            showComparisonImages();
        }

        function showComparisonImages() {
            const refCompCanvas = document.getElementById('reference-comparison');
            const refCompCtx = refCompCanvas.getContext('2d');
            refCompCtx.fillStyle = 'white';
            refCompCtx.fillRect(0, 0, refCompCanvas.width, refCompCanvas.height);
            
            const img = new Image();
            img.onload = function() {
                const scale = Math.min(refCompCanvas.width / img.width, refCompCanvas.height / img.height);
                const x = (refCompCanvas.width - img.width * scale) / 2;
                const y = (refCompCanvas.height - img.height * scale) / 2;
                refCompCtx.drawImage(img, x, y, img.width * scale, img.height * scale);
            };
            img.onerror = function() {
                refCompCtx.drawImage(referenceCanvas, 0, 0, refCompCanvas.width, refCompCanvas.height);
            };
            img.src = currentReferenceImage;
            
            const userCompCanvas = document.getElementById('user-comparison');
            const userCompCtx = userCompCanvas.getContext('2d');
            userCompCtx.fillStyle = 'white';
            userCompCtx.fillRect(0, 0, userCompCanvas.width, userCompCanvas.height);
            userCompCtx.drawImage(canvas, 0, 0, userCompCanvas.width, userCompCanvas.height);
        }

        initializeDrawingGame();
        
        let checkersBoard = [];
        let currentPlayer = 'red';
        let selectedPiece = null;
        let possibleMoves = [];
        let gameHistory = [];
        let redPieces = 12;
        let blackPieces = 12;
        let mustCapture = false;
        
        function initializeCheckersGame() {
            checkersBoard = Array(8).fill().map(() => Array(8).fill(null));
            currentPlayer = 'red';
            selectedPiece = null;
            possibleMoves = [];
            gameHistory = [];
            redPieces = 12;
            blackPieces = 12;
            mustCapture = false;
            
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if ((row + col) % 2 === 1) {
                        if (row < 3) {
                            checkersBoard[row][col] = { color: 'black', isKing: false };
                        } else if (row > 4) {
                            checkersBoard[row][col] = { color: 'red', isKing: false };
                        }
                    }
                }
            }
            
            renderCheckersBoard();
            updateCheckersStatus();
        }
        
        function renderCheckersBoard() {
            const board = document.getElementById('checkers-board');
            if (!board) return;
            
            board.innerHTML = '';
            
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    const square = document.createElement('div');
                    square.className = 'checkers-square';
                    square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
                    square.dataset.row = row;
                    square.dataset.col = col;
                    
                    if (possibleMoves.some(move => move.row === row && move.col === col)) {
                        square.classList.add('highlight');
                    }
                    
                    if (selectedPiece && selectedPiece.row === row && selectedPiece.col === col) {
                        square.classList.add('selected');
                    }
                    
                    if (checkersBoard[row][col]) {
                        const piece = document.createElement('div');
                        piece.className = 'checkers-piece';
                        piece.classList.add(checkersBoard[row][col].color);
                        if (checkersBoard[row][col].isKing) {
                            piece.classList.add('king');
                        }
                        square.appendChild(piece);
                    }
                    
                    square.addEventListener('click', () => handleCheckersSquareClick(row, col));
                    board.appendChild(square);
                }
            }
        }
        
        function handleCheckersSquareClick(row, col) {
            if (currentPlayer !== 'red') return;
            
            if (selectedPiece && possibleMoves.some(move => move.row === row && move.col === col)) {
                const move = possibleMoves.find(move => move.row === row && move.col === col);
                makeMove(selectedPiece.row, selectedPiece.col, row, col, move);
                return;
            }
            
            if (checkersBoard[row][col] && checkersBoard[row][col].color === currentPlayer) {
                selectedPiece = { row, col };
                possibleMoves = getPossibleMoves(row, col);
                renderCheckersBoard();
                return;
            }
            
            selectedPiece = null;
            possibleMoves = [];
            renderCheckersBoard();
        }
        
        function getPossibleMoves(row, col) {
            const piece = checkersBoard[row][col];
            if (!piece) return [];
            
            const moves = [];
            const directions = piece.isKing ? 
                [[-1, -1], [-1, 1], [1, -1], [1, 1]] : 
                piece.color === 'red' ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]];
            
            const captures = [];
            for (const [dr, dc] of directions) {
                const jumpRow = row + dr * 2;
                const jumpCol = col + dc * 2;
                const middleRow = row + dr;
                const middleCol = col + dc;
                
                if (jumpRow >= 0 && jumpRow < 8 && jumpCol >= 0 && jumpCol < 8 &&
                    !checkersBoard[jumpRow][jumpCol] &&
                    checkersBoard[middleRow][middleCol] &&
                    checkersBoard[middleRow][middleCol].color !== piece.color) {
                    captures.push({ row: jumpRow, col: jumpCol, capture: { row: middleRow, col: middleCol } });
                }
            }
            
            if (captures.length > 0) {
                return captures;
            }
            
            for (const [dr, dc] of directions) {
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !checkersBoard[newRow][newCol]) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
            
            return moves;
        }
        
        function makeMove(fromRow, fromCol, toRow, toCol, moveInfo = null) {
            const piece = checkersBoard[fromRow][fromCol];
            
            gameHistory.push({
                board: JSON.parse(JSON.stringify(checkersBoard)),
                currentPlayer,
                redPieces,
                blackPieces
            });
            
            checkersBoard[toRow][toCol] = piece;
            checkersBoard[fromRow][fromCol] = null;
            
            let captured = false;
            if (moveInfo && moveInfo.capture) {
                const capturedPiece = checkersBoard[moveInfo.capture.row][moveInfo.capture.col];
                checkersBoard[moveInfo.capture.row][moveInfo.capture.col] = null;
                captured = true;
                
                if (capturedPiece.color === 'red') {
                    redPieces--;
                } else {
                    blackPieces--;
                }
                
                const additionalCaptures = getPossibleMoves(toRow, toCol).filter(m => m.capture);
                if (additionalCaptures.length > 0) {
                    selectedPiece = { row: toRow, col: toCol };
                    possibleMoves = additionalCaptures;
                    renderCheckersBoard();
                    updateCheckersStatus();
                    
                    if (piece.color === 'black') {
                        setTimeout(() => {
                            const nextCapture = additionalCaptures[Math.floor(Math.random() * additionalCaptures.length)];
                            makeMove(toRow, toCol, nextCapture.row, nextCapture.col, nextCapture);
                        }, 1000);
                    }
                    
                    return;
                }
            }
            
            if (!piece.isKing) {
                if ((piece.color === 'red' && toRow === 0) || (piece.color === 'black' && toRow === 7)) {
                    piece.isKing = true;
                }
            }
            
            currentPlayer = currentPlayer === 'red' ? 'black' : 'red';
            selectedPiece = null;
            possibleMoves = [];
            mustCapture = false;
            
            if (redPieces === 0 || blackPieces === 0) {
                renderCheckersBoard();
                updateCheckersStatus();
                setTimeout(endCheckersGame, 500);
                return;
            }
            
            if (currentPlayer === 'black') {
                setTimeout(makeComputerMove, 1000);
            }
            
            renderCheckersBoard();
            updateCheckersStatus();
        }
        
        function makeComputerMove() {
            if (selectedPiece && checkersBoard[selectedPiece.row][selectedPiece.col] && 
                checkersBoard[selectedPiece.row][selectedPiece.col].color === 'black' && possibleMoves.length > 0) {
                const captureMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                makeMove(selectedPiece.row, selectedPiece.col, captureMove.row, captureMove.col, captureMove);
                return;
            }
            
            const captureMoves = [];
            
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (checkersBoard[row][col] && checkersBoard[row][col].color === 'black') {
                        const moves = getPossibleMoves(row, col);
                        const captures = moves.filter(move => move.capture);
                        captures.forEach(capture => {
                            captureMoves.push({ from: { row, col }, to: capture, moveInfo: capture });
                        });
                    }
                }
            }
            
            if (captureMoves.length > 0) {
                const randomCapture = captureMoves[Math.floor(Math.random() * captureMoves.length)];
                makeMove(randomCapture.from.row, randomCapture.from.col, randomCapture.to.row, randomCapture.to.col, randomCapture.moveInfo);
                return;
            }
            
            const allMoves = [];
            
            for (let row = 0; row < 8; row++) {
                for (let col = 0; col < 8; col++) {
                    if (checkersBoard[row][col] && checkersBoard[row][col].color === 'black') {
                        const moves = getPossibleMoves(row, col);
                        moves.forEach(move => {
                            allMoves.push({ from: { row, col }, to: move, moveInfo: move });
                        });
                    }
                }
            }
            
            if (allMoves.length === 0) {
                renderCheckersBoard();
                updateCheckersStatus();
                setTimeout(endCheckersGame, 500);
                return;
            }
            
            const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
            makeMove(randomMove.from.row, randomMove.from.col, randomMove.to.row, randomMove.to.col, randomMove.moveInfo);
        }
        
        function updateCheckersStatus() {
            const status = document.getElementById('checkers-status');
            const redScore = document.getElementById('red-score');
            const blackScore = document.getElementById('black-score');
            
            if (!status || !redScore || !blackScore) return;
            
            redScore.textContent = redPieces;
            blackScore.textContent = blackPieces;
            
            if (currentPlayer === 'red') {
                status.textContent = 'Sua vez (Vermelhas)';
                status.style.color = '#DC143C';
            } else {
                status.textContent = 'Vez do computador (Pretas)';
                status.style.color = '#2F2F2F';
            }
        }
        
        function endCheckersGame() {
            const modal = document.getElementById('checkers-modal');
            const modalTitle = document.getElementById('checkers-modal-title');
            const modalMessage = document.getElementById('checkers-modal-message');
            
            if (!modal || !modalTitle || !modalMessage) return;
            
            if (redPieces === 0) {
                modalTitle.textContent = '🏆 Você perdeu! O computador venceu!';
                modalTitle.style.color = '#2F2F2F';
                modalMessage.textContent = 'Não desanime! Tente novamente!';
            } else if (blackPieces === 0) {
                modalTitle.textContent = '🎉 Parabéns! Você venceu!';
                modalTitle.style.color = '#DC143C';
                modalMessage.textContent = 'Você derrotou o computador!';
            } else {
                modalTitle.textContent = '🤝 Jogo empatado!';
                modalTitle.style.color = '#FFD700';
                modalMessage.textContent = 'Foi um jogo equilibrado!';
            }
            
            modal.style.display = 'flex';
        }
        
        function undoCheckersMove() {
            if (gameHistory.length === 0) return;
            
            const previousState = gameHistory.pop();
            checkersBoard = previousState.board;
            currentPlayer = previousState.currentPlayer;
            redPieces = previousState.redPieces;
            blackPieces = previousState.blackPieces;
            
            selectedPiece = null;
            possibleMoves = [];
            mustCapture = false;
            
            renderCheckersBoard();
            updateCheckersStatus();
        }
        
        document.getElementById('btn-checkers').addEventListener('click', () => {
            document.getElementById('wordsearch-section').style.display = 'none';
            document.getElementById('memory-section').style.display = 'none';
            document.getElementById('drawing-section').style.display = 'none';
            document.getElementById('checkers-section').style.display = 'block';
            document.getElementById('simon-section').style.display = 'none';
            document.getElementById('btn-checkers').classList.add('active');
            document.getElementById('btn-wordsearch').classList.remove('active');
            document.getElementById('btn-memory').classList.remove('active');
            document.getElementById('btn-drawing').classList.remove('active');
            document.getElementById('btn-simon').classList.remove('active');
            
            if (!checkersBoard.length) {
                initializeCheckersGame();
            }
        });
        
        document.getElementById('btn-simon').addEventListener('click', () => {
            document.getElementById('wordsearch-section').style.display = 'none';
            document.getElementById('memory-section').style.display = 'none';
            document.getElementById('drawing-section').style.display = 'none';
            document.getElementById('checkers-section').style.display = 'none';
            document.getElementById('simon-section').style.display = 'block';
            document.getElementById('btn-simon').classList.add('active');
            document.getElementById('btn-wordsearch').classList.remove('active');
            document.getElementById('btn-memory').classList.remove('active');
            document.getElementById('btn-drawing').classList.remove('active');
            document.getElementById('btn-checkers').classList.remove('active');
            
            if (!simonGame.initialized) {
                initializeSimonGame();
            }
        });
        
        document.getElementById('new-checkers-game').addEventListener('click', () => {
            const modal = document.getElementById('checkers-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            initializeCheckersGame();
        });
        document.getElementById('undo-checkers-move').addEventListener('click', undoCheckersMove);
        document.getElementById('play-again-checkers').addEventListener('click', () => {
            const modal = document.getElementById('checkers-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            initializeCheckersGame();
        });
        
        if (document.getElementById('checkers-section').style.display !== 'none') {
            initializeCheckersGame();
        }
        
        const simonGame = {
            sequence: [],
            userSequence: [],
            round: 0,
            isPlaying: false,
            isShowingSequence: false,
            isUserTurn: false,
            gameSpeed: 800,
            initialized: false,
            colors: ['red', 'green', 'blue', 'yellow'],
            sounds: {
                red: 261.63,
                green: 329.63,
                blue: 392.00,
                yellow: 523.25
            }
        };
        
        let audioContext = null;
        
        function initAudioContext() {
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                
            }
        }
        
        function playSound(frequency, duration = 200) {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration / 1000);
        }
        
        function initializeSimonGame() {
            if (simonGame.initialized) return;
            
            initAudioContext();
            
            simonGame.colors.forEach(color => {
                const button = document.getElementById(`simon-${color}`);
                button.addEventListener('click', () => handleSimonButtonClick(color));
                button.addEventListener('mousedown', () => {
                    if (simonGame.isUserTurn && !simonGame.isShowingSequence) {
                        activateButton(color);
                    }
                });
                button.addEventListener('mouseup', () => deactivateButton(color));
                button.addEventListener('mouseleave', () => deactivateButton(color));
            });
            
            document.getElementById('simon-start').addEventListener('click', startSimonGame);
            document.getElementById('simon-reset').addEventListener('click', resetSimonGame);
            document.getElementById('play-again-simon').addEventListener('click', () => {
                const modal = document.getElementById('simon-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
                resetSimonGame();
                startSimonGame();
            });
            
            simonGame.initialized = true;
            updateSimonDisplay();
        }
        
        function startSimonGame() {
            if (simonGame.isPlaying) return;
            
            simonGame.isPlaying = true;
            simonGame.round = 1;
            simonGame.sequence = [];
            simonGame.userSequence = [];
            simonGame.gameSpeed = 800;
            
            updateSimonDisplay();
            hideSimonMessage();
            
            document.getElementById('simon-start').disabled = true;
            
            addToSequence();
            
            setTimeout(() => {
                showSequence();
            }, 1000);
        }
        
        function resetSimonGame() {
            simonGame.isPlaying = false;
            simonGame.isShowingSequence = false;
            simonGame.isUserTurn = false;
            simonGame.round = 0;
            simonGame.sequence = [];
            simonGame.userSequence = [];
            simonGame.gameSpeed = 800;
            
            document.getElementById('simon-start').disabled = false;
            
            simonGame.colors.forEach(color => {
                const button = document.getElementById(`simon-${color}`);
                button.classList.remove('disabled');
                deactivateButton(color);
            });
            
            updateSimonDisplay();
            hideSimonMessage();
        }
        
        function addToSequence() {
            const randomColor = simonGame.colors[Math.floor(Math.random() * simonGame.colors.length)];
            simonGame.sequence.push(randomColor);
        }
        
        function showSequence() {
            simonGame.isShowingSequence = true;
            simonGame.isUserTurn = false;
            simonGame.userSequence = [];
            
            simonGame.colors.forEach(color => {
                const button = document.getElementById(`simon-${color}`);
                button.classList.add('disabled');
            });
            
            updateSimonStatus('Memorize a sequência...');
            
            let index = 0;
            const showNext = () => {
                if (index >= simonGame.sequence.length) {
                    simonGame.isShowingSequence = false;
                    simonGame.isUserTurn = true;
                    
                    simonGame.colors.forEach(color => {
                        const button = document.getElementById(`simon-${color}`);
                        button.classList.remove('disabled');
                    });
                    
                    updateSimonStatus('Sua vez! Repita a sequência.');
                    return;
                }
                
                const color = simonGame.sequence[index];
                
                activateButton(color);
                playSound(simonGame.sounds[color], simonGame.gameSpeed * 0.6);
                
                setTimeout(() => {
                    deactivateButton(color);
                    index++;
                    
                    if (index < simonGame.sequence.length) {
                        setTimeout(showNext, simonGame.gameSpeed * 0.3);
                    } else {
                        setTimeout(showNext, simonGame.gameSpeed * 0.5);
                    }
                }, simonGame.gameSpeed * 0.6);
            };
            
            setTimeout(showNext, 500);
        }
        
        function handleSimonButtonClick(color) {
            if (!simonGame.isUserTurn || simonGame.isShowingSequence) return;
            
            playSound(simonGame.sounds[color], 150);
            simonGame.userSequence.push(color);
            
            const currentIndex = simonGame.userSequence.length - 1;
            const expectedColor = simonGame.sequence[currentIndex];
            
            if (color !== expectedColor) {
                gameOver();
                return;
            }
            
            if (simonGame.userSequence.length === simonGame.sequence.length) {
                simonGame.isUserTurn = false;
                simonGame.round++;
                
                if (simonGame.round > 20) {
                    showSimonWinModal();
                    return;
                }
                
                simonGame.gameSpeed = Math.max(300, simonGame.gameSpeed - 25);
                
                updateSimonDisplay();
                showSimonMessage('Correto! Próxima rodada...', 'success');
                
                setTimeout(() => {
                    addToSequence();
                    setTimeout(() => {
                        hideSimonMessage();
                        showSequence();
                    }, 1000);
                }, 1500);
            }
        }
        
        function activateButton(color) {
            const button = document.getElementById(`simon-${color}`);
            button.classList.add('active');
        }
        
        function deactivateButton(color) {
            const button = document.getElementById(`simon-${color}`);
            button.classList.remove('active');
        }
        
        function gameOver() {
            simonGame.isPlaying = false;
            simonGame.isUserTurn = false;
            simonGame.isShowingSequence = false;
            
            simonGame.colors.forEach(color => {
                const button = document.getElementById(`simon-${color}`);
                button.classList.add('disabled');
            });
            
            document.getElementById('simon-start').disabled = false;
            
            showSimonMessage('Game Over! Sequência incorreta.', 'error');
            updateSimonStatus('Clique em "Iniciar Jogo" para tentar novamente.');
            
            setTimeout(() => {
                showSimonGameOverModal();
            }, 2000);
        }
        
        function showSimonWinModal() {
            const modal = document.getElementById('simon-modal');
            const modalTitle = document.getElementById('simon-modal-title');
            const modalMessage = document.getElementById('simon-modal-message');
            
            if (!modal || !modalTitle || !modalMessage) return;
            
            modalTitle.textContent = '🏆 Parabéns! Você venceu! 🏆';
            modalTitle.style.color = '#FFD700';
            modalMessage.textContent = 'Você completou todas as 20 rodadas! Incrível!';
            
            modal.style.display = 'flex';
        }
        
        function showSimonGameOverModal() {
            const modal = document.getElementById('simon-modal');
            const modalTitle = document.getElementById('simon-modal-title');
            const modalMessage = document.getElementById('simon-modal-message');
            
            if (!modal || !modalTitle || !modalMessage) return;
            
            modalTitle.textContent = '💥 Game Over! 💥';
            modalTitle.style.color = '#ff4444';
            modalMessage.textContent = `Você chegou na rodada ${simonGame.round}!`;
            
            modal.style.display = 'flex';
        }
        
        function updateSimonDisplay() {
            const roundElement = document.getElementById('simon-round');
            const statusElement = document.getElementById('simon-status');
            
            if (roundElement) {
                roundElement.textContent = `Rodada: ${simonGame.round}`;
            }
            
            if (statusElement && !simonGame.isPlaying) {
                statusElement.textContent = 'Clique em "Iniciar Jogo" para começar!';
            }
        }
        
        function updateSimonStatus(message) {
            const statusElement = document.getElementById('simon-status');
            if (statusElement) {
                statusElement.textContent = message;
            }
        }
        
        function showSimonMessage(message, type = 'info') {
            const messageElement = document.getElementById('simon-message');
            if (!messageElement) return;
            
            messageElement.textContent = message;
            messageElement.className = `simon-message ${type}`;
            messageElement.style.display = 'block';
        }
        
        function hideSimonMessage() {
            const messageElement = document.getElementById('simon-message');
            if (messageElement) {
                messageElement.style.display = 'none';
            }
        }

        function checkOrientation() {
            const orientationWarning = document.querySelector('.orientation-warning');
            const mainContent = document.querySelector('.main-content');
            
            const isMobilePortrait = window.innerWidth <= 1024 && 
                                   (window.innerHeight > window.innerWidth || 
                                    (window.screen && window.screen.orientation && 
                                     (window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180)));
            
            const isVerySmallDevice = window.innerWidth <= 600;
            
            if (isMobilePortrait && isVerySmallDevice) {
                orientationWarning.style.display = 'flex';
                mainContent.style.display = 'none';
            } else {
                orientationWarning.style.display = 'none';
                mainContent.style.display = 'block';
            }
        }

        window.addEventListener('load', checkOrientation);
        
        window.addEventListener('resize', checkOrientation);
        window.addEventListener('orientationchange', function() {
            setTimeout(checkOrientation, 100);
        });

        if (window.screen && window.screen.orientation) {
            window.screen.orientation.addEventListener('change', function() {
                setTimeout(checkOrientation, 100);
            });
        }

        checkOrientation();

        function handleResize() {
            if (document.getElementById('wordsearch-section').style.display !== 'none') {
                renderWordSearch();
            }
            
            if (document.getElementById('memory-section').style.display !== 'none') {
            }
            
            
            const canvas = document.getElementById('drawing-canvas');
            if (canvas) {
                const screenWidth = window.innerWidth;
                let newWidth, newHeight;
                
                if (screenWidth <= 500) {
                    newWidth = 280;
                    newHeight = 140;
                } else if (screenWidth <= 700) {
                    newWidth = 320;
                    newHeight = 160;
                } else if (screenWidth <= 900) {
                    newWidth = 400;
                    newHeight = 200;
                } else if (screenWidth <= 1200) {
                    newWidth = 450;
                    newHeight = 220;
                } else if (screenWidth <= 1400) {
                    newWidth = 500;
                    newHeight = 240;
                } else {
                    newWidth = 580;
                    newHeight = 280;
                }
                
                if (canvas.width !== newWidth || canvas.height !== newHeight) {
                    const imageData = ctx ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    canvas.style.width = newWidth + 'px';
                    canvas.style.height = newHeight + 'px';
                    
                    if (imageData && ctx) {
                        ctx.putImageData(imageData, 0, 0);
                    }
                }
            }
        }

        window.addEventListener('resize', function() {
            clearTimeout(window.resizeTimeout);
            window.resizeTimeout = setTimeout(handleResize, 250);
        });

        setTimeout(handleResize, 1000);
        }
