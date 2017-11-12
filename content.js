var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js";
script.addEventListener('load', function () {

    var elements = document.getElementsByTagName('*');

    var veganMap = {
        "egg": "tofu",
        "milk": "almondmlk"
    }
    
    for (var element of elements) {
        for (var node of element.childNodes) {
            // get text part of the element
            if (node.nodeType === 3) {
                for (var listItem in veganMap) {
                    var text = node.nodeValue;
                    var veganOption = veganMap[listItem]; // get value from map
                    var newRegex = new RegExp(listItem,"gi");
                    var replacedText = text.replace(newRegex, veganOption);
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }
    }
});
document.head.appendChild(script);
