/* app.js
 *
 * Author(s):  Andrew Brown
 * Date:       9/9/2014
 *
 */


 angular.module('discom', []).config(function ($routeProvider) {
    $routeProvider.
		when('/Home', { controller: HomeController, templateUrl: '../partials/home.html' }).
        when('/Agents', { controller: AgentController, templateUrl: '../partials/agents.html' }).
		when('/Contact', { controller: ContactController, templateUrl: '../partials/contact.html' }).
		when('/About', { controller: AboutController, templateUrl: '../partials/about.html' }).
		when('/Community', { controller: CommunityController, templateUrl: '../partials/community.html' }).
		otherwise({redirectTo: '/Home'});        
});