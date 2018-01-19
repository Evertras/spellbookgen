(function() {
    var app = angular.module('spellEditor', ['spellPanel']);

    app.directive('spellEditor', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/spell-editor.html',
            controller: ['$scope', 'spellDataService', function ($scope, spellDataService) {
                var self = this;

                self.addSpell = function(spell) {
                    spell.RequiresConcentration = spell.Duration.indexOf('Concentration') > -1;
                    
                    spellDataService.addSpell(spell);
                    
                    $scope.spell = { };
                };
            }],
            controllerAs: 'spellEditorCtrl'
        };
    });
})();