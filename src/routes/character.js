var template = require("./character.html");

module.exports = {
  template: template,
  controller: [
    "$routeParams",
    "$scope",
    "$firebaseObject",
    "$location",
    "drRollDialog",
    function($routeParams, $scope, $firebaseObject, $location, drRollDialog) {
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

      function checkDie(modifier) {
        return {
          sides: 20,
          mod: modifier
        };
      }

      $scope.rollInitiative = function(event) {
        drRollDialog(event, {
          caption: "Roll for Initiative",
          die: checkDie($scope.character.abilities.DEX.check)
        });
      };
      $scope.rollAbilityCheck = function(event, ability) {
        drRollDialog(event, {
          caption: ability.name + " Check",
          die: checkDie($scope.character.abilities[ability.keyword].check)
        });
      };
      $scope.rollAbilitySave = function(event, ability) {
        drRollDialog(event, {
          caption: ability.name + " Saving Throw",
          die: checkDie($scope.character.abilities[ability.keyword].check)
        });
      };
      $scope.rollSkillCheck = function(event, skill) {
        drRollDialog(event, {
          caption: skill.name + " Check",
          die: checkDie($scope.character.skills[skill.keyword])
        });
      };
    }
  ]
};
