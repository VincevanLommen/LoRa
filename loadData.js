async function loadContent(url, targetElementId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        const targetElement = document.getElementById(targetElementId);
        targetElement.innerHTML = data;

         // Extract all script tags from the loaded content:
        const scripts = Array.from(targetElement.querySelectorAll("script"));

       // Create and append new script tags to the page:
        scripts.forEach(script => {
           const newScript = document.createElement('script');
            if(script.src){
              newScript.src = script.src;
            }else{
              newScript.textContent = script.textContent;
            }
          targetElement.parentNode.appendChild(newScript);
        });
    } catch (error) {
        console.error(`Could not load content from ${url}:`, error);
    }
}
loadContent('narBar.html', 'navBar-placeholder');