document.addEventListener('DOMContentLoaded', function() {
    const calculateLink = document.getElementById('calculate-link');
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('result-text');
    const form = document.getElementById('progress-form');
    
    // Функция для вычисления n-го члена прогрессии
    function calculateNthTerm(a1, d, n) {
        return a1 + (n - 1) * d;
    }
    
    // Функция для проверки и вычисления результата
    function calculateAndDisplayResult() {
        const a1 = parseFloat(document.getElementById('first-term').value);
        const d = parseFloat(document.getElementById('difference').value);
        const n = parseInt(document.getElementById('term-number').value);
        
        // Проверка заполнения полей
        if (isNaN(a1) || isNaN(d) || isNaN(n)) {
            resultText.textContent = 'Пожалуйста, заполните все поля корректными числами';
            resultDiv.className = 'calculation-result error';
            resultDiv.style.display = 'block';
            return;
        }
        
        // Проверка, что n - целое положительное число
        if (n < 1) {
            resultText.textContent = 'Номер члена прогрессии (n) должен быть положительным целым числом';
            resultDiv.className = 'calculation-result error';
            resultDiv.style.display = 'block';
            return;
        }
        
        // Вычисление результата
        const result = calculateNthTerm(a1, d, n);
        
        // Отображение результата с пошаговым решением
        resultText.innerHTML = `
            <strong>${n}-й член арифметической прогрессии:</strong><br>
            a₁ = ${a1}, d = ${d}<br>
            aₙ = a₁ + (n - 1) × d<br>
            a${n} = ${a1} + (${n} - 1) × ${d}<br>
            a${n} = ${a1} + ${n-1} × ${d}<br>
            <strong>a${n} = ${result}</strong>
        `;
        resultDiv.className = 'calculation-result';
        resultDiv.style.display = 'block';
    }
    
    // Обработчик наведения на ссылку
    calculateLink.addEventListener('mouseover', calculateAndDisplayResult);
    
    // Обработчик клика на ссылку (на случай, если пользователь захочет кликнуть)
    calculateLink.addEventListener('click', function(e) {
        e.preventDefault();
        calculateAndDisplayResult();
    });
    
    // Сброс результата при изменении полей формы
    form.addEventListener('input', function() {
        resultDiv.style.display = 'none';
    });
    
    // Предотвращение отправки формы при нажатии Enter
    form.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateAndDisplayResult();
        }
    });
});