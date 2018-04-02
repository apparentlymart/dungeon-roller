var template = require("./character.html");

module.exports = {
  template: template,
  controller: [
    "$routeParams",
    "$scope",
    "$firebaseObject",
    "$location",
    function($routeParams, $scope, $firebaseObject) {
      var charId = $routeParams.cid;
      $scope.character = null;
      $scope.$watch(
        function() {
          return $scope.user;
        },
        function(user) {
          if (user == null) {
            $scope.character = null;
            return;
          }

          var character = user.characters.child(charId);
          $scope.character = $firebaseObject(character);
        }
      );
    }
  ]
};
