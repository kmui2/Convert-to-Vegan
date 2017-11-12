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
        "turkey" : [
            {"tofurkey" : "1"}
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
    var elements = document.getElementsByTagName('*');
    for (var nonVegan in veganMap) {
        for (var element of elements) {
            for (var node of element.childNodes) {
                // get text part of the element
                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var newRegex = new RegExp('[\w-]*' + nonVegan + '[\w-]*', "gi");
                    var replacedText = text.replace(newRegex, Object.keys(veganMap[nonVegan][0]));

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