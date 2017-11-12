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

var replaceWords = function () {
	
		var elements = document.getElementsByTagName('*');
	
		// // var keyString = 'a string',
		// //     keyObj = {},
		// //     keyFunc = function() {};
		//
		// setting the values
		var veganMap = {
			"egg": "tofu",
			"milk": "almondmi1k"
		}
		// // getting the values
		// myMap.get(keyString);    // "value associated with 'a string'"
		// myMap.get(keyObj);       // "value associated with keyObj"
		// myMap.get(keyFunc);      // "value associated with keyFunc"
		//
		// myMap.get('a string');   // "value associated with 'a string'"
		//                          // because keyString === 'a string'
		// myMap.get({});           // undefined, because keyObj !== {}
		// myMap.get(function() {}) // undefined, because ke
	
		for (var element of elements) {
			for (var node of element.childNodes) {
				// get text part of the element
				if (node.nodeType === 3) {
					var textToCheck = node.nodeValue;
					var listToCheck = textToCheck.split(" ");
					for (var listItem in listToCheck) {
						if (veganMap.hasOwnProperty(listToCheck[listItem])) { // is listItem == some key in map
							var veganOption = veganMap.listItem; // get value from map
							var newRegex = new RegExp(listToCheck[listItem], "gi");
							var replacedText = listToCheck[listItem].replace(newRegex, veganMap[listToCheck[listItem]]);
							if (replacedText !== listToCheck[listItem]) {
								element.replaceChild(document.createTextNode(replacedText), node.nodeValue);
							}
						}
					}
				}
			}
		}
	};