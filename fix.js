// ==UserScript==
// @name         PickCode ANSI Color Fixer
// @namespace    https://github.com/khanhphxm
// @version      1.0
// @description  A userscript that enables ANSI color and styling support in PickCode, allowing enhanced visibility and formatting of terminal output.
// @author       Khanh Pham
// @match        https://app.pickcode.io/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/khanhphxm/Pickcode-Fix/main/fix.js
// @updateURL    https://raw.githubusercontent.com/khanhphxm/Pickcode-Fix/main/fix.js
// ==/UserScript==

(function () {
    class AnsiToCssParser {
        constructor() {
            this.ansiToCssMap = {
                '0': 'color: initial; background-color: initial; font-weight: normal;',
                '1': 'font-weight: bold;',
                '2': 'opacity: 0.5;',
                '3': 'font-style: italic;',
                '4': 'text-decoration: underline;',
                '5': 'text-decoration: blink;',
                '7': 'filter: invert(100%);',
                '8': 'visibility: hidden;',
                '9': 'text-decoration: line-through;',
                '30': 'color: black;',
                '31': 'color: red;',
                '32': 'color: green;',
                '33': 'color: yellow;',
                '34': 'color: blue;',
                '35': 'color: magenta;',
                '36': 'color: cyan;',
                '37': 'color: white;',
                '39': 'color: initial;',
                '40': 'background-color: black;',
                '41': 'background-color: red;',
                '42': 'background-color: green;',
                '43': 'background-color: yellow;',
                '44': 'background-color: blue;',
                '45': 'background-color: magenta;',
                '46': 'background-color: cyan;',
                '47': 'background-color: white;',
                '49': 'background-color: initial;',
                '90': 'color: #666666;',
                '91': 'color: #FF5555;',
                '92': 'color: #55FF55;',
                '93': 'color: #FFFF55;',
                '94': 'color: #5555FF;',
                '95': 'color: #FF55FF;',
                '96': 'color: #55FFFF;',
                '97': 'color: #FFFFFF;',
                '100': 'background-color: #666666;',
                '101': 'background-color: #FF5555;',
                '102': 'background-color: #55FF55;',
                '103': 'background-color: #FFFF55;',
                '104': 'background-color: #5555FF;',
                '105': 'background-color: #FF55FF;',
                '106': 'background-color: #55FFFF;',
                '107': 'background-color: #FFFFFF;'
            };
        }

        combineSpecialCases(input) {
            return input.replace(/\^\$\[(\d+m)\^\$\[(\d+m)/g, (match, p1, p2) => {
                if (p1 === '0m' || p2 === '0m') {
                    return match;
                }
                return `^$[${p1.slice(0, -1)};${p2}`;
            });
        }

        parse(input) {
            input = this.combineSpecialCases(input);
            let openTags = [];
            return input.replace(/\^\$\[(\d+(;\d+)*)m/g, (match, p1) => {
                const codes = p1.split(';');
                let styles = codes.map(code => this.ansiToCssMap[code] || '').join(' ');
                if (codes.includes('0')) {
                    openTags = [];
                    return '</span>';
                } else {
                    openTags.push(styles);
                    return `<span style="${openTags.join(' ')}">`;
                }
            }).replace(/\^\$\[0m/g, () => {
                openTags = [];
                return '</span>';
            }).replace(/<span style="([^"]*)">/g, (match, styles) => {
                if (!styles.includes('color:')) {
                    styles += ' color: #F1F5F9;';
                }
                return `<span style="${styles}">`;
            }).replace(/^( +)/gm, (match, spaces) => {
                return spaces.replace(/ /g, '&nbsp;');
            });
        }
    }

    class StringToHTMLParser {
        constructor() {
            this.parser = new DOMParser();
        }

        parse(input) {
            return this.parser.parseFromString(input, 'text/html');
        }
    }

    const parser = new AnsiToCssParser();
    let htmlParser = new StringToHTMLParser();

        const targetSelector = 'span.css-1jxf684.r-ubezar.r-135wba7, p.css-1jxf684.r-ubezar.r-135wba7';

    function logMatchingElements(node) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        if (node.matches(targetSelector)) {
            if (node.innerHTML.includes("Starting code")) return;
            let cssString = parser.parse(node.innerHTML);
            let html = htmlParser.parse(cssString);
            node.innerHTML = html.body.innerHTML;

            observeCharacterData(node);
        }

        if (node.querySelectorAll) {
            const matchingDescendants = node.querySelectorAll(targetSelector);
            matchingDescendants.forEach(el => {
                if (el.innerHTML.includes("Starting code")) return;
                let cssString = parser.parse(el.innerHTML);
                let html = htmlParser.parse(cssString);
                el.innerHTML = html.body.innerHTML;

                observeCharacterData(el);
            });
        }
    }

    function observeCharacterData(element) {
        const characterDataObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach(mutation => {
                if (mutation.type === 'characterData') {
                    logMatchingElements(mutation.target.parentNode);
                }
            });
        });

        const characterDataObserverConfig = {
            characterData: true,
            subtree: true
        };

        characterDataObserver.observe(element, characterDataObserverConfig);
    }

    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    logMatchingElements(node);
                });
            }

            if (mutation.type === 'attributes') {
                logMatchingElements(mutation.target);
            }
        });
    });

    const observerConfig = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
        characterData: true
    };

    observer.observe(document.body, observerConfig);

    console.log(`MutationObserver is now monitoring for elements matching: "${targetSelector}"`);
})();