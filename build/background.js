// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {

});

// This block is new!
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
});