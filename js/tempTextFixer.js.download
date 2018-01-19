(function() {
    var app = angular.module('tempTextFixer', []);

    app.directive('tempTextFixer', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/temp-text-fixer.html',
            controller: ['$scope', function($scope) {
                $scope.$watch("tempText", function(newValue, oldValue) {
                    if ($scope.tempText != null)
                    {
                        $scope.fixedText = $scope.tempText.replace(/(\n|\r)+/g, " ");
                    }
                });
            }],
            controllerAs: "tempTextFixerCtrl"
        };
    });
})();