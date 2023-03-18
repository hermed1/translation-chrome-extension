//This function retrieves user settings from local storage.
function getUserSettings(callback) {
  chrome.storage.sync.get(['language'], (result) => {
    callback({
      language: result.language || 'fr',
    });
  });
}


//This function takes text as a parameter along with targetLanguage and then trys to call Google API for translation
function getTranslation(text, targetLanguage, callback) {
  console.log('Translating text:', text);
  const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.responseData && data.responseData.translatedText) { //if we have received the requested data
        callback(data.responseData.translatedText); //respond with callback and transalted text 
      } else {
        console.error('Translation error:', data); //Display errors if occurs...
        callback('Error: Could not translate the text.'); //Providing general response in case of error. 
      }
    })
    .catch(error => {
      console.error('Translation API error:', error); //If any error happens while calling the API...
      callback('Error: Could not connect to the translation API.'); //Providing general response in case of error. 
    });
}



//This will be called when extension is being installed... Hence It creates an item in context menus
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translate', //defining its ID
    title: 'Translate', //title shown on right click menu
    contexts: ['selection'] //defines that it should only appear when some text is selected... 
  });
});

//listening to the event when a user selects the added contextMenu item(translate). 
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'translate') {  //matching the contextMenu ID...
    getUserSettings((userSettings) => {
      console.log('User settings:', userSettings);
      getTranslation(info.selectionText, userSettings.language, (translation) => { //calling our custon translation method.
        chrome.tabs.sendMessage(tab.id, { action: 'showTranslation', translation: translation }); //return translated text and message that showspopup.
      });
    });
  }
});
