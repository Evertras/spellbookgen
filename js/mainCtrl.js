(function() {
    var app = angular.module('mainCtrl', ['spellDataService']);
    
    app.controller('mainCtrl', ['spellDataService', function(spellDataService)
    {
        var self = this;
        
        if (localStorage.getItem('firstVisit'))
        {
            self.tab = 1;
        }
        else
        {
            localStorage.setItem('firstVisit', 'true');
            
            self.tab = 7;
        }
        
        self.selectTab = function(setTab) {
            self.tab = setTab;
        };
        
        self.isSelected = function(checkTab) {
            return self.tab === checkTab;
        };
    }]);
})();