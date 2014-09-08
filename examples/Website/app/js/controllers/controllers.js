/**
 * Created with JetBrains WebStorm.
 * User: Andrew
 * Date: 6/13/13
 * Time: 7:04 PM
 * To change this template use File | Settings | File Templates.
 */

app.controller('DaysController', function ($scope, daysService) {

    init();

    function init() {
        $scope.days = daysService.getDays();
    }

    $scope.insertDay = function () {
        var firstName = $scope.newDay.firstName;
        var lastName = $scope.newDay.lastName;
        var city = $scope.newDay.city;
        customersService.insertDay(firstName, lastName, city);
        $scope.newDay.firstName = '';
        $scope.newDay.lastName = '';
        $scope.newDay.city = '';
    };

    $scope.deleteDay = function (id) {
        customersService.deleteDay(id);
    };

});

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the order view
app.controller('DayController', function ($scope, $routeParams, daysService) {
    $scope.day = {};
    $scope.ordersTotal = 0.00;

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        //Grab customerID off of the route
        var dayID = ($routeParams.dayID) ? parseInt($routeParams.dayID) : 0;
        if (dayID > 0) {
            $scope.customer = daysService.getDay(dayID);
        }
    }

});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});