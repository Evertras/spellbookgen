(function() {
    var app = angular.module('spellDataService', []);
    
    app.factory('spellDataService', ['$http', '$rootScope', function($http, $rootScope) {
        var spellData = [];

        var classData = [
            {
                ID: 1,
                Name: "Bard"
            },
            
            {
                ID: 2,
                Name: "Cleric"
            },
            
            {
                ID: 3,
                Name: "Druid"
            },
            
            {
                ID: 4,
                Name: "Paladin"
            },
            
            {
                ID: 5,
                Name: "Ranger"
            },
            
            {
                ID: 6,
                Name: "Sorceror"
            },
            
            {
                ID: 7,
                Name: "Warlock"
            },
            
            {
                ID: 8,
                Name: "Wizard"
            }
        ];
        
        var classSpellsData = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: []
        };
        
        var spellbookData = [];
        
        function broadcastSpellsUpdated() {
            $rootScope.$broadcast('user:spellsUpdated', spellData);
        }
        
        function broadcastClassesUpdated() {
            $rootScope.$broadcast('user:classesUpdated', classData);
        }
        
        function broadcastClassSpellsUpdated() {
            $rootScope.$broadcast('user:classSpellsUpdated', classSpellsData);
        }
        
        function broadcastSpellbooksUpdated() {
            $rootScope.$broadcast('user:spellbooksUpdated', spellbookData);
        }
        
        var spellDataService = {
            getSpellData: function()
            {
                return spellData;
            },
            
            getClassData: function()
            {
                return classData;
            },
            
            getClassSpellData: function()
            {
                return classSpellsData;
            },
            
            setClassSpellData: function(classID, spellIDArray)
            {
                classSpellsData[classID] = spellIDArray;
                
                broadcastClassSpellsUpdated();
                
                this.saveLocal();
            },
            
            getSpellbookData: function()
            {
                return spellbookData;
            },
            
            addSpellbook: function(spellbook)
            {
                spellbookData.push(spellbook);
            },
            
            removeSpellbook: function(spellbook)
            {
                spellbookData.splice(spellbookData.indexOf(spellbook), 1);
            },
            
            addSpell: function(spell)
            {
                var maxID = 1;
                for (var i = 0; i < spellData.length; ++i)
                {
                    if (spellData[i].ID >= maxID)
                    {
                        maxID = spellData[i].ID;
                    }
                }
                
                spell.ID = maxID + 1;
                
                spellData.push(spell);
                
                broadcastSpellsUpdated();
                
                this.saveLocal();
            },
            
            saveLocal: function()
            {
                localStorage.setItem('spellData', JSON.stringify(spellData));
                localStorage.setItem('classData', JSON.stringify(classData));
                localStorage.setItem('classSpellsData', JSON.stringify(classSpellsData));
                localStorage.setItem('spellbookData', JSON.stringify(spellbookData));
            },
            
            loadLocal: function()
            {
                var spellDataString = localStorage.getItem('spellData');
                var classDataString = localStorage.getItem('classData');
                var classSpellsDataString = localStorage.getItem('classSpellsData');
                var spellbookDataString = localStorage.getItem('spellbookData');
                
                if (spellDataString)
                {
                    spellData = JSON.parse(spellDataString);
                    broadcastSpellsUpdated();
                }
                
                if (classDataString)
                {
                    classData = JSON.parse(classDataString);
                    broadcastClassesUpdated();
                }
                
                if (classSpellsDataString)
                {
                    classSpellsData = JSON.parse(classSpellsDataString);
                    broadcastClassSpellsUpdated();
                }
                
                if (spellbookDataString)
                {
                    spellbookData = JSON.parse(spellbookDataString);
                    broadcastSpellbooksUpdated();
                }
            },
            
            exportJSON: function()
            {
                var allData = {
                    spellData: spellData,
                    classData: classData,
                    classSpellsData: classSpellsData,
                    spellbookData: spellbookData
                };

                var hiddenElement = document.createElement('a');
                
                hiddenElement.href = 'data:attachment/json,' + encodeURI(JSON.stringify(allData));
                hiddenElement.target = '_blank';
                hiddenElement.download = 'spellbookData.json';
                hiddenElement.click();
            },
            
            importJSON: function(jsonString)
            {
                var allData = JSON.parse(jsonString);
                
                if (allData.spellData)
                {
                    spellData = allData.spellData;
                    broadcastSpellsUpdated();
                }
                
                if (allData.classData)
                {
                    classData = allData.classData;
                    broadcastClassesUpdated();
                }
                
                if (allData.classSpellsData)
                {
                    classSpellsData = allData.classSpellsData;
                    broadcastClassSpellsUpdated();
                }
                
                if (allData.spellbookData)
                {
                    spellbookData = allData.spellbookData;
                    broadcastSpellbooksUpdated();
                }
            }
        };
        
        spellDataService.loadLocal();
        
        return spellDataService;
    }]);
})();