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

    // Deshabilitar el botón de evaluar al inicio
    evaluateBtn.disabled = true;
    evaluateBtn.classList.add('opacity-50', 'cursor-not-allowed');

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

                // Añadir un event listener a cada radio button para verificar el estado
                radioInput.addEventListener('change', checkAllQuestionsAnswered);

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
        // Asegurarse de que el botón de evaluar esté deshabilitado al renderizar/reiniciar
        evaluateBtn.disabled = true;
        evaluateBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    // --- Nueva función para verificar si todas las preguntas han sido respondidas ---
    function checkAllQuestionsAnswered() {
        let allAnswered = true;
        quizData.questions.forEach((q, qIndex) => {
            const answered = document.querySelector(`input[name="question-${qIndex}"]:checked`);
            if (!answered) {
                allAnswered = false;
            }
        });

        // Habilitar o deshabilitar el botón de evaluar
        if (allAnswered) {
            evaluateBtn.disabled = false;
            evaluateBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            evaluateBtn.disabled = true;
            evaluateBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    // --- Función para evaluar el cuestionario ---
    function evaluateQuiz() {
        let correctAnswersCount = 0;
        const totalQuestions = quizData.questions.length;

        quizData.questions.forEach((q, qIndex) => {
            const selectedAnswerInput = document.querySelector(`input[name="question-${qIndex}"]:checked`);
            const allAnswerInputs = document.querySelectorAll(`input[name="question-${qIndex}"]`);

            // Deshabilitar todas las opciones de respuesta para esta pregunta
            allAnswerInputs.forEach(input => {
                input.disabled = true;
                // Limpiar clases de evaluación anteriores
                const parentDiv = input.closest('.answer-option');
                if (parentDiv) {
                    parentDiv.classList.remove('correct-answer', 'incorrect-answer');
                }
            });

            if (selectedAnswerInput) {
                const selectedAnswerIndex = parseInt(selectedAnswerInput.value);
                const parentDivOfSelected = selectedAnswerInput.closest('.answer-option');

                // Verificar si la respuesta seleccionada es correcta según los datos JSON
                if (q.answers[selectedAnswerIndex].isCorrect) {
                    correctAnswersCount++;
                    if (parentDivOfSelected) {
                        parentDivOfSelected.classList.add('correct-answer');
                    }
                } else {
                    if (parentDivOfSelected) {
                        parentDivOfSelected.classList.add('incorrect-answer');
                    }
                    
                    // También marcar la respuesta correcta si la seleccionada fue incorrecta
                    q.answers.forEach((answer, index) => {
                        if (answer.isCorrect) {
                            const correctInput = document.getElementById(`q${qIndex}-a${index}`);
                            if (correctInput) {
                                const parentDivOfCorrect = correctInput.closest('.answer-option');
                                if (parentDivOfCorrect) {
                                    parentDivOfCorrect.classList.add('correct-answer');
                                }
                            }
                        }
                    });
                }
            } else {
                // Si no se seleccionó ninguna respuesta, mostrar la correcta
                q.answers.forEach((answer, index) => {
                    if (answer.isCorrect) {
                        const correctInput = document.getElementById(`q${qIndex}-a${index}`);
                        if (correctInput) {
                            const parentDivOfCorrect = correctInput.closest('.answer-option');
                            if (parentDivOfCorrect) {
                                parentDivOfCorrect.classList.add('correct-answer');
                            }
                        }
                    }
                });
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
        
        // Habilitar todas las opciones de respuesta y limpiar clases de evaluación
        quizData.questions.forEach((q, qIndex) => {
            const allAnswerInputs = document.querySelectorAll(`input[name="question-${qIndex}"]`);
            allAnswerInputs.forEach(input => {
                input.disabled = false; // Habilitar input
                const parentDiv = input.closest('.answer-option');
                if (parentDiv) {
                    parentDiv.classList.remove('correct-answer', 'incorrect-answer');
                }
            });
        });

        resultArea.classList.add('hidden'); // Oculta el área de resultados
        resultArea.classList.remove('success', 'fail'); // Elimina las clases de estilo de resultado
        resultMessage.textContent = '';
        scoreDisplay.textContent = '';

        // Deshabilitar el botón de evaluar al reiniciar
        evaluateBtn.disabled = true;
        evaluateBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }

    // --- Event Listeners ---
    evaluateBtn.addEventListener('click', evaluateQuiz);
    resetBtn.addEventListener('click', resetQuiz);

    // Renderizar el cuestionario al cargar la página
    renderQuiz();
});
