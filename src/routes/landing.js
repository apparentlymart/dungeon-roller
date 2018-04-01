var template = require("./landing.html");

module.exports = {
  template: template,
  controller: [
    "$scope",
    "$firebaseArray",
    function($scope, $firebaseArray) {
      $scope.$watch("user", function(user) {
        if (user) {
          $scope.userChars = $firebaseArray(user.characters);
        } else {
          $scope.userChars = null;
        }
      });

      $scope.createChar = function addChar() {
        var user = $scope.user;
        var newRef = user.characters.push();
        newRef.set({
          name: "New Character",
          abilities: {
            STR: {
              check: 0,
              save: 0
            },
            DEX: {
              check: 0,
              save: 0
            },
            CON: {
              check: 0,
              save: 0
            },
            INT: {
              check: 0,
              save: 0
            },
            WIS: {
              check: 0,
              save: 0
            },
            CHA: {
              check: 0,
              save: 0
            }
          },
          skills: {
            acrobatics: 0,
            animalHandling: 0,
            arcana: 0,
            athletics: 0,
            deception: 0,
            history: 0,
            insight: 0,
            intimidation: 0,
            investigation: 0,
            medicine: 0,
            nature: 0,
            perception: 0,
            performance: 0,
            persuasion: 0,
            religion: 0,
            sleightOfHand: 0,
            stealth: 0,
            survival: 0
          },
          attacks: {}
        });
        var newId = newRef.key();
        console.log("added character", newId);
      };
    }
  ]
};
