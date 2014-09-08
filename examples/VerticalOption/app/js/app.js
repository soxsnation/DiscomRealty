//This configures the routes and associates each route with a view and a controller
angular.module('verticalOptionApp', []).config(function ($routeProvider) {
    $routeProvider.
		when('/Home', { controller: HomeController, templateUrl: '/app/partials/Home.html' }).
        when('/Courses', { controller: CourseController, templateUrl: '/app/partials/Courses.html' }).
		when('/Courses/:courseId', { controller: CourseDetailController, templateUrl: '/app/partials/CourseDetail.html' }).
		when('/About', { controller: AboutController, templateUrl: '/app/partials/About.html' }).
		otherwise({redirectTo: '/Courses'});        
});