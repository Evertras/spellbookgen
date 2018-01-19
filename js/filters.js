(function() {
    var app = angular.module('spellbookFilters', []);

    app.filter('nth', function($filter) {
        return function(input)
        {
            var num = parseInt(input, 10);
            
            if (num == 1)
            {
                return input + 'st';
            }
            else if (num == 2)
            {
                return input + 'nd';
            }
            else if (num == 3)
            {
                return input + 'rd';
            }
            else
            {
                return input + 'th';
            }
        };
    });
    
    app.filter('nlToArray', function() {
        return function(text) {
            if (text != null)
                return text.split(/(\n|\r)+/);
            else
                return [];
        };
    });
})();