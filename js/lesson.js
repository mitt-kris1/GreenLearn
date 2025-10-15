document.addEventListener('DOMContentLoaded', () => {
    const titleEl = document.getElementById('moduleTitle');
    const textEl  = document.getElementById('lessonText');
    const backBtn = document.getElementById('backBtn');
    const quizBtn = document.getElementById('startQuizBtn');
  
    // 1. Read the selected module from localStorage
    const selected = localStorage.getItem('gl_selectedModule');
  
    // 2. Simple lessons map (you can expand / move to JSON later)
    const lessons = {
      'Recycling':
       `
      <h2>What is Recycling?</h2>
      <p>Recycling is the process of collecting and processing materials that would otherwise be thrown away as trash, and turning them into new products. It helps reduce pollution, saves energy, and conserves natural resources like wood, water, and minerals.</p>

      <h3>Why Recycling Matters</h3>
      <ul>
        <li><b>Reduces landfill waste:</b> Every bottle, can, or box recycled means less garbage in landfills.</li>
        <li><b>Saves energy:</b> Recycling aluminum saves up to 95% of the energy needed to make new aluminum.</li>
        <li><b>Protects wildlife:</b> Less waste in landfills means fewer toxins entering soil and water.</li>
        <li><b>Fights climate change:</b> Recycling reduces greenhouse gas emissions from production and waste decomposition.</li>
      </ul>

      <h3>How to Recycle Correctly</h3>
      <ol>
        <li>Separate waste properly — dry (paper, plastic, metal) and wet (food, organic).</li>
        <li>Rinse containers to remove food residue.</li>
        <li>Avoid contamination — don’t mix plastics with food waste.</li>
        <li>Check local recycling rules — every city has different guidelines.</li>
        <li>Reuse creatively — turn jars into containers or old t-shirts into cleaning cloths.</li>
      </ol>

      <p><b>Fun Fact:</b> Recycling one aluminum can saves enough energy to power a TV for 3 hours!</p>
    `,

    'Water Conservation': `
      <h2>Why Saving Water Matters</h2>
      <p>Water is one of Earth’s most precious resources — yet billions of people face water shortages every year. Conserving water ensures everyone has enough for drinking, farming, and sanitation.</p>

      <h3>The Problem</h3>
      <ul>
        <li>Only <b>2.5%</b> of Earth’s water is fresh water.</li>
        <li>Less than <b>1%</b> is easily accessible for humans.</li>
        <li>Many cities face droughts due to overuse and pollution.</li>
      </ul>

      <h3>How You Can Save Water</h3>
      <ol>
        <li>Fix leaks — a dripping tap can waste 20 liters a day.</li>
        <li>Turn off taps while brushing to save up to 10 liters daily.</li>
        <li>Use buckets instead of hoses — washing cars this way saves hundreds of liters.</li>
        <li>Plant native plants — they need less watering.</li>
        <li>Harvest rainwater — collect rain in tanks for household use.</li>
      </ol>

      <h3>Smart Water Habits</h3>
      <ul>
        <li>Use water-efficient fixtures (low-flow taps and showerheads).</li>
        <li>Reuse greywater from laundry for gardening.</li>
        <li>Encourage schools to install automatic taps.</li>
      </ul>

      <p><b>Fun Fact:</b> It takes 2,700 liters of water to make one cotton T-shirt — that’s enough drinking water for one person for 900 days!</p>
    `,

    'Biodiversity': `
      <h2>What is Biodiversity?</h2>
      <p>Biodiversity means the variety of living things on Earth — plants, animals, fungi, and even tiny microbes. Every organism plays an important role in keeping ecosystems healthy and balanced.</p>

      <h3>Why Biodiversity is Important</h3>
      <ul>
        <li><b>Food security:</b> Diverse crops resist pests and diseases.</li>
        <li><b>Medicine:</b> Over 50% of modern medicines come from plants and animals.</li>
        <li><b>Climate balance:</b> Forests absorb CO₂ and produce oxygen.</li>
        <li><b>Cultural value:</b> Nature inspires art, traditions, and tourism.</li>
      </ul>

      <h3>Major Threats to Biodiversity</h3>
      <ol>
        <li>Deforestation — cutting trees for land or wood.</li>
        <li>Pollution — chemicals harm plants and animals.</li>
        <li>Climate change — shifts in temperature and rainfall disrupt ecosystems.</li>
        <li>Overfishing & hunting — destroys natural balance.</li>
        <li>Invasive species — non-native species displace native ones.</li>
      </ol>

      <h3>How You Can Protect It</h3>
      <ul>
        <li>Plant native trees and flowers.</li>
        <li>Avoid littering and single-use plastics.</li>
        <li>Support local farmers who use sustainable practices.</li>
        <li>Educate others about protecting wildlife.</li>
      </ul>

      <p><b>Fun Fact:</b> A single tree can be home to over 500 species of insects, birds, fungi, and plants!</p>
    `
    };
  
    // 3. If a module was selected, show it; otherwise show fallback
    if (selected && lessons[selected]) {
      titleEl.textContent = selected;
      textEl.innerHTML  = lessons[selected];
    } else if (selected) {
      // selected but no lesson content found — show name and a generic message
      titleEl.textContent = selected;
      textEl.textContent  = 'Welcome! This module does not yet have published content. Check back soon or choose another module.';
    } else {
      // nothing selected — friendly fallback
      titleEl.textContent = 'No module selected';
      textEl.textContent  = 'Please go back to the homepage and choose a module to begin.';
      // optionally redirect back after a few seconds:
      // setTimeout(() => window.location.href = 'index.html', 3000);
    }
  
    // 4. Back button behavior
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    // 5. Quiz button behavior — goes to quiz.html (we'll create soon)
    quizBtn.addEventListener('click', () => {
      // store current module again (optional)
      if (selected) localStorage.setItem('gl_selectedModule', selected);
      // navigate to quiz page
      window.location.href = 'quiz.html';
    });
  });
  