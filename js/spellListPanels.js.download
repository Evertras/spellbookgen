(function() {
    var app = angular.module('spellListPanels', ['spellPanel', 'spellDataService']);

    app.directive('spellListPanels', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/spell-list-panels.html',
            controller: ['spellDataService', '$scope', function(spellDataService, $scope) {
                var ctrl = this;
                
                ctrl.spells = [];

                $scope.searchName = '';
                
                ctrl.spells = spellDataService.getSpellData();
                
                $scope.$on('user:spellsUpdated', function(event, data) {
                    ctrl.spells = data;
                });
            }],
            controllerAs: 'spellListCtrl'
        };
    });
})();