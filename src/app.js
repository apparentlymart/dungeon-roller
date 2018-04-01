const app = require("ng-anon-module")();

app.directive("body", require("ng-inject-loader!./directives/body.js"));

app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/", require("./routes/landing.js"));
  }
]);

module.exports = app;
