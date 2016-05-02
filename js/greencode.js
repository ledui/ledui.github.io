var SHORT_CODE = {
    "\n": "._._",
    " ": "    ",
    "!": "---.",
    "\"": "&-- ",
    "#": "&.  ",
    "$": "&-.-",
    "%": "&.-.",
    "&": "&...",
    "'": "&-  ",
    "(": "&---",
    ")": "&--.",
    "*": "#-.-",
    "+": "#--.",
    ",": "----",
    "-": "#-- ",
    ".": "&   ",
    "/": "#.-.",
    "0": "#   ",
    "1": "#.  ",
    "2": "#.. ",
    "3": "#...",
    "4": "#.- ",
    "5": "#-  ",
    "6": "#-. ",
    "7": "#-..",
    "8": "#..-",
    "9": "#.--",
    ":": "&.. ",
    ";": "&.- ",
    "<": "&..-",
    "=": "#---",
    ">": "&-..",
    "?": "..--",
    "@": "&.--",
    "[": "^.  ",
    "\\": "^.-.",
    "]": "^.. ",
    "^": "^   ",
    "_": "&-. ",
    "`": "^-  ",
    "a": ".-  ",
    "b": "-...",
    "c": "-.-.",
    "d": "-.. ",
    "e": ".   ",
    "f": "..-.",
    "g": "--. ",
    "h": "....",
    "i": "..  ",
    "j": ".---",
    "k": "-.- ",
    "l": ".-..",
    "m": "--  ",
    "n": "-.  ",
    "o": "--- ",
    "p": ".--.",
    "q": "--.-",
    "r": ".-. ",
    "s": "... ",
    "t": "-   ",
    "u": "..- ",
    "v": "...-",
    "w": ".-- ",
    "x": "-..-",
    "y": "-.--",
    "z": "--..",
    "{": "^-.-",
    "|": "^-- ",
    "}": "^-..",
    "~": "^-. ",
    "¡": "=--.",
    "£": "^--.",
    "¿": "=..-",
    "ß": "^...",
    "à": ";.- ",
    "á": "=.- ",
    "â": ";.--",
    "ã": "=.. ",
    "ä": "^.- ",
    "å": "=-.-",
    "æ": "=-  ",
    "ç": ";-.-",
    "è": ";.. ",
    "é": ";.  ",
    "ê": ";...",
    "ë": ";-. ",
    "ì": "=.-.",
    "í": ";.-.",
    "î": ";-..",
    "ï": ";-- ",
    "ð": "=.--",
    "ñ": "=-. ",
    "ò": "=.  ",
    "ó": "=...",
    "ô": ";--.",
    "õ": "=---",
    "ö": "^---",
    "ø": "=-- ",
    "ù": ";..-",
    "ú": ";   ",
    "û": ";-  ",
    "ü": "^..-",
    "ý": "=-..",
    "þ": "=   ",
    "ÿ": ";---",
    "€": "^.--"
};

var COLOURS = {
    ' ': "off",
    '.': "blue",
    '-': "red",
    '#': "green",
    '&': "yellow",
    '^': "purple",
    ';': "orange",
    '=': "cyan"
};



