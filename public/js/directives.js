angular.module('myApp')
  .directive('bandpop', function() {
    return {
      restrict: 'E',
      templateUrl: "./views/bandpop.html"
    }
})

// ng-click="!showmenu"
