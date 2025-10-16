// Находим поле ввода
const inputField = document.querySelector('input[type="text"], textarea, [contenteditable="true"]');

// Полный текст урока со ВСЕМИ частями
const fullText = `THE KANGAROO.
"Well," said little Herbert Joyce, as he looked over the books of drawings which his cousin had just brought home from Australia, "I never saw anything so extraordinary before in all my life; why here is an animal with three heads, and two of them are very low down, and much smaller than the others."
"What do you mean, Herbert?" asked his cousin, who just then came into the room.
"There are no three-headed animals - let me see the picture. Oh! No wonder you were puzzled; it does look like a queer creature.
That is a kangaroo, and the small heads belong to her children, whom she carries about in a bag formed by a hole in her skin, until they are old enough to walk; and the little things seem very happy there; and sometimes, as their mother moves along over the grass, you may see them nibbling it."`;

// Функция для реалистичной имитации нажатий
function realisticTyping(text, element, delay = 1) {
    let index = 0;
    let isFirstChar = true;
    
    function typeNextChar() {
        if (index < text.length) {
            const char = text[index];
            
            // Пропускаем пробел в самом начале если нужно
            if (isFirstChar && char === ' ') {
                index++;
                typeNextChar();
                return;
            }
            isFirstChar = false;
            
            // Для Enter - специальная обработка
            if (char === '\n') {
                // Ждем пока система покажет Enter для нажатия
                setTimeout(() => {
                    const enterEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        bubbles: true
                    });
                    element.dispatchEvent(enterEvent);
                    
                    // Также добавляем в значение
                    element.value += '\n';
                    element.dispatchEvent(new Event('input', {bubbles: true}));
                    
                    index++;
                    setTimeout(typeNextChar, delay);
                }, 1000);
                return;
            }
            
            // Для обычных символов - полная имитация
            console.log('Нажимаем:', char);
            
            // 1. KeyDown
            const keyDownEvent = new KeyboardEvent('keydown', {
                key: char,
                code: getKeyCode(char),
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            
            // 2. KeyPress
            const keyPressEvent = new KeyboardEvent('keypress', {
                key: char,
                code: getKeyCode(char),
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            
            // 3. Добавляем символ
            element.value += char;
            
            // 4. Input событие
            const inputEvent = new Event('input', { bubbles: true });
            
            // 5. KeyUp
            const keyUpEvent = new KeyboardEvent('keyup', {
                key: char,
                code: getKeyCode(char),
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true,
                cancelable: true
            });
            
            // Диспатчим все события
            element.dispatchEvent(keyDownEvent);
            element.dispatchEvent(keyPressEvent);
            element.dispatchEvent(inputEvent);
            element.dispatchEvent(keyUpEvent);
            
            index++;
            setTimeout(typeNextChar, delay);
            
        } else {
            console.log('✅ Весь урок завершен!');
        }
    }
    
    element.focus();
    typeNextChar();
}

function getKeyCode(char) {
    if (char === ' ') return 'Space';
    if (char === '\n') return 'Enter';
    if (char === '.') return 'Period';
    if (char === ',') return 'Comma';
    if (char === "'") return 'Quote';
    if (char === '"') return 'Quote';
    if (char === '!') return 'Digit1';
    if (char === '?') return 'Slash';
    if (char === ':') return 'Semicolon';
    if (char === '-') return 'Minus';
    if (char === ';') return 'Semicolon';
    if (/[a-zA-Z]/.test(char)) return 'Key' + char.toUpperCase();
    return 'Key' + char.toUpperCase();
}

// Запускаем с задержкой чтобы система была готова
setTimeout(() => {
    realisticTyping(fullText, inputField, 80);
}, 1000);
