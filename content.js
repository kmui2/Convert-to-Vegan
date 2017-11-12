var elements = document.getElementsByTagName('*');

var veganMap = {
    "egg": "tofu",
    "milk": "almondmlk"
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
                    var newRegex = new RegExp(listToCheck[listItem],"gi");
                    var replacedText = listToCheck[listItem].replace(newRegex, veganMap[listToCheck[listItem]]);
                    if (replacedText !== listToCheck[listItem]) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
}
