document.addEventListener('DOMContentLoaded', () => {
  
    const quizTitle = document.getElementById('quizTitle');     // top heading
    const qText     = document.getElementById('qText');         // question text element
    const choicesDiv= document.getElementById('choices');       // container for choice buttons
    const nextBtn   = document.getElementById('nextBtn');       // Next button
    const submitBtn = document.getElementById('submitBtn');     // Submit button (final)
    const questionBox = document.getElementById('questionBox'); // the card with the question
    const resultArea  = document.getElementById('result');      // result summary area
    const resultText  = document.getElementById('resultText');  // "You scored X of Y"
    const resultDetails = document.getElementById('resultDetails'); // extra detail text
    const retryBtn = document.getElementById('retryBtn');       // retry quiz
    const backToLessonBtn = document.getElementById('backToLessonBtn');
    const homeBtn = document.getElementById('homeBtn');

      // Read which module user selected on the previous page means if it is recycling, water conservation, or biodiversity
  const moduleName = localStorage.getItem('gl_selectedModule');

    // question bank for quiz 

    const questionBank = {
        'Recycling': [
          { q: 'Which of these can usually be recycled?', choices: ['Used tissues', 'Glass bottles', 'Greasy pizza box', 'Wet banana peels'], answer: 1 },
          { q: 'What should you do before recycling a plastic bottle?', choices: ['Crush it and leave cap on', 'Rinse it to remove residue', 'Burn it', 'Put it in a compost bin'], answer: 1 },
          { q: 'Which material saves the most energy when recycled?', choices: ['Paper', 'Glass', 'Aluminum', 'Cardboard'], answer: 2 },
          { q: 'Which of these is contamination for recycling?', choices: ['Empty clean tin can', 'Food-soiled cardboard', 'Clean newspaper', 'Plastic bottle with label'], answer: 1 }
        ],
        'Water Conservation': [
          { q: 'Which action saves the most water?', choices: ['Taking very short showers', 'Fixing a leaking tap', 'Watering plants midday', 'Using a hose to clean the pavement'], answer: 1 },
          { q: 'Turning off the tap while brushing saves about how much per day?', choices: ['10 liters', '100 liters', '1 liter', '500 liters'], answer: 0 },
          { q: 'Which is a water-smart habit for gardens?', choices: ['Water at noon', 'Plant native plants', 'Use freshwater for every cleaning', 'Overwater daily'], answer: 1 },
          { q: 'Harvesting rainwater can be used for:', choices: ['Drinking directly without treatment', 'Household non-potable uses', 'Increasing runoff', 'Removing nutrients from soil'], answer: 1 }
        ],
        'Biodiversity': [
          { q: 'What does biodiversity mean?', choices: ['Only plants in an area', 'Variety of living things', 'Number of humans', 'Amount of water bodies'], answer: 1 },
          { q: 'Which is a threat to biodiversity?', choices: ['Planting native trees', 'Reducing pollution', 'Deforestation', 'Conserving habitats'], answer: 2 },
          { q: 'Why is biodiversity important for medicine?', choices: ['Plants & animals provide compounds used in medicines', 'It increases pollution', 'It reduces oxygen', 'It harms crops'], answer: 0 },
          { q: 'How can you protect local biodiversity?', choices: ['Use lots of pesticides', 'Plant native flowers', 'Dump waste in forests', 'Remove all shrubs'], answer: 1 }
        ]
      };

      // If no module selected or no questions for that module, show friendly fallback
  if (!moduleName || !questionBank[moduleName]) {
    quizTitle.textContent = 'No quiz available';
    qText.textContent = 'Please go back and select a module from the homepage.';
    choicesDiv.innerHTML = '';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';
    return; // stop execution
  }

    // Prepare quiz state
    const questions = questionBank[moduleName]; // array of question objects for this module
    let current = 0;          // current question index
    let score = 0;            // number of correct answers
    let selectedChoice = null;// index of current selected answer (or null)

    // Update quiz title to show which module quiz we are on
  quizTitle.textContent = `${moduleName} — Quiz`;

    // Helper function to render the current question and choices
    function renderQuestion() {
        // reset selection and UI
        selectedChoice = null;
        choicesDiv.innerHTML = ''; // remove old choices
    
        // get the question object for the current index
        const qObj = questions[current];
        // show numbered question text
        qText.textContent = `${current + 1}. ${qObj.q}`;
    
        // create one button per choice
        qObj.choices.forEach((choiceText, idx) => {
          const btn = document.createElement('button');
          btn.className = 'choiceBtn';      // useful for CSS
          btn.type = 'button';
          btn.textContent = choiceText;
          btn.dataset.index = idx;          // store index on the button for later
          // basic inline styling so it's usable immediately — you can move this to CSS
          btn.style.display = 'block';
          btn.style.width = '100%';
          btn.style.margin = '8px 0';
          btn.style.textAlign = 'left';
    
          // clicking a choice: mark selectedChoice and update UI
          btn.addEventListener('click', () => {
            // clear previous visual selection
            Array.from(choicesDiv.children).forEach(c => c.style.background = '');
            // mark this one visually
            btn.style.background = '#d6f7d6';
            selectedChoice = idx;
          });
    
          // append to the choices container
          choicesDiv.appendChild(btn);
        });
    
        // show Next or Submit depending on whether this is the last question
        if (current < questions.length - 1) {
          nextBtn.style.display = 'inline-block';
          submitBtn.style.display = 'none';
        } else {
          nextBtn.style.display = 'none';
          submitBtn.style.display = 'inline-block';
        }
      }
    
      // Next button: validate selection, score, advance
      nextBtn.addEventListener('click', () => {
        if (selectedChoice === null) {
          alert('Please select an answer before continuing.');
          return;
        }
        // if selected is the correct answer, increment score
        if (selectedChoice === questions[current].answer) score += 1;
        // move to next question
        current += 1;
        // render the next question
        renderQuestion();
      });
    
      // Submit button: validate selection, finalize score and show results
      submitBtn.addEventListener('click', () => {
        if (selectedChoice === null) {
          alert('Please select an answer before submitting.');
          return;
        }
        if (selectedChoice === questions[current].answer) score += 1;
        finishQuiz();
      });
    
      // finishQuiz: save results, show summary UI
      function finishQuiz() {
        // prepare result object
        const resultObj = {
          score,
          total: questions.length,
          timestamp: new Date().toISOString()
        };
    
        // read previous results (if any) and update
        const storageKey = 'gl_quizResults';
        let allResults = {};
        try {
          allResults = JSON.parse(localStorage.getItem(storageKey) || '{}');
        } catch (e) {
          // if parse fails, overwrite with fresh object
          allResults = {};
        }
        allResults[moduleName] = resultObj;
        localStorage.setItem(storageKey, JSON.stringify(allResults));
    
        // hide question UI, show result area
        questionBox.style.display = 'none';
        document.getElementById('controls').style.display = 'none';
        resultArea.style.display = 'block';
    
        // display result text
        resultText.textContent = `You scored ${score} out of ${questions.length}`;
        resultDetails.textContent = `Your result has been saved. Great job!`;
      }
    
      // Retry: reset state and show quiz again
      retryBtn.addEventListener('click', () => {
        current = 0;
        score = 0;
        selectedChoice = null;
        resultArea.style.display = 'none';
        questionBox.style.display = 'block';
        document.getElementById('controls').style.display = 'block';
        renderQuestion();
      });
    
      // Back to lesson and Home navigation
      backToLessonBtn.addEventListener('click', () => window.location.href = 'lesson.html');
      homeBtn.addEventListener('click', () => window.location.href = 'index.html');
    
    // initial render
      renderQuestion();

});