<reference path="../lib/angular.js" />

var app = angular.module('daysApp', []);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/days',
        {
            controller: 'DaysController',
            templateUrl: '/app/partials/days.html'
        })
        //Define a route that has a route parameter in it (:customerID)
        .when('/days/:dayID',
        {
            controller: 'DayController',
            templateUrl: '/app/partials/day.html'
        })
        //Define a route that has a route parameter in it (:customerID)
//        .when('/orders',
//        {
//            controller: 'OrdersController',
//            templateUrl: '/app/partials/orders.html'
//        })
        .otherwise({ redirectTo: '/days' });
});