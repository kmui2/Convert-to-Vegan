var elements = document.getElementsByTagName('*'); //create an array of all the tag names, hence the *

for (var element of elements) { // for each element within each element

    for (var node of element.childNodes) { //childnodes of each element are a list detailing the tags

        // get text part of the element
        if (node.nodeType === 3) { //node type 3 is text
            var text = node.nodeValue;
            var replacedText = text.replace(/Trump/gi, 'Beef');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    }
}
