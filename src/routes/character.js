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
      $scope.rollAttack = function(event, attack) {
        console.log("roll for attack is not yet implemented", attack);
      };
      $scope.rollDirect = function(event, die) {
        var caption = "Roll " + die.count + "d" + die.sides;
        drRollDialog(event, {
          caption: caption,
          die: die
        });
      };
      $scope.adjustObjectProp = function(obj, prop, mod, min) {
        if (typeof obj[prop] !== "number") {
          obj[prop] = 0;
        }
        obj[prop] = obj[prop] + mod;
        if (min !== undefined && obj[prop] < min) {
          obj[prop] = min;
        }
      };

      var directDice = [4, 6, 8, 10, 12, 20, 100];
      $scope.directDice = directDice.map(function(d) {
        return {
          sides: d,
          count: 1,
          mod: 0
        };
      });
    }
  ]
};
