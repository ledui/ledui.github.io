
var LETTERS = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z'  
]

var NUMBERS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
]

var EXTRA_CORE = [
    [',', "Comma"],
    ['?', "Question Mark"],
    ['!', "Exclamation Mark"]
]

var SYMBOLS = [
    ['+', "Plus/Add"],
    ['-', "Hypen/minus"],
    ['=', "Equals"],
    ['/', "Slash or divide i.e dot line dot: ÷"],
    ['*', "Asterisk/multiply"],
    ['.', "Full stop/period"],
    ['%', "Percent"],
    ["'", "Single Quote/Apostrophe"],
    ['"', "Double Quote"],
    [':', "Colon"],
    [';', "Semi Colon"],
    ['@', "At Sign"],
    ['(', "Open Parenthesis"],
    [')', "Close Parenthesis"],
    ['_', "Underscore"],
    ['$', "Dollar sign"],
    ['>', "Greater than"],
    ['#', "Number sign/Hash"],
    ['<', "Less than"],
    ['&', "Ampersand"],
    ['\\', "Back Slash"],
    ['^', "Caret"],
    ['`', "Grave accent/backtick"],
    ['|', "Vertical bar"],
    ['~', "Tilde"],
    ['{', "Open brace/curly bracket"],
    ['}', "Close brace/curly bracket"],
    ['[', "Open Square brackets"],
    [']', "Close Square brackets"],
    ['£', "Pound Sign"],
    ['€', "Euro sign)"]
]

var DIACRITICS = [
    ['ß', "sharp s"],
    ['ä', "a with diaeresis"],
    ['ö', "o with diaeresis"],
    ['ü', "u with diaeresis"],
    ['ï', "i with diaeresis"],
    ['ë', "e with diaeresis"],
    ['ÿ', "y with diaeresis"],
    ['é', "e with acute accent"],
    ['à', "a with grave accent"],
    ['è', "e with grave accent"],
    ['ù', "u with grave accent"],
    ['â', "a with circumflex"],
    ['ê', "e with circumflex"],
    ['î', "i with circumflex"],
    ['ô', "o with circumflex"],
    ['û', "u with circumflex"],
    ['ç', "c with cedilla"],
    ['í', "i with acute accent"],
    ['ú', "u with acute accent"],
    ['ó', "o with acute accent"],
    ['á', "a with acute accent"],
    ['å', "a with ring"],
    ['ñ', "n with virgulilla"],
    ['ã', "a with virgulilla"],
    ['õ', "o with virgulilla"],
    ['¿', "Inverted question mark"],
    ['¡', "Inverted exclamation point"],
    ['ø', "o with stroke"],
    ['ý', "y with acute accent"],
    ['ò', "o with grave accent"],
    ['ì', "i with grave accesnt"],
    ['æ', "ash [ae ligature]"],
    ['ð', "eth"],
    ['þ', "thorn"]
]


var DICTIONARY = (function () {
    return {
        setup_dictionary: function() {
    
            for (i = 0; i < 26; i++) {
                GREEN.display_character(LETTERS[i], "letters");
            }
            for (i = 0; i < 10; i++) {
                GREEN.display_character(NUMBERS[i], "numbers");
            }

            // (character, colours, identifier, wide, altcaption, title)
            GREEN.display_character(' ', "whitespace", false, " ")
            GREEN.display_character('\n', "newline", false, " ")
            GREEN.display_character(EXTRA_CORE[0][0], "comma", false, null, EXTRA_CORE[0][1]);
            GREEN.display_character(EXTRA_CORE[1][0], "question", false, null, EXTRA_CORE[1][1]);
            GREEN.display_character(EXTRA_CORE[2][0], "exclamation", false, null, EXTRA_CORE[2][1]);
            
            
            for (i = 0; i < 31; i++) {
                GREEN.display_character(SYMBOLS[i][0], "symbols", false, null, SYMBOLS[i][1]);
            }

            for (i = 0; i < 34; i++) {
                GREEN.display_character(DIACRITICS[i][0], "diacritics", false, null, DIACRITICS[i][1]);
            }
            
        },
    }
})();


$(function() {
    DICTIONARY.setup_dictionary();
});
