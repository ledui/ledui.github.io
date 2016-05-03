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
        display_character: function (character, row_no, wide, altcaption, title) {
            var colours = GREEN.get_green_code(character)
            GREEN.create_cell(character, colours, row_no, wide, altcaption, title)
        },
        get_green_code: function(character) {
            var short_code = SHORT_CODE[character]
            if (!short_code) {
                console.log(character);
            }
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
            // Quickly get rid of one character words
            if (len == 1) {
                rows[0].push({colour: contexts[0].colours[0], pos: 'tlr'})
                rows[1].push({colour: contexts[0].colours[1], pos: 'lr'})
                rows[2].push({colour: contexts[0].colours[2], pos: 'lr'})
                rows[3].push({colour: contexts[0].colours[3], pos: 'blr'})
                return rows;
            }
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
                    } else if (i == (len - 1)) {
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
        create_cell: function(character, colours, identifier, wide, altcaption, title) {
            if (character == ' ') {
                character = "(space)";
            }
            if (altcaption) {
                character = altcaption;
            }
            var context = {character: character,
                           colours: colours,
                           wide:wide,
                           title:title}
            var source   = $("#greencode-template").html();
            var template = Handlebars.compile(source);
            var html = template(context);
            var row = $('#' + identifier);
            row.append(html)
        },
  };
})();
