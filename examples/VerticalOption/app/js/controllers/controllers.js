'use strict';

/* Controllers */

function CourseController($scope, $http) {
  $http.get('data/courses.json').success(function(data) {
    $scope.courses = data;
  });

  $scope.orderProp = 'order';
}

//PhoneListCtrl.$inject = ['$scope', '$http'];


function CourseDetailController($scope, $routeParams, $http) {
  $http.get('data/courses/' + $routeParams.courseId + '.json').success(function(data) {
  //$http.get('data/courses/BasicSwatRappel.json').success(function(data) {
    $scope.course = data;
  });

  $scope.mainImageUrl = "img/basicbutton.jpg";
  $scope.mainText = $routeParams.courseId;
  
  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

function AboutController($scope, $routeParams, $http) {
  $http.get('data/about.json').success(function(data) {
    $scope.about = data;
  });
}

function HomeController($scope, $routeParams, $http) {
  $http.get('data/home.json').success(function(data) {
    $scope.home = data;
  });
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', '$http'];
