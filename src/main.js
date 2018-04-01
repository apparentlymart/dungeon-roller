require("angular-material/angular-material.scss");
require("./style.scss");

const angular = require("angular");
const ngRoute = require("angular-route");
const ngMaterial = require("angular-material");
const firebase = require("firebase");
window.firebase = firebase;
window.Firebase = firebase;

firebase.initializeApp({
  apiKey: "AIzaSyDnn0UkrUcmhZ0HVOWNEXTR5MvQSHixAl0",
  authDomain: "dungeon-roller.firebaseapp.com",
  databaseURL: "https://dungeon-roller.firebaseio.com",
  projectId: "dungeon-roller",
  storageBucket: "dungeon-roller.appspot.com",
  messagingSenderId: "482518076102"
});

const angularFire = require("angularfire");

const app = require("./app.js");

angular.element(document).ready(function() {
  angular.bootstrap(
    document,
    [
      "ng",
      [
        "$locationProvider",
        function($locationProvider) {
          $locationProvider.html5Mode(true);
        }
      ],
      "ngRoute",
      "ngMaterial",
      [
        "$provide",
        function($provide) {
          $provide.value("firebase", firebase);
          $provide.value("Firebase", firebase);
        }
      ],
      "firebase",
      app
    ],
    {
      strictDi: true
    }
  );
});
