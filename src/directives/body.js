var template = require("./body.html");

module.exports = {
  restrict: "E",
  template: template,
  scope: true,
  controller: [
    "$scope",
    "$mdMedia",
    "$mdSidenav",
    "$firebaseAuth",
    function($scope, $mdMedia, $mdSidenav, $firebaseAuth) {
      $scope.$watch(
        function() {
          return $mdMedia("gt-sm");
        },
        function(fixedMenu) {
          $scope.fixedMenu = fixedMenu;
        }
      );
      $scope.openMenu = function openMenu() {
        $mdSidenav("leftNav").open();
      };
      $scope.closeMenu = function closeMenu() {
        $mdSidenav("leftNav").close();
      };
      $scope.$on("$routeChangeStart", function() {
        $scope.closeMenu();
      });

      const auth = $firebaseAuth();
      $scope.user = null;
      $scope.authReady = false;
      auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.authReady = true;
        if (!firebaseUser) {
          $scope.user = null;
          $scope.userChars = null;
          return;
        }
        $scope.user = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          id: firebaseUser.uid,
          characters: firebase
            .database()
            .ref()
            .child("users")
            .child(firebaseUser.uid)
            .child("characters")
        };
        console.log("user is now", $scope.user);
      });
      $scope.logIn = function logIn() {
        auth.$signInWithPopup("google");
      };
    }
  ]
};
