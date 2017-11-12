var script = document.createElement('script');
var toggle = false;
var prevToggle = false; // prevents duplicate messages
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        toggle = request.toggle;
        if (toggle != prevToggle) {
            if (toggle) {
                convertToVegan();
            }
            else {
                convertBack();
            }
        }
        prevToggle = toggle;
        console.log(toggle);
        sendResponse({ toggle: toggle });
    }
);

function convertToVegan() {
    var elements = document.getElementsByTagName('*');

    // setting the values
    var veganMap = {
        "egg": "tofu",
        "milk": "almondmlk"
    }
    var elements = document.getElementsByTagName('*');
    for (var nonVegan in veganMap) {
        for (var element of elements) {
            for (var node of element.childNodes) {
                // get text part of the element
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var newRegex = new RegExp('[\w-]*' + nonVegan + '[\w-]*', "gi");
                    var replacedText = text.replace(newRegex, veganMap[nonVegan]);

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
}

function convertBack() {
    var elements = document.getElementsByTagName('*');

    // setting the values
    var veganMap = {
        "egg": "tofu",
        "milk": "almondmilk"
    }
    var elements = document.getElementsByTagName('*');
    for (var nonVegan in veganMap) {
        for (var element of elements) {
            for (var node of element.childNodes) {
                // get text part of the element
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var newRegex = new RegExp('[\w-]*' + veganMap[nonVegan] + '[\w-]*', "gi");
                    var replacedText = text.replace(newRegex, nonVegan);

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }

    }
}