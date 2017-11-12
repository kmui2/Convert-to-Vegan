var toggle = false;
chrome.browserAction.onClicked.addListener(function(tab) {
	toggle = !toggle;
	if(toggle){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {toggle: true}, function(response) {
				console.log(toggle);
			});
		});
		chrome.browserAction.setIcon({path: "on.png", tabId:tab.id}); //on
		chrome.tabs.executeScript(tab.id, replaceWords);
	}
	else{
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {toggle: false}, function(response) {
				console.log(toggle);
			});
		});
		chrome.browserAction.setIcon({path: "off.png", tabId:tab.id}); //off
		//chrome.tabs.executeScript(tab.id, {code:"alert()"});
	}
});
