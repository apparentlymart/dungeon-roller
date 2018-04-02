const app = require("ng-anon-module")();

app.directive("body", require("ng-inject-loader!./directives/body.js"));

app.config([
  "$routeProvider",
  function($routeProvider) {
    $routeProvider.when("/", require("./routes/landing.js"));
    $routeProvider.when("/characters/:cid", require("./routes/character.js"));
    $routeProvider.when(
      "/characters/:cid/edit",
      require("./routes/characterEdit.js")
    );
  }
]);

module.exports = app;
