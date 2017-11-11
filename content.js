var elements = document.getElementsByTagName('*');

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