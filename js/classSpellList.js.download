(function() {
    var app = angular.module('classSpellList', ['spellDataService']);
    
    app.directive('classSpellList', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/class-spell-list.html',
            controller: ['$scope', 'spellDataService', function ($scope, spellDataService)
            {
                var self = this;
                
                self.classData = spellDataService.getClassData();
                self.classSpellData = spellDataService.getClassSpellData();
                self.spellData = spellDataService.getSpellData();
                
                $scope.$on('user:spellsUpdated', function(event, data) {
                    self.spellData = data;
                });
                
                $scope.$on('user:classesUpdated', function(event, data) {
                    self.classData = data;
                });
                
                $scope.$on('user:classSpellsUpdated', function(event, data) {
                    self.classSpellData = data;
                });

                self.selectedClass = { ID: null, Name: 'Unselected' };
                self.spellLevelsForSelectedClass = [];
                
                self.selectClass = function(classData) {
                    self.selectedClass = classData;

                    var classArray = self.classSpellData[self.selectedClass.ID];
                    var levels = [];
                    
                    if (classArray)
                    {
                        for (var i = 0; i < classArray.length; ++i)
                        {
                            var spellID = classArray[i];
                            var spell = null;
                            
                            for (var j = 0; j < self.spellData.length; ++j)
                            {
                                if (self.spellData[j].ID == spellID)
                                {
                                    spell = self.spellData[j];
                                    break;
                                }
                            }
                            
                            if (spell)
                            {
                                if (levels.indexOf(spell.Level) == -1)
                                {
                                    levels.push(spell.Level);
                                }
                            }
                        }
                    }
                    
                    self.spellLevelsForSelectedClass = levels;
                };
                
                self.spellInSelectedClass = function(spell) {
                    var classArray = self.classSpellData[self.selectedClass.ID];
                    
                    if (classArray)
                    {
                        return classArray.indexOf(spell.ID) != -1;
                    }
                    else
                    {
                        return false;
                    }
                };
                
                self.spellNotInSelectedClass = function(spell) {
                    var classArray = self.classSpellData[self.selectedClass.ID];
                    
                    if (classArray)
                    {
                        return classArray.indexOf(spell.ID) == -1;
                    }
                    else
                    {
                        return true;
                    }
                };
                
                self.addSpell = function(spell) {
                    var classArray = self.classSpellData[self.selectedClass.ID];
                    
                    if (classArray)
                    {
                        classArray.push(spell.ID);
                        self.selectClass(self.selectedClass);
                        spellDataService.setClassSpellData(self.selectedClass.ID, classArray);
                    }
                };
                
                self.removeSpell = function(spell) {
                    var classArray = self.classSpellData[self.selectedClass.ID];
                    
                    if (classArray)
                    {
                        var index = classArray.indexOf(spell.ID);
                        
                        if (index == -1)
                        {
                            alert("Something weird happened, couldn't find spell with ID " + spell.ID);
                            return;
                        }
                        
                        classArray.splice(index, 1);
                        
                        spellDataService.setClassSpellData(self.selectedClass.ID, classArray);
                    }
                };
            }],
            controllerAs: 'classSpellListCtrl'
        };
    });
})();