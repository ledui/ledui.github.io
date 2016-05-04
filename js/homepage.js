var WORDS = ['led', 'ui', 'project']


var HOMEPAGE = (function () {
    return {
        setup_homepage: function() {
            for (i = 0; i < 3; i++) {
                GREEN.display_word(WORDS[i], 'header', true);
            }
        }
    }
})();


$(function() {
    HOMEPAGE.setup_homepage();
});
