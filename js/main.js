//wait for html page to fully laoded before running this script 
document.addEventListener("DOMContentLoaded", () => {
  
    // Select all buttons that have the data-module attribute
    const buttons = document.querySelectorAll("button[data-module]");
  
    // Loop through each button
    buttons.forEach(button => {
      
      // Add a click event listener to each button
      button.addEventListener("click", () => {
        
        // Get the value of the data-module attribute (like "Recycling")
        const moduleName = button.dataset.module;
  
        // Save it in localStorage so we can use it on the next page
        localStorage.setItem("gl_selectedModule", moduleName);
  
        //  Navigate to the lesson page
        window.location.href = "lesson.html";
      });
    });
  });
  