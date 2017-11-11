var toggle = false;

chrome.browserAction.onClicked.addListener(function(tab) {
	toggle = !toggle;
	if(toggle){
		chrome.browserAction.setIcon({path: "on.png", tabId:tab.id}); //on
		chrome.tabs.executeScript(tab.id, {file:"content.js"});
	}
	else{
		chrome.browserAction.setIcon({path: "off.png", tabId:tab.id}); //off
		chrome.tabs.executeScript(tab.id, {code:"alert()"});
	}
});