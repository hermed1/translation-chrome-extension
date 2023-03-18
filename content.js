chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showTranslation') {
    const translationPopup = document.createElement('div');
    translationPopup.id = 'translation-popup';
    translationPopup.innerHTML = `
      <div id="translation-popup-content">
        <div id="translation">${request.translation}</div>
        <button id="translation-popup-close">Close</button>
      </div>
    `;

    document.body.appendChild(translationPopup);

    document.getElementById('translation-popup-close').addEventListener('click', () => {
      document.body.removeChild(translationPopup);
    });
  }
});

// This code is registering an event listener with the chrome runtime, which will listen for incoming messages. 
// When a message with an action property equal to 'showTranslation' is received, the function passed 
// to the addListener method will be executed.

// Inside this function, a new div element is created and assigned the identifier 'translation-popup'. 
// The HTML content of this element is set using a template literal, which contains a child div element 
// to display the translation result and a button element for closing the popup.

// The new div element is appended as a child node to the body element. An event listener is added to 
// the close button that removes the 'translation-popup' element from the DOM when clicked.

