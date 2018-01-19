(function() {
    var app = angular.module('spellbookEditor', ['spellDataService']);
    
    app.directive('spellbookEditor', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/spellbook-editor.html',
            controller: ['spellDataService', '$scope', '$filter', function (spellDataService, $scope, $filter) {
                var self = this;

                self.classData = spellDataService.getClassData();
                self.spellData = spellDataService.getSpellData();
                self.classSpellsData = spellDataService.getClassSpellData();
                self.spellbookData = spellDataService.getSpellbookData();
                
                $scope.$on('user:spellsUpdated', function(event, data) {
                    self.spellData = data;
                });
                
                $scope.$on('user:classesUpdated', function(event, data) {
                    self.classData = data;
                });
                
                $scope.$on('user:classSpellsUpdated', function(event, data) {
                    self.classSpellsData = data;
                });
                
                $scope.$on('user:spellbooksUpdated', function(event, data) {
                    self.spellbookData = data;
                });
                
                if (self.spellbookData && self.spellbookData.length > 0)
                {
                    self.selectedSpellbook = self.spellbookData[0];
                }
                else
                {
                    self.selectedSpellbook = {
                        knownSpells: [],
                        preparedSpells: [],
                    };
                }
                
                self.displayListEditor = true;
                self.selectedClass = self.classData[0];
                self.randomLevel = 1;
                
                self.getSpellFromID = function(id) {
                    for (var i = 0; i < self.spellData.length; ++i)
                    {
                        if (self.spellData[i].ID == id)
                        {
                            return self.spellData[i];
                        }
                    }
                    
                    return null;
                };
                
                self.getClassFromID = function(id) {
                    for (var i = 0; i < self.classData.length; ++i)
                    {
                        if (self.classData[i].ID == id)
                        {
                            return self.classData[i];
                        }
                    }
                    
                    return null;
                };
                
                self.spellInSelectedClass = function(spell) {
                    var classArray = self.classSpellsData[self.selectedClass.ID];
                    
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
                    var classArray = self.classSpellsData[self.selectedClass.ID];
                    
                    if (classArray)
                    {
                        return classArray.indexOf(spell.ID) == -1;
                    }
                    else
                    {
                        return true;
                    }
                };
                
                self.spellPrepared = function(spell) {
                    return self.selectedSpellbook.preparedSpells.indexOf(spell.ID) != -1;
                };
                
                self.spellKnown = function(spell) {
                    return self.selectedSpellbook.knownSpells.indexOf(spell.ID) != -1;
                };
                
                self.toggleSpellKnown = function(spell) {
                    var index = self.selectedSpellbook.knownSpells.indexOf(spell.ID);
                    
                    if (index == -1)
                    {
                        self.selectedSpellbook.knownSpells.push(spell.ID);
                    }
                    else
                    {
                        self.selectedSpellbook.knownSpells.splice(index, 1);
                    }
                };
                
                self.toggleSpellPrepared = function(spell) {
                    var index = self.selectedSpellbook.preparedSpells.indexOf(spell.ID);
                    
                    if (index == -1)
                    {
                        self.selectedSpellbook.preparedSpells.push(spell.ID);
                    }
                    else
                    {
                        self.selectedSpellbook.preparedSpells.splice(index, 1);
                    }
                };
                
                self.newSpellbook = function() {
                    var spellbook = {
                        Name: "New Spellbook",
                        knownSpells: [],
                        preparedSpells: [],
                    };
                    
                    self.selectedSpellbook = spellbook;
                    
                    spellDataService.addSpellbook(spellbook);
                };
                
                self.deleteSpellbook = function() {
                    if (confirm("Are you SURE you want to delete your spellbook: " + self.selectedSpellbook.Name + "?"))
                    {
                        spellDataService.removeSpellbook(self.selectedSpellbook);
                    }
                    
                    if (self.spellbookData.length > 0)
                    {
                        self.selectedSpellbook = self.spellbookData[0];
                    }
                    else
                    {
                        self.selectedSpellbook = {
                            Name: "",
                            knownSpells: [],
                            preparedSpells: [],
                            selectedClassID: 1
                        };
                    }
                };
                
                self.generateRandom = function() {
                    if (self.selectedSpellbook.knownSpells.length > 0 && !confirm("Are you SURE you want to overwrite your existing spells?"))
                    {
                        return;
                    }
                    
                    self.selectedSpellbook.knownSpells = [];
                    
                    var classArray = self.classSpellsData[self.selectedClass.ID];
                    
                    var maxSpellLevelsPureCaster = [
                        0,
                        1, 1,
                        2, 2,
                        3, 3,
                        4, 4,
                        5, 5,
                        6, 6,
                        7, 7,
                        8, 8,
                        9, 9, 9, 9
                    ];
                    
                    if (self.selectedClass.Name == "Bard" ||
                        self.selectedClass.Name == "Sorceror" ||
                        self.selectedClass.Name == "Wizard")
                    {
                        var spellsKnownPerLevel;
                        
                        var cantripsPerLevel;
                        
                        if (self.selectedClass.Name == "Bard")
                        {
                            spellsKnownPerLevel = [
                                0,
                                4, 5, 6, 7, 8,
                                9, 10, 11, 12, 14,
                                15, 15, 16, 18, 19,
                                19, 20, 22, 22, 22
                            ];
                            
                            cantripsPerLevel = [
                                0,
                                2, 2, 2,
                                3, 3, 3, 3, 3, 3,
                                4, 4, 4, 4, 4, 4,
                                4, 4, 4, 4
                            ];
                        }
                        else if (self.selectedClass.Name == "Sorceror")
                        {
                            spellsKnownPerLevel = [
                                0,
                                2, 3, 4, 5,
                                6, 7, 8, 9,
                                10, 11, 12, 12,
                                13, 13, 14, 14,
                                15, 15, 15, 15
                            ];
                            
                            cantripsPerLevel = [
                                0,
                                4, 4, 4,
                                5, 5, 5, 5, 5, 5,
                                6, 6, 6, 6, 6, 6,
                                6, 6, 6, 6, 6
                            ];
                        }
                        else if (self.selectedClass.Name == "Wizard")
                        {
                            spellsKnownPerLevel = [
                                0,
                                2, 4, 7, 10,
                                13, 18, 21, 24,
                                27, 30, 33, 36,
                                39, 42, 45, 48,
                                51, 54, 57, 66
                            ];
                            
                            cantripsPerLevel = [
                                0,
                                3, 3, 3,
                                4, 4, 4, 4, 4, 4,
                                5, 5, 5, 5, 5, 5,
                                5, 5, 5, 5, 5
                            ];
                        }
                        
                        var spellsKnown = 0;
                        
                        for (var iCantrip = 0; iCantrip < cantripsPerLevel[self.randomLevel]; ++iCantrip)
                        {
                            var unknownCantrips = $filter('filter')(classArray, function (id) {
                                var spell = self.getSpellFromID(id);

                                return spell.Level == maxSpellLevelsPureCaster[0] && !self.spellKnown(spell);
                            });
                            
                            if (unknownCantrips.length > 0)
                            {
                                var selectedID = unknownCantrips[Math.floor(Math.random()*unknownCantrips.length)];
                                
                                self.selectedSpellbook.knownSpells.push(selectedID);
                            }
                            else
                            {
                                //console.log("Uh oh");
                            }
                        }
                        
                        for (var level = 1; level <= self.randomLevel && level <= 20; ++level)
                        {
                            var spellsToLearn = spellsKnownPerLevel[level] - spellsKnown;
                            
                            for (var i = 0; i < spellsToLearn; ++i)
                            {
                                var unknownSpellsOfLevel = $filter('filter')(classArray, function (id) {
                                    var spell = self.getSpellFromID(id);

                                    return spell.Level == maxSpellLevelsPureCaster[level] && !self.spellKnown(spell);
                                });
                                
                                if (unknownSpellsOfLevel.length > 0)
                                {
                                    var selectedID = unknownSpellsOfLevel[Math.floor(Math.random()*unknownSpellsOfLevel.length)];
                                    
                                    self.selectedSpellbook.knownSpells.push(selectedID);
                                }
                                else
                                {
                                    //console.log("Uh oh");
                                }
                            }
                        }
                    }
                };
                
                $scope.$watch(function () { return self.selectedClass; }, function(newValue, oldValue) { 
                    if (self.selectedClass)
                    {
                        var classArray = self.classSpellsData[self.selectedClass.ID];
                        var levels = [];
                        
                        if (classArray)
                        {
                            for (var i = 0; i < classArray.length; ++i)
                            {
                                var spellID = classArray[i];
                                var spell = self.getSpellFromID(spellID);
                                
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
                    }
                });
                
                $scope.$watchCollection(
                    function () {
                        return self.selectedSpellbook.knownSpells;
                    },
                    
                    function(newValue, oldValue) {
                        var levels = [];
                        
                        for (var i = 0; i < self.selectedSpellbook.knownSpells.length; ++i)
                        {
                            var spell = self.getSpellFromID(self.selectedSpellbook.knownSpells[i]);
                            
                            if (spell)
                            {
                                if (levels.indexOf(spell.Level) == -1)
                                {
                                    levels.push(spell.Level);
                                }
                            }
                        }
                        
                        self.spellLevelsForKnownSpells = levels;
                    }
                );
                
                $scope.$watch(
                    function() {
                        return self.selectedSpellbook;
                    },
                    
                    function (newValue, oldValue) {
                        spellDataService.saveLocal();
                        
                        self.selectedClass = self.getClassFromID(self.selectedSpellbook.selectedClassID);
                    },
                    
                    true
                );
            }],

            controllerAs: 'spellbookEditorCtrl'
        };
    });
})();