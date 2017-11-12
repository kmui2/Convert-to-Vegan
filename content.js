var script = document.createElement('script');
var toggle = false;
var prevToggle = false; // prevents duplicate messages

// setting the values
var veganMap  = {
    "milk" : [
        "soymilk",
        "rice milk",
        "oat milk",
        "hemp milk",
        "nut milk"
    ],
    "ricotta" : [
        "crumbled tofu" ,
        "soaked raw nuts" 
    ],
    "mozzarella" : [
        "daiya mozzarella" 
    ],
    "cream cheese" : [
        "daiya cream cheese" 
    ],
    "cheese" : [
        "vegan cheese" 
    ],
    "egg yolk" : [
        "olive oil" 
    ],
    "egg white" : [
        "aguafaba" 
    ],
    "egg" : [
        "applesauce" ,
        "pureed soft tofu" ,
        "Ener-G" ,
        "1 tablespoon ground flax seeds plus 3 tablespoons water or other liquid, blended" ,
        "mashed bananas" 
    ],
    "eggs (binding)" : [
        "oat flour" ,
        "bread crumbs" ,
        "instant potatoes" ,
        "tomato paste" 
    ],
    "beef stock" : [
        "vegetable stock" 
    ],
    "chicken stock" : [
        "vegetable stock" 
    ],
    "beef" : [
        "tofu" 
    ],
    "butter" : [
        "vegan butter" ,
        "coconut oil" 
    ],
    "yogurt" : [
        "vegan yogurt" 
    ],
    "sour cream" : [
        "vegan yogurt" ,
        "blended silken yogurt" 
    ],
    "mayonnaise" : [
        "vegan mayonnaise" 
    ],
    "gelatin" : [
        "agar" 
    ],
    "honey" : [
        "maple syrup" ,
        "agave nectar" ,
        "molasses" 
    ],
    "chocolate" : [
        "vegan chocolate" 
    ],
    "ice cream" : [
        "vegan ice cream" 
    ],
    "cream" : [
        "full-fat coconut milk" 
    ],
    "beef" : [
        "eggplant" ,
        "mushroom" 
    ],
    "turkey" : [
        "tofurkey" 
    ],
    "pork" : [
        "jackfruit" 
    ],
    "chicken" : [
        "tempeh" 
    ],
    "lamb" : [
        "seitan" 
    ],
    "fish stock" : [
        "steeped kombu" 
    ]
}

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
    for (var nonVegan in veganMap) {
        for (var element of elements) {
            for (var node of element.childNodes) {
                // get text part of the element
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
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
                    var replacedText = text.replace(newRegex, veganMap[nonVegan][0]);

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
    for (var nonVegan in veganMap) {
        for (var element of elements) {
            for (var node of element.childNodes) {
                // get text part of the element
                if (node.nodeType === 3) {

                    var text = node.nodeValue;
                    var newRegex;
                    if (veganMap[nonVegan][0].includes(" ")) {
                        var veganSplitList = veganMap[nonVegan][0].split(" ");
                        var regexBuilder = '';
                        var isFirst = true;
                        for (var word of veganSplitList) {
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
                        newRegex = new RegExp('[\\w-]*' + veganMap[nonVegan][0] + 's?[\\w-]*', "gi");
                    }
                    var replacedText = text.replace(newRegex, nonVegan);

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }
            }
        }

    }
}