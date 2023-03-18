function saveOptions() {
  const language = document.getElementById('language').value;
  chrome.storage.sync.set({
    language: language,
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    language: 'fr',
  }, (items) => {
    document.getElementById('language').value = items.language;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('language').addEventListener('change', saveOptions);

// The saveOptions() function retrieves the value of the language dropdown menu, saves it using the 
// chrome.storage.sync.set() method, displays a success message in the status element, and then clears 
// the message after a delay of 2 seconds.
// The restoreOptions() function retrieves the user's preferred language from chrome.storage.sync.get(), 
// and then sets the value of the language select element to the value obtained via items.language.
// The DOMContentLoaded event listener calls restoreOptions() when the web page is loaded.
// The change event listener attached to the language element triggers the saveOptions() function whenever 
// a user changes their language preference.