var GREEN = (function () {
    return {
        display_character: function (character, row_no, wide) {
            var colours = GREEN.get_green_code(character)
            GREEN.create_cell(character, colours, row_no, wide)
        },
        get_green_code: function(character) {
            var short_code = SHORT_CODE[character]
            var i, colour;
            var colours = [];
            for (var i = 0; i < 4; i++) {
                colour = COLOURS[short_code[i]];
                colours.push(colour);
            }
            return colours;
        },
        get_green_word: function (word) {
            var i, len, characters, colour, colours, context, character;
            len = word.length;
            character_contexts = [];
            for (i = 0; i < len; i++) {
                character = word[i];
                colours = GREEN.get_green_code(character);
                context = {character: character,
                           colours: colours};
                character_contexts.push(context);
            }
            return character_contexts;

        },
        rotate_context: function(contexts) {
            // Turn the Matrix 90 degrees, e.g. for display on the web.
            var len, rows, i, j, pos;
            len = contexts.length;
            // There are only ever 4 lights
            rows = [[], [], [], []];
            // Turn it around to row and cells
            for (i = 0; i < len; i++) {
                for  (j = 0; j < 4; j++) {
                    if (i == 0 && j == 0) {
                        pos = 'tl';
                    } else if (i == 0 && j == 3) {
                        pos = 'bl';
                    } else if (i == (len - 1) && j == 0) {
                        pos = 'tr';
                    } else if (i == (len - 1) && j == 3) {
                        pos = 'br';
                    } else if (i == 0) {
                        pos = 'l';
                    } else if (i == (len + 1)) {
                        pos = 'r';
                    } else if (j == 0) {
                        pos = 'tm';
                    } else if (j == 3) {
                        pos = 'bm';
                    } else {
                        pos = 'm';
                    }
                    rows[j].push({colour: contexts[i].colours[j], pos: pos});
                }
            }
            return rows;
        },
        display_word: function(word, identifier, wide) {
            var contexts, rows, i, j;
            contexts = GREEN.get_green_word(word);
            rows = GREEN.rotate_context(contexts);
            var context = {'rows': rows,
                           'word': word,
                           'wide': wide}
            var source   = $("#greenword-template").html();
            var template = Handlebars.compile(source);
            var html = template(context);
            element = $('#' + identifier);
            element.append(html);
        },
        create_cell: function(character, colours, identifier, wide) {
            if (character == ' ') {
                character = "(space)";
            }
            var context = {character: character,
                           colours: colours,
                           wide:wide}
            var source   = $("#greencode-template").html();
            var template = Handlebars.compile(source);
            var html = template(context);
            var row = $('#' + identifier);
            row.append(html)
        },
        setup_intro: function() {
            GREEN.display_character('h', 'row5', true);
            GREEN.display_character(' ', 'basics-0', true);
            GREEN.display_character('e', 'basics-1', true);
            GREEN.display_character('t', 'basics-2', true);
            GREEN.display_character('a', 'basics-3', true);
            GREEN.display_word('sos', 'rowsos', true);
            GREEN.display_character('0', 'digits-row');
            GREEN.display_character('1', 'digits-row');
            GREEN.display_character('2', 'digits-row');
            GREEN.display_character('3', 'digits-row');
            GREEN.display_character('4', 'digits-row');
            GREEN.display_character('5', 'digits-row');
            GREEN.display_character('6', 'digits-row');
            GREEN.display_character('7', 'digits-row');
            GREEN.display_character('8', 'digits-row');
            GREEN.display_character('9', 'digits-row');
            GREEN.display_character('a', 'letters-0');
            GREEN.display_character('b', 'letters-0');
            GREEN.display_character('c', 'letters-0');
            GREEN.display_character('d', 'letters-0');
            GREEN.display_character('e', 'letters-0');
            GREEN.display_character('f', 'letters-0');
            GREEN.display_character('g', 'letters-0');
            GREEN.display_character('h', 'letters-0');
            GREEN.display_character('i', 'letters-0');
            GREEN.display_character('j', 'letters-0');
            GREEN.display_character('k', 'letters-0');
            GREEN.display_character('l', 'letters-1');
            GREEN.display_character('m', 'letters-1');
            GREEN.display_character('n', 'letters-1');
            GREEN.display_character('o', 'letters-1');
            GREEN.display_character('p', 'letters-1');
            GREEN.display_character('q', 'letters-1');
            GREEN.display_character('r', 'letters-1');
            GREEN.display_character('s', 'letters-1');
            GREEN.display_character('t', 'letters-1');
            GREEN.display_character('u', 'letters-1');
            GREEN.display_character('v', 'letters-1');
            GREEN.display_character('w', 'letters-2');
            GREEN.display_character('x', 'letters-2');
            GREEN.display_character('y', 'letters-2');
            GREEN.display_character('z', 'letters-2');            
        }
  };
})();
