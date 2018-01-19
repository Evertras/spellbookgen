(function() {
    var app = angular.module('spellPanel', ['spellDataService']);

    app.directive('spellPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/spell-panel.html',
            controller: ['$scope', 'spellDataService', function($scope, spellDataService) {
                var self = this;
                
                self.spell = $scope.spell;
                
                self.canEdit = $scope.canEdit;
                
                self.saveData = function()
                {
                    spellDataService.saveLocal();
                    $scope.editing = false;
                };
                
                $scope.ComponentInfo = "None";
                $scope.DescriptionAsParagraphs = [];
                
                $scope.$watch("spell.Description", function(newValue, oldValue) {
                    if (newValue != null)
                    {
                        $scope.DescriptionAsParagraphs = newValue.split(/(\n|\r)+/);
                    }
                    else
                    {
                        $scope.DescriptionAsParagraphs = [];
                    }
                });
                
                $scope.$watch("[spell.UsesComponentsVerbal, spell.UsesComponentsSomatic, spell.UsesComponentsMaterial, spell.ComponentsMaterialDescription]", function(newValue, oldValue) {
                    if ($scope.spell != null)
                    {
                        var result = "";
                        
                        if ($scope.spell.UsesComponentsVerbal)
                        {
                            result += "V";
                        }
                        
                        if ($scope.spell.UsesComponentsSomatic)
                        {
                            if (result != "")
                            {
                                result += ", ";
                            }
                            
                            result += "S";
                        }
                        
                        if ($scope.spell.UsesComponentsMaterial)
                        {
                            if (result != "")
                            {
                                result += ", ";
                            }
                            
                            result += "M";
                            
                            var materialDescription = $scope.spell.ComponentsMaterialDescription;
                            
                            if (materialDescription)
                            {
                                result += " (" + materialDescription  + ")";
                            }
                        }
                        
                        if (result === "")
                        {
                            result = "None";
                        }
                        
                        $scope.ComponentInfo = result;
                    }
                });
            }],
            controllerAs: "spellCtrl",
            scope: {
                spell: '=spell',
                canEdit: '=canEdit'
            }
        };
    });
})();