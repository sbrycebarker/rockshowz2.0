angular.module('myApp')
  .directive('bandpop', function() {
    return {
      restrict: 'E',
      templateUrl: "./views/bandpop.html"
    }
}).directive('venuepop', function() {
    return {
      restrict: 'E',
      templateUrl: "./views/venuepop.html"
    }
})

// ng-click="!showmenu"
