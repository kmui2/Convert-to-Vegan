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

		var veganMap  = {
			"milk" : [
				{"soymilk": "1"},
				{"rice milk": "1"},
				{"oat milk": "1"},
				{"hemp milk": "1"},
				{"nut milk": "1"}
			],
			"ricotta" : [
				{"crumbled tofu" : "1"},
				{"soaked raw nuts" : "1"}
			],
			"mozzarella" : [
				{"daiya mozzarella" : "1"}
			],
			"cream cheese" : [
				{"daiya cream cheese" : "1"}
			],
			"cheese" : [
				{"vegan cheese" : "1"}
			],
			"eggs (baking)" : [
				{"applesauce" : "1"},
				{"pureed soft tofu" : "1"},
				{"Ener-G" : "1"},
				{"1 tablespoon ground flax seeds plus 3 tablespoons water or other liquid, blended" : "1"},
				{"mashed bananas" : "1"}
			],
			"eggs (binding)" : [
				{"oat flour" : "1"},
				{"bread crumbs" : "1"},
				{"instant potatoes" : "1"},
				{"tomato paste" : "1"}
			],
			"eggs white" : [
				{"aguafaba" : "1"}
			],
			"beef stock" : [
				{"vegetable stock" : "1"}
			],
			"chicken stock" : [
				{"vegetable stock" : "1"}
			],
			"beef" : [
				{"tofu" : "1"}
			],
			"butter" : [
				{"vegan butter" : "1"},
				{"coconut oil" : "1"}
			],
			"yogurt" : [
				{"vegan yogurt" : "1"}
			],
			"sour cream" : [
				{"vegan yogurt" : "1"},
				{"blended silken yogurt" : "1"}
			],
			"mayonnaise" : [
				{"vegan mayonnaise" : "1"}
			],
			"gelatin" : [
				{"agar" : "1"}
			],
			"honey" : [
				{"maple syrup" : "1"},
				{"agave nectar" : "1"},
				{"molasses" : "1"}
			],
			"chocolate" : [
				{"vegan chocolate" : "1"}
			],
			"ice cream" : [
				{"vegan ice cream" : "1"}
			],
			"cream" : [
				{"full-fat coconut milk" : "1"}
			],
			"beef" : [
				{"eggplant" : "1"},
				{"mushroom" : "1"}
			],
			"pork" : [
				{"jackfruit" : "1"}
			],
			"chicken" : [
				{"tempeh" : "1"}
			],
			"lamb" : [
				{"seitan" : "1"}
			],
			"fish stock" : [
				{"steeped kombu" : "1"}
			]
		}
		
	
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