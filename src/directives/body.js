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

      $scope.abilities = [
        {
          keyword: "STR",
          name: "Strength"
        },
        {
          keyword: "DEX",
          name: "Dexterity"
        },
        {
          keyword: "CON",
          name: "Constitution"
        },
        {
          keyword: "INT",
          name: "Intelligence"
        },
        {
          keyword: "WIS",
          name: "Wisdom"
        },
        {
          keyword: "CHA",
          name: "Charisma"
        }
      ];
      $scope.skills = [
        {
          keyword: "acrobatics",
          name: "Acrobatics",
          ability: "DEX"
        },
        {
          keyword: "animalHandling",
          name: "Animal Handling",
          ability: "WIS"
        },
        {
          keyword: "arcana",
          name: "Arcana",
          ability: "INT"
        },
        {
          keyword: "athletics",
          name: "Athletics",
          ability: "STR"
        },
        {
          keyword: "deception",
          name: "Deception",
          ability: "CHA"
        },
        {
          keyword: "history",
          name: "History",
          ability: "INT"
        },
        {
          keyword: "insight",
          name: "Insight",
          ability: "WIS"
        },
        {
          keyword: "intimidation",
          name: "Intimidation",
          ability: "CHA"
        },
        {
          keyword: "investigation",
          name: "Investigation",
          ability: "INT"
        },
        {
          keyword: "medicine",
          name: "Medicine",
          ability: "WIS"
        },
        {
          keyword: "nature",
          name: "Nature",
          ability: "INT"
        },
        {
          keyword: "perception",
          name: "Perception",
          ability: "WIS"
        },
        {
          keyword: "performance",
          name: "Performance",
          ability: "CHA"
        },
        {
          keyword: "persuasion",
          name: "Persuasion",
          ability: "CHA"
        },
        {
          keyword: "religion",
          name: "Religion",
          ability: "INT"
        },
        {
          keyword: "slightOfHand",
          name: "Slight of Hand",
          ability: "DEX"
        },
        {
          keyword: "stealth",
          name: "Stealth",
          ability: "DEX"
        },
        {
          keyword: "survival",
          name: "Survival",
          ability: "WIS"
        }
      ];
    }
  ]
};
