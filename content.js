var elements = document.getElementsByTagName('*');

// // var keyString = 'a string',
// //     keyObj = {},
// //     keyFunc = function() {};
//
// setting the values
var veganMap = {
    "egg": "tofu",
    "Egg": "Tofu",
    "milk": "almondmilk",
    "Milk": "Almondmilk"
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

            var nonVegan = node.nodeValue;

            if (veganMap.hasOwnProperty(nonVegan)) {

                var veganOption = veganMap.nonVegan;
                var newRegex = new RegExp(nonVegan,"gi");

                var replacedText = nonVegan.replace(newRegex, veganMap.nonVegan);

                if (replacedText !== nonVegan) {
                    element.replaceChild(document.createTextNode(replacedText), node);
                }

            }
        }
    }
}
//
// THIS WORKS:
// for (var element of elements) {
//
//     for (var node of element.childNodes) {
//
//         // get text part of the element
//         if (node.nodeType === 3) {
//             var text = node.nodeValue;
//             var newRegex = new RegExp("Trump","gi");
//             var replacedText = text.replace(newRegex, 'Beef');
//
//             if (replacedText !== text) {
//                 element.replaceChild(document.createTextNode(replacedText), node);
//             }
//         }
//     }
// }
