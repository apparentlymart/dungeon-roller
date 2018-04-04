const Twister = require("mersenne-twister");
const $mdDialog = ngRequire("$mdDialog");
const $rootScope = ngRequire("$rootScope");

const twister = new Twister();

const template = require("./rollDialog.html");
const controller = ["$scope", "$mdDialog", function($scope, $mdDialog) {}];

function rollDie(def) {
  var sides = def.sides;
  var count = def.count || 1;
  var mod = def.mod || 0;

  var rolls = [];
  var result = 0;
  for (var i = 0; i < count; i++) {
    roll = Math.floor(twister.random() * sides) + 1;
    result += roll;
    rolls.push(roll);
  }
  var crit = 0;
  if (count == 1 && sides == 20) {
    if (result == 1) {
      crit = -1;
    } else if (result == 20) {
      crit = 1;
    }
  }
  result += mod;

  return {
    def: def,
    result: result,
    rolls: rolls,
    mod: mod,
    crit: crit
  };
}

function rollDice(defs) {
  var ret = [];
  for (var i = 0; i < defs.length; i++) {
    ret.push(rollDie(defs[i]));
  }
  return ret;
}

module.exports = function rollDialog(event, roll) {
  var $scope = $rootScope.$new(true);

  $scope.caption = roll.caption;
  $scope.initialRoll = rollDie(roll.die);
  $scope.bonusRoll = null;
  $scope.bonusAdvantage = null;
  updateResult();

  $scope.rollBonus = function rollBonus(advantage) {
    $scope.bonusRoll = rollDie(roll.die);
    $scope.bonusAdvantage = advantage;
    updateResult();
  };

  $scope.closeDialog = function closeDialog() {
    $mdDialog.cancel();
  };

  $mdDialog.show({
    controller: controller,
    template: template,
    scope: $scope,
    parent: angular.element(document.body),
    targetEvent: event,
    clickOutsideToClose: true,
    fullscreen: true
  });

  function updateResult() {
    if ($scope.bonusRoll == null) {
      $scope.chosenRoll = $scope.initialRoll;
      return;
    }

    if ($scope.bonusAdvantage) {
      if ($scope.initialRoll.result > $scope.bonusRoll.result) {
        $scope.chosenRoll = $scope.initialRoll;
      } else {
        $scope.chosenRoll = $scope.bonusRoll;
      }
    } else {
      if ($scope.initialRoll.result < $scope.bonusRoll.result) {
        $scope.chosenRoll = $scope.initialRoll;
      } else {
        $scope.chosenRoll = $scope.bonusRoll;
      }
    }
  }
};
