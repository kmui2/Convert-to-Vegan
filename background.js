
// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
	var context = "selection";
	var title = "Convert to vegan";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context],
										   "id": "convertToVegan"});  
});
  
// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);
  
// The onClicked callback function.
function onClickHandler(info, tab) {
	var elements = window.getSelection();
	var sText = info.selectionText;
	for (var nonVegan in veganMap) {
		var newRegex;
		if (nonVegan.includes(" ")) {
			var nonVeganSplitList = nonVegan.split(" ");
			var regexBuilder = '';
			var isFirst = true;
			for (var word of nonVeganSplitList) {
				if (isFirst) {
					regexBuilder += word;
					isFirst = false;
				} else {
					regexBuilder += ' ' + word;
				}
				regexBuilder += 's?';
			}
			newRegex = new RegExp(regexBuilder, "gi");
		} else {
			newRegex = new RegExp('[\\w-]*' + nonVegan + 's?[\\w-]*', "gi");
		}
		var replacedText = sText.replace(newRegex, veganMap[nonVegan][0]);

		if (replacedText !== sText) {
			textdocument.createTextNode(replacedText, elements);
		}
	}
};

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
