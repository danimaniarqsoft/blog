document.addEventListener('DOMContentLoaded', () => {
    // Los datos del cuestionario ahora vienen de la variable global 'quizData'
    // que es inyectada por Hugo desde data/quiz.json
    // const quizData = ...; // Esta línea se elimina o comenta

    // Referencias a los elementos del DOM
    const quizTitle = document.getElementById('quiz-title');
    const quizDescription = document.getElementById('quiz-description');
    const quizForm = document.getElementById('quiz-form');
    const evaluateBtn = document.getElementById('evaluate-btn');
    const resetBtn = document.getElementById('reset-btn');
    const resultArea = document.getElementById('result-area');
    const resultMessage = document.getElementById('result-message');
    const scoreDisplay = document.getElementById('score-display');

    // --- Función para renderizar el cuestionario ---
    function renderQuiz() {
        // Asegurarse de que quizData esté disponible
        if (typeof quizData === 'undefined' || !quizData.questions) {
            console.error("Error: quizData no está disponible o no tiene la estructura esperada.");
            quizTitle.textContent = "Error al cargar el cuestionario";
            quizDescription.textContent = "Por favor, verifica el archivo data/quiz.json y la configuración del shortcode.";
            return;
        }

        quizTitle.textContent = quizData.title;
        quizDescription.textContent = quizData.description;
        quizForm.innerHTML = ''; // Limpiar preguntas anteriores

        quizData.questions.forEach((q, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-item'; // Clase para estilos de Tailwind

            const questionText = document.createElement('p');
            questionText.className = 'question-text'; // Clase para estilos de Tailwind
            questionText.textContent = `${qIndex + 1}. ${q.question}`;
            questionDiv.appendChild(questionText);

            q.answers.forEach((a, aIndex) => {
                const answerOptionDiv = document.createElement('div');
                answerOptionDiv.className = 'answer-option'; // Clase para estilos de Tailwind

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.id = `q${qIndex}-a${aIndex}`;
                radioInput.name = `question-${qIndex}`;
                radioInput.value = aIndex; // Guardamos el índice de la respuesta

                const label = document.createElement('label');
                label.htmlFor = `q${qIndex}-a${aIndex}`;
                label.textContent = a.answer;

                answerOptionDiv.appendChild(radioInput);
                answerOptionDiv.appendChild(label);
                questionDiv.appendChild(answerOptionDiv);
            });
            quizForm.appendChild(questionDiv);
        });

        // Ocultar el área de resultados al inicio o al reiniciar
        resultArea.classList.add('hidden');
        resultArea.classList.remove('success', 'fail'); // Limpiar clases de resultado
    }

    // --- Función para evaluar el cuestionario ---
    function evaluateQuiz() {
        let correctAnswersCount = 0;
        const totalQuestions = quizData.questions.length;

        quizData.questions.forEach((q, qIndex) => {
            const selectedAnswer = document.querySelector(`input[name="question-${qIndex}"]:checked`);
            
            if (selectedAnswer) {
                const selectedAnswerIndex = parseInt(selectedAnswer.value);
                // Verificar si la respuesta seleccionada es correcta según los datos JSON
                if (q.answers[selectedAnswerIndex].isCorrect) {
                    correctAnswersCount++;
                }
            }
        });

        const score = (correctAnswersCount / totalQuestions) * 100;
        let message = '';
        let resultClass = '';

        if (score >= 70) {
            message = '¡Felicidades! Su resultado fue exitoso.';
            resultClass = 'success';
        } else {
            message = 'Debe volver a hacer la prueba. ¡Inténtelo de nuevo!';
            resultClass = 'fail';
        }

        resultMessage.textContent = message;
        scoreDisplay.textContent = `Obtuviste ${correctAnswersCount} de ${totalQuestions} respuestas correctas (${score.toFixed(2)}%).`;
        
        resultArea.classList.remove('hidden');
        resultArea.classList.add(resultClass);
    }

    // --- Función para reiniciar el cuestionario ---
    function resetQuiz() {
        quizForm.reset(); // Limpia todas las selecciones de radio buttons
        resultArea.classList.add('hidden'); // Oculta el área de resultados
        resultArea.classList.remove('success', 'fail'); // Elimina las clases de estilo de resultado
        resultMessage.textContent = '';
        scoreDisplay.textContent = '';
    }

    // --- Event Listeners ---
    evaluateBtn.addEventListener('click', evaluateQuiz);
    resetBtn.addEventListener('click', resetQuiz);

    // Renderizar el cuestionario al cargar la página
    renderQuiz();
    console.log("renderizando el quiz");
});
