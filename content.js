var elements = document.getElementsByTagName('*');
var toggle = false;

for (var element of elements) {

    for (var node of element.childNodes) { 

        // get text part of the element
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/Trump/gi, 'Beef');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {file:"SCRIPT.user.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert()"});
  }
});