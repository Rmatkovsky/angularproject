//run angularJS module
var app = angular.module('app',['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
        .state('results', {
            url: "/results",
            templateUrl: "views/results.tmpl.html"
        })
        .state('start', {
            url: "/",
            templateUrl: "views/start.tmpl.html"
        })

});
