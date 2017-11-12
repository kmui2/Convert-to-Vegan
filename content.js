var script = document.createElement('script');
var toggle = false;
var prevToggle = false; // prevents duplicate messages



$.ajax({
    url: 'http://54.245.183.44:7070/getBlogs',
    type: 'GET',
    asynch: false,
    contentType: 'application/json',
    success: function (data) {
        console.log(data);
        let veganMap = {};
        let mapping = data.blogs;
        for (let nonVegan in mapping) {
            veganMap[mapping[nonVegan].title] = mapping[nonVegan].post;
        }
        console.log(veganMap);
        
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
        
        // function convertToVegan() {
        
        //     var elements = document.getElementsByTagName('*');
        //     for (var nonVegan in veganMap) {
        //         for (var element of elements) {
        //             for (var node of element.childNodes) {
        //                 // get text part of the element
        //                 if (node.nodeType === 3) {
        //                     var text = node.nodeValue;
        //                     var newRegex;
        //                     if (nonVegan.includes(" ")) {
        //                         var nonVeganSplitList = nonVegan.split(" ");
        //                         var regexBuilder = '';
        //                         var isFirst = true;
        //                         for (var word of nonVeganSplitList) {
        //                             if (isFirst) {
        //                                 regexBuilder += word;
        //                                 isFirst = false;
        //                             } else {
        //                                 regexBuilder += ' ' + word;
        //                             }
        //                             regexBuilder += 's?';
        //                         }
        //                         newRegex = new RegExp(regexBuilder, "gi");
        //                     } else {
        //                         newRegex = new RegExp('[\\w-]*' + nonVegan + 's?[\\w-]*', "gi");
        //                     }
        //                     var textToInject = veganMap[nonVegan][0];
        //                     // var textToInject = injectedSelect(veganMap[nonVegan]);
        //                     var replacedText = text.replace(newRegex, textToInject);
        
        //                     if (replacedText !== text) {
        //                         element.replaceChild(document.createTextNode(replacedText), node);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }

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
                                // var textToInject = veganMap[nonVegan][0];
                                var textToInject = injectSelect(veganMap[nonVegan]);
                                var replacedText = text.replace(newRegex, textToInject);
                                if (replacedText !== text) {
                                    element.replaceChild(document.createTextNode(replacedText), node);
                                }
                            }
                        }
                    }
                }
            }

        function injectSelect(JSON) {
            var select = document.createElement("SELECT");
             for (var i = 0; i < JSON.length; i++ ) {
                var currOption = document.createTextNode(JSON[i]);
                select.appendChild(currOption);
            }
            return select;
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
    }
})
