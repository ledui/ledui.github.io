
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
    ['*', "Asterisk/multiply"]
]


var WHITE = (function () {
    return {
        setup_dictionary: function() {
            //GREEN.display_white('a', "letters", true);
            for (i = 0; i < 26; i++) {
                GREEN.display_white(LETTERS[i], "letters");
            }

            GREEN.display_white(' ', "extra-core", false, "space")
            GREEN.display_white('\n', "extra-core", false, "newline")

            for (i = 0; i < 3; i++) {
                GREEN.display_white(EXTRA_CORE[i][0], "extra-core");
            }

            for (i = 0; i < 10; i++) {
                GREEN.display_white(NUMBERS[i], "numbers");
            }
            for (i = 0; i < 5; i++) {
                GREEN.display_white(SYMBOLS[i][0], "symbols");
            }

        },
    }
})();

$(function() {
    WHITE.setup_dictionary();
});
