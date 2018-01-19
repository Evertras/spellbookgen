(function() {
    var app = angular.module('importExport', ['spellDataService']);
    
    app.directive('onReadFile', function ($parse) {
       return {
          restrict: 'A',
          scope: false,
          link: function(scope, element, attrs) {
             var fn = $parse(attrs.onReadFile);
     
             element.on('change', function(onChangeEvent) {
                var reader = new FileReader();
     
                reader.onload = function(onLoadEvent) {
                   scope.$apply(function() {
                      fn(scope, {$fileContent:onLoadEvent.target.result});
                   });
                };
     
                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
             });
          }
       };
    });
    
    app.directive('importExport', ['spellDataService', function(spellDataService) {
        return {
            restrict: 'E',
            templateUrl: 'templates/import-export.html',
            controller: ['spellDataService', function(spellDataService) {
                var self = this;
                
                self.exportJSON = function()
                {
                    spellDataService.exportJSON();
                };
                
                self.importJSON = function(jsonString)
                {
                    spellDataService.importJSON(jsonString);
                    self.importSuccessful = true;
                    
                    setTimeout(function() {
                        self.importSuccessful = false;
                    }, 10000);
                };
            }],
            controllerAs: 'importExportCtrl'
        };
    }]);
})();